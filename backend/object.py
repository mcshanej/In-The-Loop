import json
import boto3

def format_json(data):
  json_data = json.dumps(data)
  return json_data

def detect_labels(photo, bucket):
    client=boto3.client('rekognition')
    response = client.detect_labels(Image={'S3Object':{'Bucket':bucket,'Name':photo}},
        MaxLabels=5, MinConfidence=80)
    
    for label in response['Labels']:
        obj = {}        
        obj['confidence'] = label['Confidence']
        obj['name'] = label['Name']
        data['labels'].append(obj)


def detect_faces(photo, bucket):
    client=boto3.client('rekognition')
    response = client.detect_faces(Image={'S3Object':{'Bucket':bucket,'Name':photo}},Attributes=['ALL'])
    
    for faceDetail in response['FaceDetails']:
        pobj = {}
        pobj['agemin'] = faceDetail['AgeRange']['Low']
        pobj['agemax'] = faceDetail['AgeRange']['High']
        pobj['Gender'] = faceDetail['Gender']['Value']
        
        eobj = []
        for emotion in faceDetail['Emotions']:
            if int(emotion['Confidence']) >= 50:
                eobj.append(emotion['Type'])
        pobj['Emotions'] = eobj
        data['people'].append(pobj)
   
data = {"labels": [],
        "people": []
    }

while True:
    photo = input('Please choose an image from the list: atom.png \ncat.jpg \ncat2.jpg \nCoronavirus-CDC-768x432.jpg \ndog.jpg \ngalaxy.jpg \nperson_dog.jpg \nrhianna.jpg \ntherock.jpg:\n')
    if photo not in ('\natom.png', 'cat.jpg', 'cat2.jpg', 'Coronavirus-CDC-768x432.jpg', 'dog.jpg', 'galaxy.jpg', 'person_dog.jpg', 'rhianna.jpg', 'therock.jpg'):
        print('\nNot an appropriate choice. Please select from the list again.\n')
    else:
        break

detect_labels(photo, 'intheloop')
detect_faces(photo, 'intheloop')

final_output = format_json(data)

print(final_output)
