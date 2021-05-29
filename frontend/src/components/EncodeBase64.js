import React, { useState} from "react";
import DecodeBase64 from './DecodeBase64';
import Display from './DisplayInfo';
import { FaImage } from "react-icons/fa";

export default function  EncodeBase64(){
    const [selectetdFile, setSelectedFile] = useState([]);
    const [fileBase64String, setFileBase64String] = useState("");

  const onFileChange = (e) => {
    setSelectedFile(e.target.files);
  };

  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;
        var index = Base64.indexOf(',');
        Base64 = Base64.slice(index+1);
        setFileBase64String(Base64);
       
      };
      reader.onerror = (error) => {
        console.log("error: ", error);
      };
    }
  };

  encodeFileBase64(selectetdFile[0]);
    // console.log(fileBase64String);
  
  return (
    <div>
      {fileBase64String !== "" ? <DecodeBase64 base64={fileBase64String}/> : <div> <FaImage size={100} color="purple" /> <p>No Image selected</p></div>}
      <input type="file" id="input" onChange={onFileChange} />
     <Display base64String={fileBase64String}/>
    </div>
  );
};