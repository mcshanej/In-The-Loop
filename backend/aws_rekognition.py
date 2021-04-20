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
        confidence = label['Confidence']
        print ("Label: " + label['Name'])
        print (f'Confidence: {confidence:.2f}%.')

    return len(response['Labels'])
    
def detect_faces(photo, bucket):

    client=boto3.client('rekognition')

    response = client.detect_faces(Image={'S3Object':{'Bucket':bucket,'Name':photo}},Attributes=['ALL'])

    print('Detected faces for ' + photo)    
    for faceDetail in response['FaceDetails']:
        print('The detected face is between ' + str(faceDetail['AgeRange']['Low']) 
              + ' and ' + str(faceDetail['AgeRange']['High']) + ' years old, likely ' + str(faceDetail['Gender']['Value']) + '.')
        print('Here are the other attributes:')
        #referenced faceDetail before brackets and made sure to parse any number as an integer
        for emotion in faceDetail['Emotions']:
            if int(emotion['Confidence']) >= 50:
                print('The person is likely ' + emotion['Type'] +'.')
            return len(response['FaceDetails'])


def lambda_handler(event, context):
    print("event", event)
    detect_labels(event['Records'][0]['s3']['object']['key'], 'intheloop')
    detect_faces(event['Records'][0]['s3']['object']['key'], 'intheloop')