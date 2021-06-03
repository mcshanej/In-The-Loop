# lambda function that processes post event to api gateway,
# takes file and base64 encoded image, uploads to s3, sends data to
# rekognition, and then returns a formatted json response
#
# TODO: this has an error

import base64
import json
import boto3

s3 = boto3.client('s3')
rekognition_client = boto3.client('rekognition')
bucket_name = 'in-the-loop-official'

data = {
    "labels": [],
    "people": [],
}

def format_json(data):
  json_data = json.dumps(data)
  return json_data


def detect_labels(photo, bucket):
    response = rekognition_client.detect_labels(Image={'S3Object':{'Bucket':bucket,'Name':photo}},
        MaxLabels=5, MinConfidence=80)
    for label in response['Labels']:
        obj = {}
        obj['confidence'] = label['Confidence']
        obj['name'] = label['Name']
        data['labels'].append(obj)


def detect_faces(photo, bucket):
    response = rekognition_client.detect_faces(Image={'S3Object':{'Bucket':bucket,'Name':photo}},Attributes=['ALL'])
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


def send_image_to_rekognition_and_build_response(photo_name):
    detect_labels(photo_name, bucket_name)
    detect_faces(photo_name, bucket_name)
    final_output = format_json(data)
    print(final_output)
    return final_output


def lambda_handler(event, context):
  print event
  if event['httpMethod'] == 'POST':
    print event['body']
    data = json.loads(event['body'])
    photo_name = data["name"]
    image = data['file']
    image = image[image.find(",")+1:]
    dec = base64.b64decode(image + "===")
    s3.put_object(Bucket='in-the-loop-official', Key=name, Body=dec)
    json_response = send_image_to_rekognition_and_build_response(photo_name)
    return {'statusCode': 200, 'body': json_response), 'headers': {'Access-Control-Allow-Origin': '*'}}
