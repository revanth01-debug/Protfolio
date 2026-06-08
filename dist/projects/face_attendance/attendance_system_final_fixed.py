import cv2
import os
import numpy as np
import pandas as pd
import pickle
import time
from datetime import datetime


# ------------------------------
# 1️⃣ Get user info and create folder
# ------------------------------
name = input("Enter your name: ").strip()
dataset_path = f"dataset/{name}"
os.makedirs(dataset_path, exist_ok=True)

num_images = 20
cap = cv2.VideoCapture(0)
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

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
        face_img = cv2.resize(face_img, (200, 200))  # Resize for LBPH
        cv2.imwrite(f"{dataset_path}/{count}.jpg", face_img)
        cv2.rectangle(frame, (x,y), (x+w, y+h), (0,255,0), 2)
        cv2.putText(frame, f"{count}/{num_images}", (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2)
    
    cv2.imshow("Capturing Faces", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
print(f"Captured {count} images!")

# ------------------------------
# 2️⃣ Train LBPH Recognizer
# ------------------------------
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

labels = np.array(labels)

recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.train(faces, labels)
os.makedirs("embeddings", exist_ok=True)
recognizer.write("embeddings/lbph_model.yml")
with open("embeddings/label_dict.pkl", "wb") as f:
    pickle.dump(label_dict, f)

print("Training complete!")

# ------------------------------
# 3️⃣ Recognize faces & mark attendance
# ------------------------------
os.makedirs("attendance", exist_ok=True)
attendance_file = "attendance/attendance.csv"

# Safely handle empty CSV
if os.path.exists(attendance_file):
    try:
        df = pd.read_csv(attendance_file)
    except pd.errors.EmptyDataError:
        df = pd.DataFrame(columns=["Name", "Time"])
else:
    df = pd.DataFrame(columns=["Name", "Time"])

cap = cv2.VideoCapture(0)
print("Starting live attendance. Press 'q' to quit.")

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

        # Mark attendance
        if name_detected != "Unknown" and name_detected not in df["Name"].values:
            df = pd.concat([df, pd.DataFrame({"Name":[name_detected], "Time":[datetime.now().strftime('%H:%M:%S')]})], ignore_index=True)
            df.to_csv(attendance_file, index=False)

        # Draw rectangle & name
        color = (0,255,0) if name_detected != "Unknown" else (0,0,255)
        cv2.rectangle(frame, (x,y), (x+w, y+h), color, 2)
        cv2.putText(frame, name_detected, (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)
        # inside your while True loop
while True:
    ret, frame = cap.read()
    if not ret:
        continue

    cv2.imshow("Attendance", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
print("Attendance session ended. Check attendance/attendance.csv")
