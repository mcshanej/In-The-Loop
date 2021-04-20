#Modified from https://docs.aws.amazon.com/rekognition/latest/dg/labels-detect-labels-image.html to be used in a lambda fun tion and format returns differently.

import json
import boto3

def detect_labels(photo, bucket):

    client=boto3.client('rekognition')

    response = client.detect_labels(Image={'S3Object':{'Bucket':bucket,'Name':photo}},
        MaxLabels=5, MinConfidence=80)

    print('Detected labels for ' + photo) 
    print()   
    for label in response['Labels']:
        confidence = str(label['Confidence'])
        print ("Label: " + label['Name'])
        print (f"Confidence: {confidence:.2f}%.")
        print ()
    return len(response['Labels'])

def lambda_handler(event, context):
    print("event", event)
    detect_labels(event['Records'][0]['s3']['object']['key'], 'intheloop')