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

detect_labels(photo, 'intheloop')
detect_faces(photo, 'intheloop')

final_output = format_json(data)

print(final_output)
