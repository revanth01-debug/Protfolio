import cv2
import os

name = input("Enter your name: ")

path = os.path.join("dataset", name)
os.makedirs(path, exist_ok=True)

cam = cv2.VideoCapture(0)
count = 0

print("Press 'c' to capture images")

while True:
    ret, frame = cam.read()
    if not ret:
        break

    cv2.imshow("Collect Face", frame)

    key = cv2.waitKey(1) & 0xFF
    if key == ord('c'):
        count += 1
        cv2.imwrite(f"{path}/{count}.jpg", frame)
        print(f"Saved image {count}")

    if count == 20:
        break

cam.release()
cv2.destroyAllWindows()
print("Face collection done")
