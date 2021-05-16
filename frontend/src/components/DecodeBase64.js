import React from "react";

export default function  DecodeBase64(props){
    
    return(
        <>
        <img src={`data:image/jpeg;base64,${props.base64}`} />
        </>
    )
}