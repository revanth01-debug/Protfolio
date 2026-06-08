import cv2
import os
import numpy as np
import pandas as pd
import pickle
from datetime import datetime
import time

# ------------------------------
# 1️⃣ Setup folders & files
# ------------------------------
os.makedirs("dataset", exist_ok=True)
os.makedirs("embeddings", exist_ok=True)
os.makedirs("attendance", exist_ok=True)

attendance_file = "attendance/attendance.csv"

# Handle empty CSV safely
if os.path.exists(attendance_file):
    try:
        df = pd.read_csv(attendance_file)
    except pd.errors.EmptyDataError:
        df = pd.DataFrame(columns=["Name", "Time"])
else:
    df = pd.DataFrame(columns=["Name", "Time"])

# Face detector
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# ------------------------------
# 2️⃣ Load or initialize recognizer
# ------------------------------
recognizer = cv2.face.LBPHFaceRecognizer_create()

if os.path.exists("embeddings/lbph_model.yml"):
    recognizer.read("embeddings/lbph_model.yml")
    with open("embeddings/label_dict.pkl", "rb") as f:
        label_dict = pickle.load(f)
else:
    label_dict = {}

def retrain_recognizer():
    """Retrain recognizer with all images in dataset."""
    global recognizer, label_dict
    faces = []
    labels = []
    label_dict = {}
    current_label = 0
    for person_name in os.listdir("dataset"):
        person_path = os.path.join("dataset", person_name)
        label_dict[current_label] = person_name
        for img_name in os.listdir(person_path):
            img_path = os.path.join(person_path, img_name)
            img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
            img = cv2.resize(img, (200, 200))
            faces.append(img)
            labels.append(current_label)
        current_label += 1
    if faces:
        labels_np = np.array(labels)
        recognizer.train(faces, labels_np)
        recognizer.write("embeddings/lbph_model.yml")
        with open("embeddings/label_dict.pkl", "wb") as f:
            pickle.dump(label_dict, f)
        print("Recognizer retrained with new person(s)")

# ------------------------------
# 3️⃣ Start live recognition
# ------------------------------
cap = cv2.VideoCapture(0)
print("Continuous attendance system running. Press 'q' to quit.")

while True:
    ret, frame = cap.read()
    if not ret:
        continue

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces_detected = face_cascade.detectMultiScale(gray, 1.3, 5)

    for (x, y, w, h) in faces_detected:
        face_img = gray[y:y+h, x:x+w]
        face_img_resized = cv2.resize(face_img, (200, 200))

        if label_dict:
            label, confidence = recognizer.predict(face_img_resized)
            name_detected = label_dict[label] if confidence < 80 else "Unknown"
        else:
            name_detected = "Unknown"

        # Auto-learn unknown faces
        if name_detected == "Unknown":
            cv2.imshow("Live Attendance", frame)
            print("\nUnknown person detected!")
            new_name = input("Enter the name of this person (or leave blank to skip): ").strip()
            if new_name:
                person_path = f"dataset/{new_name}"
                os.makedirs(person_path, exist_ok=True)
                print(f"Capturing 20 images of {new_name}...")
                count = 0
                while count < 20:
                    ret2, frame2 = cap.read()
                    if not ret2:
                        continue
                    gray2 = cv2.cvtColor(frame2, cv2.COLOR_BGR2GRAY)
                    faces2 = face_cascade.detectMultiScale(gray2, 1.3, 5)
                    for (x2, y2, w2, h2) in faces2:
                        count += 1
                        face_img2 = gray2[y2:y2+h2, x2:x2+w2]
                        face_img2 = cv2.resize(face_img2, (200, 200))
                        cv2.imwrite(f"{person_path}/{count}.jpg", face_img2)
                        cv2.rectangle(frame2, (x2,y2), (x2+w2, y2+h2), (0,255,0), 2)
                        cv2.putText(frame2, f"{new_name} {count}/20", (x2, y2-10),
                                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2)
                    cv2.imshow("Capturing New Person", frame2)
                    if cv2.waitKey(1) & 0xFF == ord('q'):
                        break
                cv2.destroyWindow("Capturing New Person")
                print(f"Captured 20 images of {new_name}. Retraining recognizer...")
                retrain_recognizer()
                name_detected = new_name  # mark attendance immediately

        # Mark attendance
        if name_detected != "Unknown" and name_detected not in df["Name"].values:
            df = pd.concat([df, pd.DataFrame({
                "Name":[name_detected],
                "Time":[datetime.now().strftime('%H:%M:%S')]
            })], ignore_index=True)
            df.to_csv(attendance_file, index=False)

        # Draw rectangle & name
        color = (0,255,0) if name_detected != "Unknown" else (0,0,255)
        cv2.rectangle(frame, (x,y), (x+w, y+h), color, 2)
        cv2.putText(frame, name_detected, (x, y-10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)

    cv2.imshow("Live Attendance", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

    time.sleep(0.01)

cap.release()
cv2.destroyAllWindows()
print("Attendance session ended. Check attendance/attendance.csv")
