import cv2
import pickle
import pandas as pd
from datetime import datetime
import os
import time

# ------------------------------
# 1️⃣ Setup files and folders
# ------------------------------
os.makedirs("attendance", exist_ok=True)
attendance_file = "attendance/attendance.csv"

# Load trained model
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read("embeddings/lbph_model.yml")

# Load label dictionary
with open("embeddings/label_dict.pkl", "rb") as f:
    label_dict = pickle.load(f)

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
# 2️⃣ Start live recognition
# ------------------------------
cap = cv2.VideoCapture(0)
print("Starting live recognition. Press 'q' to quit.")

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

        # Mark attendance if recognized
        if name_detected != "Unknown" and name_detected not in df["Name"].values:
            df = pd.concat([df, pd.DataFrame({
                "Name":[name_detected],
                "Time":[datetime.now().strftime('%H:%M:%S')]
            })], ignore_index=True)
            df.to_csv(attendance_file, index=False)

        # Draw rectangle and name
        color = (0,255,0) if name_detected != "Unknown" else (0,0,255)
        cv2.rectangle(frame, (x,y), (x+w, y+h), color, 2)
        cv2.putText(frame, name_detected, (x, y-10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)

    cv2.imshow("Live Recognition", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

    time.sleep(0.01)  # small delay to reduce CPU usage

cap.release()
cv2.destroyAllWindows()
print("Attendance session ended. Check attendance/attendance.csv")
