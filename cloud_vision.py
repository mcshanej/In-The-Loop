
import io
import os

#activates the authentication key
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'key.json'

# Imports the Google Cloud client library
from google.cloud import vision

# Instantiates a client
client = vision.ImageAnnotatorClient()

# The name of the image file to annotate - UPDATE PATH FOR THE FILE YOU ARE SUBMITTING
# file_name = os.path.abspath('images/cat.jpg')
# file_name = os.path.abspath('images/cat2.jpg')
file_name = os.path.abspath('images/therock.jpg')

# Loads the image into memory
with io.open(file_name, 'rb') as image_file:
    content = image_file.read()

image = vision.Image(content=content)

def detect_label(path):
# Performs label detection on the image file
    response = client.label_detection(image=image)
    labels = response.label_annotations
#prints results with confidence percentage
    print('Labels:')
    for label in labels:
        desc, score = label.description, int(label.score * 100)
        print(f"{desc} {score}%")


def detect_landmarks(path):
#performs landmark detection on the image file
    response = client.landmark_detection(image=image)
    landmarks = response.landmark_annotations
    print('Landmarks:')

    for landmark in landmarks:
        print(landmark.description)
        for location in landmark.locations:
            lat_lng = location.lat_lng
            print('Latitude {}'.format(lat_lng.latitude))
            print('Longitude {}'.format(lat_lng.longitude))


def detect_faces(path):
    response = client.face_detection(image=image)
    faces = response.face_annotations

    # Names of likelihood from google.cloud.vision.enums
    likelihood_name = ('UNKNOWN', 'VERY_UNLIKELY', 'UNLIKELY', 'POSSIBLE',
                       'LIKELY', 'VERY_LIKELY')
    print('Faces:')

    for face in faces:
        print('anger: {}'.format(likelihood_name[face.anger_likelihood]))
        print('joy: {}'.format(likelihood_name[face.joy_likelihood]))
        print('surprise: {}'.format(likelihood_name[face.surprise_likelihood]))


def detect_text(path):
    response = client.text_detection(image=image)
    texts = response.text_annotations
    print(f'Texts:\n{texts}')

    for text in texts:
        print('\n"{}"'.format(text.description))


detect_label(file_name)
detect_landmarks(file_name)
#detect_text(file_name)
detect_faces(file_name)