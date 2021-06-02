import React, {useState} from 'react';
import DisplayInfo from './DisplayInfo';
import './EncodeBase64.css';

export default function  EncodeBase64(){
  const [fileInfo, setFileInfo] = useState([]);
 
  const onFileChange = (e) => {
    //is an array
    let file = e.target.files;
    let selectedFile = file[0];
    let name = selectedFile.name;
    let tempArr =[];

    tempArr.push(name);

    var reader = new FileReader();
      if (selectedFile) {
        reader.readAsDataURL(selectedFile);
        reader.onload = () => {
          var Base64 = reader.result;
          var index = Base64.indexOf(',');
          Base64 = Base64.slice(index+1);
          tempArr.push(Base64);
        };
      reader.onerror = (error) => {
        console.log("error: ", error);
      };
      };
    setFileInfo(tempArr);
  }
  
  return (
    <div className='base64Container'>
      <input type="file" id="input" onChange={onFileChange} />
      <DisplayInfo value={fileInfo} />
    </div>
  );
};