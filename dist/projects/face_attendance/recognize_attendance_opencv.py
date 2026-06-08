import cv2
import os
import pickle
import pandas as pd
from datetime import datetime

# Load recognizer and labels
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read("embeddings/lbph_model.yml")
with open("embeddings/label_dict.pkl", "rb") as f:
    label_dict = pickle.load(f)

# Prepare attendance file
os.makedirs("attendance", exist_ok=True)
attendance_file = "attendance/attendance.csv"
if os.path.exists(attendance_file):
    df = pd.read_csv(attendance_file)
else:
    df = pd.DataFrame(columns=["Name", "Time"])

# Face detector
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Start webcam
cap = cv2.VideoCapture(0)
print("Press 'q' to quit.")

while True:
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    for (x, y, w, h) in faces:
        face_img = gray[y:y+h, x:x+w]
        label, confidence = recognizer.predict(face_img)
        name = label_dict[label] if confidence < 80 else "Unknown"

        # Mark attendance
        if name != "Unknown" and name not in df["Name"].values:
            df = pd.concat([df, pd.DataFrame({"Name":[name], "Time":[datetime.now().strftime('%H:%M:%S')]})], ignore_index=True)
            df.to_csv(attendance_file, index=False)

        # Draw rectangle & name
        color = (0, 255, 0) if name != "Unknown" else (0, 0, 255)
        cv2.rectangle(frame, (x,y), (x+w,y+h), color, 2)
        cv2.putText(frame, name, (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)

    cv2.imshow("Attendance", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
print("Attendance recognition done")