import React from "react";
import './DecodeBase64.css';

export default function  DecodeBase64(props){
    
    return(
        <div className="DecodeContainer">
            <img className='picUploaded' src={`data:image/jpeg;base64,${props.base64}`} alt={`file name: ${props.name}`} /> 
            <p>{props.name}</p>
        </div>
    )
}