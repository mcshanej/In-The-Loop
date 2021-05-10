import React, { useState } from "react";
import { render } from "react-dom";

//I tried creating a folder to keep all this info private but it didnt work so I hardcode the info
var AWS = require('aws-sdk');
var myConfig = new AWS.Config();
AWS.config.update({
  accessKeyId: "AKIAV2BHE6HFFENZBUJX",
  secretAccessKey: "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"
}); 

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
  }
});

var s3 = new AWS.S3();
var params = {
    Bucket: 'intheloop',
    Key: 'mykey.txt',
    Body: "HelloWorld"
};

s3.putObject(params, function (err, res) {
    if (err) {
        console.log("Error uploading data: ", err);
    } else {
        console.log("Successfully uploaded data to myBucket/myKey");
    }
});

const EncodeBase64 = () => {
  const [selectetdFile, setSelectedFile] = useState([]);
  const [fileBase64String, setFileBase64String] = useState("");

  //when this function is called it will set the file into selectedFile
  const onFileChange = (e) => {
    setSelectedFile(e.target.files);
  };

  //this should get called when upload button is called, but it is not working properly. 
    //It does convert any file into base64 string and then set it to varible fileBase64String
  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;
        let index = Base64.indexOf(',');
        Base64 = Base64.slice(index+1);
        setFileBase64String(Base64);
        //uploadToS3(fileBase64String);
      };
      reader.onerror = (error) => {
        console.log("error: ", error);
      };
    }
  };

  //just to make sure it is set
  console.log(fileBase64String);

  //const uploadToS3 = (fileBase64String) => {

  //}
  // encodeFileBase64(selectetdFile[0]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#907FA4",
          height: "60px",
          width: "50%",
          color: "#FFF",
          fontSize: "30px",
        }}
      >
        In The Loop
      </div>
      <br />
      <input type="file" id="input" onChange={onFileChange} />
      <button
        value='submit'
        onClick={encodeFileBase64(selectetdFile[0])}
      >Upload</button>
    </div>
  );
};

render(<EncodeBase64 />, document.querySelector("#root"));