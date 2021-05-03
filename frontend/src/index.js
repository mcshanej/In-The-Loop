import React, { useState } from "react";
import { render } from "react-dom";

const EncodeBase64 = () => {
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
  console.log(fileBase64String);

  return (
    <div>
      <input type="file" id="input" onChange={onFileChange} />
    </div>
  );
};

render(<EncodeBase64 />, document.querySelector("#root"));