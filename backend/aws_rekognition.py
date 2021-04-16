import json
import boto3

def detect_labels(photo, bucket):

    client=boto3.client('rekognition')

    response = client.detect_labels(Image={'S3Object':{'Bucket':bucket,'Name':photo}},
        MaxLabels=5)

    print('Detected labels for ' + photo) 
    print()   
    for label in response['Labels']:
        print ("Label: " + label['Name'])
        print ("Confidence: " + str(label['Confidence']))
        print ()
    return len(response['Labels'])

def lambda_handler(event, context):
    print("event", event)
    detect_labels(event['Records'][0]['s3']['object']['key'], 'intheloop')