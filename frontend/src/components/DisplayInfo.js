import React,{ useState, Component} from "react";
import DecodeBase64 from './DecodeBase64';
import Table from 'react-bootstrap/Table';

export default function DisplayInfo(props){
  const [information, setInfo] = useState([]);
  const [otherInfo, setOther] = useState([]);

  console.log(`this is infromation at inital state: ${JSON.stringify(information)}`);
  console.log(`this is otherInfo at inital state: ${JSON.stringify(otherInfo)}`);

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
        console.log(`This is JSON after api is called: ${JSON.stringify(json)}`);
        setInfo(json.labels);
        setOther(json.people);

      })
  }

    return(
      <>
        <button onClick={setInfoDisplay}>Upload</button> 
        <br/>
        <br/>
        <div className='displayInfo container'>
          <DecodeBase64 base64={props.value[1]}/> 
          {/* <Table striped bordered hover>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Confidence Percentage</th>
              </tr>
            </thead>
              {information.map((information)=>(
                <tbody>
                <tr>
                  <th scope="row"></th>
                  <td>{information.name}</td>
                  <td>{Math.floor(information.confidence)}%</td>
                </tr>
                 </tbody>
            ))}
          </Table>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Gender</th>
                <th scope="col">Age Min</th>
                <th scope="col">Age Max</th>
                <th scope="col">Emotions</th>
              </tr>
            </thead>
            <tbody>
              {otherInfo.map((otherInfo)=>(
                <tr>
                  <th scope="row">1</th>
                  <td>{otherInfo.agemin}</td>
                  <td>{otherInfo.agemax}</td>
                  <td>{otherInfo.Gender}</td>
                  <td>{otherInfo.Emotions}</td>
                </tr>
            ))}
            </tbody>
          </Table> */}
            {information.map((information)=>(
              <div> 
              <div>{Math.floor(information.confidence)}%</div>
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
        </div>
        </>
    
    )
}