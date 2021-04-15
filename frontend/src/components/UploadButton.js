import React, {useState}  from 'react';
import './Button.css';

export default function UploadButton() {
    const [button, setButton] = useState([]);

    return (
        <div className="">
            <button className="uploadBtn">Upload</button>
        </div>
    )
}
