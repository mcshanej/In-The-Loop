import React,{useState} from "react";
import DecodeBase64 from './DecodeBase64';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DisplayInfo.css';

export default function DisplayInfo(props){
  const [information, setInfo] = useState([]);
  const [otherInfo, setOther] = useState([]);

  // console.log(props);
  // console.log(`this is infromation at inital state: ${JSON.stringify(information)}`);
  // console.log(`this is otherInfo at inital state: ${JSON.stringify(otherInfo)}`);

  function setInfoDisplay(){
    let tempObj ={
      name: props.value[0],
      file: props.value[1]
    };

    fetch("/prod",{
      method: 'POST',
      headers: {
        'Content-type':'application/json',
        'x-api-key':'Fnb8IvMbre9DZrKWijiT650Tbm8Dz6eG4NSnTXV4',
        // 'Accept': '*/*',
        // 'Host': 'h42azzyqjf.execute-api.us-west-2.amazonaws.com',
        // 'Accept-Encoding': 'gzip, deflate, br'
      },
      body: JSON.stringify(tempObj)
    })
      .then(res => res.json())
      .then(json => {
        // console.log(`This is JSON after api is called: ${JSON.stringify(json)}`);
        setInfo(json.labels);
        setOther(json.people);
      })
  }

    return(
      <>
        <button className='uploadBtn' onClick={setInfoDisplay}>Upload File</button> 
        <br/>
        <br/>
        {props.value[1] === undefined ? <p></p>:<DecodeBase64 name ={props.value[0]}base64={props.value[1]}/>} 
        <div className='div'>
          <Table striped bordered hover responsive="sm" size="sm">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Confidence Percentage</th>
              </tr>
            </thead>
            {information !== undefined || information.lenght !== 0 ? 
              information.map((information)=>( 
                <tbody>
                  <tr>
                    <td>{information.name}</td>
                    <td>{Math.round(information.confidence*100)/100}%</td>
                  </tr>
                </tbody>     
              )):<p></p>}
          </Table>
          <Table striped bordered responsive hover size="sm">
            <thead>
              <tr>
                <th scope="col">Gender</th>
                <th scope="col">Age Min</th>
                <th scope="col">Age Max</th>
                <th scope="col">Emotions</th>
              </tr>
            </thead>
            {otherInfo !== undefined || otherInfo.length !== 0 ? otherInfo.map((otherInfo)=>(
              <tbody>
                <tr>
                  <td>{otherInfo.Gender}</td>
                  <td>{otherInfo.agemin}</td>
                  <td>{otherInfo.agemax}</td>
                  <td>{otherInfo.Emotions}</td>
                </tr>
              </tbody>    
            )):<p></p>}
          </Table> 
        </div>
      </>
    )
  } 