import React,{ useState, useEffect } from "react";

export default function  DisplayInfo(){
      const [information, setInfo] = useState([]);
      const [otherInfo, setOther] = useState([]);

  useEffect(() => {
    fetch("/api/information")
      .then(res => res.json())
      .then(json => {
        setInfo(json.labels)
        setOther(json.people)
      })
  }, [])
  
  console.log(information);
  console.log(otherInfo);
    // console.log(information[0]);
    return(
        <>
        
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
           )) }
          
        </>
    )
}