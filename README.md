# In-The-Loop
## Image Recognition App

This app submits an image selected by the user to the AWS Rekognition API for analysis. The image must be a .jpg or .png file format. We utilize the detect_label and detect_faces functions from the API.

The response from the rekognition API is parsed and select pieces of data are returned to the user. The user is given the labels for the image if rekognition is at least 80% confident in the label, up to a total of 5 labels. If a face is detected in the image the user is also given the probable sex, age range, and emotions (over 50% confidence) for the face.

### Setting up your local system




