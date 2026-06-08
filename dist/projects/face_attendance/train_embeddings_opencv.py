import cv2
import os
import numpy as np
import pickle

dataset_path = "dataset"
embeddings_path = "embeddings/faces_embeddings_opencv.pkl"
os.makedirs("embeddings", exist_ok=True)

faces = []
labels = []
label_dict = {}
current_label = 0

for person_name in os.listdir(dataset_path):
    person_path = os.path.join(dataset_path, person_name)
    label_dict[current_label] = person_name
    for image_name in os.listdir(person_path):
        img_path = os.path.join(person_path, image_name)
        img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
        faces.append(img)
        labels.append(current_label)
    current_label += 1

faces = np.array(faces)
labels = np.array(labels)

# Train OpenCV recognizer
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.train(faces, labels)

# Save model and label dict
recognizer.write("embeddings/lbph_model.yml")
with open("embeddings/label_dict.pkl", "wb") as f:
    pickle.dump(label_dict, f)

print("Training complete with OpenCV LBPH!")
