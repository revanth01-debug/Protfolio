import cv2
import os
import numpy as np
import pandas as pd
import pickle
from datetime import datetime
import time

# ------------------------------
# 1️⃣ Setup folders
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
# 2️⃣ Capture initial known people
# ------------------------------
print("Enter names of known people, comma-separated (leave blank if none):")
people_input = input("Names: ").strip()
people_names = [name.strip() for name in people_input.split(",") if name.strip()]

cap = cv2.VideoCapture(0)
num_images = 20  # per person

for name in people_names:
    input(f"\nPress ENTER when {name} is ready in front of the camera...")
    dataset_path = f"dataset/{name}"
    os.makedirs(dataset_path, exist_ok=True)
    print(f"Capturing {num_images} images of {name}...")

    count = 0
    while count < num_images:
        ret, frame = cap.read()
        if not ret:
            continue
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces_detected = face_cascade.detectMultiScale(gray, 1.3, 5)

        for (x, y, w, h) in faces_detected:
            count += 1
            face_img = gray[y:y+h, x:x+w]
            face_img = cv2.resize(face_img, (200, 200))
            cv2.imwrite(f"{dataset_path}/{count}.jpg", face_img)
            cv2.rectangle(frame, (x,y), (x+w, y+h), (0,255,0), 2)
            cv2.putText(frame, f"{name} {count}/{num_images}", (x, y-10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2)

        cv2.imshow("Capturing Faces", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    print(f"Captured {count} images of {name}!")

# ------------------------------
# 3️⃣ Function to train recognizer
# ------------------------------
def train_recognizer():
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

    labels_arr = np.array(labels)
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.train(faces, labels_arr)
    recognizer.write("embeddings/lbph_model.yml")
    with open("embeddings/label_dict.pkl", "wb") as f:
        pickle.dump(label_dict, f)
    return recognizer, label_dict

# Initial training
recognizer, label_dict = train_recognizer()
print("\nTraining complete! Starting live recognition...")

# ------------------------------
# 4️⃣ Live recognition & continuous auto-update
# ------------------------------
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        continue
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces_detected = face_cascade.detectMultiScale(gray, 1.3, 5)

    for (x, y, w, h) in faces_detected:
        face_img = gray[y:y+h, x:x+w]
        face_img = cv2.resize(face_img, (200, 200))
        label, confidence = recognizer.predict(face_img)
        name_detected = label_dict[label] if confidence < 80 else "Unknown"

        # ------------------------------
        # Unknown face detected
        # ------------------------------
        if name_detected == "Unknown":
            cv2.imshow("Live Attendance", frame)
            cv2.waitKey(1)
            print("Unknown person detected!")
            name_new = input("Enter name of this person (or leave blank to skip): ").strip()
            if name_new:
                dataset_path = f"dataset/{name_new}"
                os.makedirs(dataset_path, exist_ok=True)
                print(f"Capturing {num_images} images of {name_new}...")
                count = 0
                while count < num_images:
                    ret2, frame2 = cap.read()
                    if not ret2:
                        continue
                    gray2 = cv2.cvtColor(frame2, cv2.COLOR_BGR2GRAY)
                    faces_new = face_cascade.detectMultiScale(gray2, 1.3, 5)
                    for (x2, y2, w2, h2) in faces_new:
                        count += 1
                        face_img2 = gray2[y2:y2+h2, x2:x2+w2]
                        face_img2 = cv2.resize(face_img2, (200, 200))
                        cv2.imwrite(f"{dataset_path}/{count}.jpg", face_img2)
                        cv2.rectangle(frame2, (x2,y2), (x2+w2, y2+h2), (0,255,0), 2)
                        cv2.putText(frame2, f"{name_new} {count}/{num_images}", (x2, y2-10),
                                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2)
                    cv2.imshow("Capturing New Person", frame2)
                    if cv2.waitKey(1) & 0xFF == ord('q'):
                        break
                print(f"Captured {count} images of {name_new}!")
                recognizer, label_dict = train_recognizer()  # retrain on the fly
                name_detected = name_new

        # ------------------------------
        # Mark attendance
        # ------------------------------
        if name_detected != "Unknown" and name_detected not in df["Name"].values:
            df = pd.concat([df, pd.DataFrame({
                "Name":[name_detected],
                "Time":[datetime.now().strftime('%H:%M:%S')]
            })], ignore_index=True)
            df.to_csv(attendance_file, index=False)

        # Draw rectangle & name
        color = (0,255,0) if name_detected != "Unknown" else (0,0,255)
        cv2.rectangle(frame, (x,y), (x+w, y+h), color, 2)
        cv2.putText(frame, name_detected, (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)

    cv2.imshow("Live Attendance", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
print("\nAttendance session ended. Check attendance/attendance.csv")
