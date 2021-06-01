import React,{ useState} from "react";
import DecodeBase64 from './DecodeBase64';

export default function DisplayInfo(props){
  const [information, setInfo] = useState([]);
  const [otherInfo, setOther] = useState([]);
 
  function setInfoDisplay(){
    var tempObj ={
      name: props.value[0],
      file: props.value[1]
    };

    fetch("/prod",{
      method: 'POST',
      headers: {
        'Content-type':'application/json',
        'x-api-key':'Fnb8IvMbre9DZrKWijiT650Tbm8Dz6eG4NSnTXV4',
        'Accept': '*/*',
        'Host': 'h42azzyqjf.execute-api.us-west-2.amazonaws.com',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      body: JSON.stringify(tempObj)
    })
      .then(res => res.json())
      .then(json => {
        setInfo(json.labels);
        setOther(json.people);

      })
  }

    return(
      <>
        <button onClick={setInfoDisplay}>Upload</button> 
        <br/>
        <DecodeBase64 base64={props.value[1]}/> 
          {information.map((information)=>(
            <div> 
            <div>{information.confidence}</div>
            <div>{information.name}</div>
            </div>
          ))}
          {otherInfo.map((otherInfo)=>(
            <div>
            <div>{otherInfo.agemin}</div>
            <div>{otherInfo.agemax}</div>
            <div>{otherInfo.Gender}</div>
            <div>{otherInfo.Emotions}</div>
            </div>
          ))}
      </>
    )
}