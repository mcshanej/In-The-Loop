import React,{Component} from 'react';
import axios from 'axios';
class App extends Component {

	state = {
    // Initially, no file is selected
	  selectedFile: null
	};
	
	// On file select 
	onFileChange = event => {
	  // Update the state
	  this.setState({ selectedFile: event.target.files[0] });
	};
	
	// On file upload (click the upload button)
	onFileUpload = () => {
	  // Create an object of formData
	  const formData = new FormData();
	  // Update the formData object
	  formData.append(
		  "myFile",
		  this.state.selectedFile,
		  this.state.selectedFile.name
	  );
	
	  // Details of the uploaded file
    // console.log("hello");
	  // console.log(this.state.selectedFile);
	
	  // Request made to the backend api
	  // Send formData object
	  axios.post("api/uploadfile", formData);};
//     const AWS = require('aws-sdk');
// const axios = require('axios');
// let rekognition = new AWS.Rekognition({apiVersion: '2016-06-27', region: 'us-east-1'});

// let url = "api/uploadfile";

// axios({
//     method: 'GET',
//     url,
//     responseType: 'arraybuffer'
// })
//     .then(response => {
//             console.log(response)
//             let params = {
//                     Image: {
//                             Bytes: response.data
//                     },
//                     Attributes: ['ALL']
//             };

//             rekognition.detectFaces(params, (err, data) => {
//                     if(err) console.log(err);
//                     else console.log(JSON.stringify(data));
//             });
//     })
//     .catch(err => console.log(err));
// 	};
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
	  if (this.state.selectedFile) {
		  return (
		    <div>
			    <h2>File Details:</h2>
			    <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>File Size: {this.state.selectedFile.size}</p>
        </div>
		  );
	  } 
	};
	
	render() {
	  return (
		  <div>
			  <h3>File Upload </h3>
			<div>
			<input type="file" onChange={this.onFileChange} />
      &nbsp;&nbsp;&nbsp;
			<button onClick={this.onFileUpload}>Upload!</button>
			</div>
		    {this.fileData()}
		  </div>
	  );
	}
}

export default App;
