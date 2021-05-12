#Modified from https://docs.aws.amazon.com/rekognition/latest/dg/labels-detect-labels-image.html to format returns differently.
import json
import boto3


#Function for label recognition in image
def detect_labels(photo, bucket):

#Defines which AWS service to access
    client=boto3.client('rekognition')
#Set parameters for the response from rekognition - Where to find the uploaded version of the image (our s3 bucket), image to be analyzed, max of 5 labels, only over 80% confidence
    response = client.detect_labels(Image={'S3Object':{'Bucket':bucket,'Name':photo}},
        MaxLabels=5, MinConfidence=80)
#Accesses the correct entries in the response (nested dictionary/list) from aws rekognition. print (f'Confidence: {confidence:.2f}%.') is formatting the response to print the confidence as a percentage to the second decimal place
    print('Detected labels for ' + photo) 
    print()   
    for label in response['Labels']:
        obj = {}        
        obj['confidence'] = label['Confidence']
        obj['name'] = label['Name']
        data['labels'].append(obj)
        #print ("Label: " + label['Name'])
        #print (f'Confidence: {confidence:.2f}%.')
    return len(response['Labels'])

# Modified from https://docs.aws.amazon.com/rekognition/latest/dg/faces-detect-images.html to format response differently and provide a different set of information and the original template
def detect_faces(photo, bucket):
#Defines which AWS service to access#Modified from https://docs.aws.amazon.com/rekognition/latest/dg/labels-detect-labels-image.html to format returns differently.
import json
import boto3

#Function for label recognition in image
def detect_labels(photo, bucket):
#Defines which AWS service to access
    client=boto3.client('rekognition')
#Set parameters for the response from rekognition - Where to find the uploaded version of the image (our s3 bucket), image to be analyzed, max of 5 labels, only over 80% confidence
    response = client.detect_labels(Image={'S3Object':{'Bucket':bucket,'Name':photo}},
        MaxLabels=5, MinConfidence=80)
#Accesses the correct entries in the response (nested dictionary/list) from aws rekognition. print (f'Confidence: {confidence:.2f}%.') is formatting the response to print the confidence as a percentage to the second decimal place
    print('Detected labels for ' + photo) 
    print()   
    for label in response['Labels']:
        confidence = label['Confidence']
        print ("Label: " + label['Name'])
        print (f'Confidence: {confidence:.2f}%.')

    return len(response['Labels'])

# Modified from https://docs.aws.amazon.com/rekognition/latest/dg/faces-detect-images.html to format response differently and provide a different set of information and the original template
def detect_faces(photo, bucket):
#Defines which AWS service to access
    client=boto3.client('rekognition')
#Set parameters for the response from rekognition - Where to find the uploaded version of the image (our s3 bucket), image to be analyzed, which information to return (all)
    response = client.detect_faces(Image={'S3Object':{'Bucket':bucket,'Name':photo}},Attributes=['ALL'])
#Accesses the correct entries in the response (nested dictionary/list) from aws rekognition. Printing age range (high and low to provide range), gender, and emotions with over 50% confidence.
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

#Allows user to select an image from a predetermined set. Will prompt for a correct choice if input is not from list of strings)
while True:
    photo = input('Please choose an image from the list: atom.png \ncat.jpg \ncat2.jpg \nCoronavirus-CDC-768x432.jpg \ndog.jpg \ngalaxy.jpg \nperson_dog.jpg \nrhianna.jpg \ntherock.jpg:\n')
    if photo not in ('\natom.png', 'cat.jpg', 'cat2.jpg', 'Coronavirus-CDC-768x432.jpg', 'dog.jpg', 'galaxy.jpg', 'person_dog.jpg', 'rhianna.jpg', 'therock.jpg'):
        print('\nNot an appropriate choice. Please select from the list again.\n')
    else:
        break


#calls functions for detecting labels and faces using image name provided by the user and hard-coded pointer to our S3 bucket
detect_labels(photo, 'intheloop')
detect_faces(photo, 'intheloop')
    client=boto3.client('rekognition')
#Set parameters for the response from rekognition - Where to find the uploaded version of the image (our s3 bucket), image to be analyzed, which information to return (all)
    response = client.detect_faces(Image={'S3Object':{'Bucket':bucket,'Name':photo}},Attributes=['ALL'])
#Accesses the correct entries in the response (nested dictionary/list) from aws rekognition. Printing age range (high and low to provide range), gender, and emotions with over 50% confidence.
    print('Detected faces for ' + photo)    
    for faceDetail in response['FaceDetails']:
        pobj = {}
        pobj['agemin'] = faceDetail['AgeRange']['Low']
        pobj['agemax'] = faceDetail['AgeRange']['High']
        pobj['Gender'] = faceDetail['Gender']['Value']
        data['people'].append(pobj)
        #print('The detected face is between ' + str(faceDetail['AgeRange']['Low']) 
              #+ ' and ' + str(faceDetail['AgeRange']['High']) + ' years old, likely ' + str(faceDetail['Gender']['Value']) + '.')
        #print('Here are the other attributes:')
        #referenced faceDetail before brackets and made sure to parse any number as an integer
        
        #for emotion in faceDetail['Emotions']:
         #   if int(emotion['Confidence']) >= 50:
          #      print('The person is likely ' + emotion['Type'] +'.')
           # return len(response['FaceDetails'])

data = {"labels": [],
        "people": []
    }

print(data)
#Allows user to select an image from a predetermined set. Will prompt for a correct choice if input is not from list of strings)
while True:
    photo = input('Please choose an image from the list: atom.png \ncat.jpg \ncat2.jpg \nCoronavirus-CDC-768x432.jpg \ndog.jpg \ngalaxy.jpg \nperson_dog.jpg \nrhianna.jpg \ntherock.jpg:\n')
    if photo not in ('\natom.png', 'cat.jpg', 'cat2.jpg', 'Coronavirus-CDC-768x432.jpg', 'dog.jpg', 'galaxy.jpg', 'person_dog.jpg', 'rhianna.jpg', 'therock.jpg'):
        print('\nNot an appropriate choice. Please select from the list again.\n')
    else:
        break


#calls functions for detecting labels and faces using image name provided by the user and hard-coded pointer to our S3 bucket
detect_labels(photo, 'intheloop')
detect_faces(photo, 'intheloop')