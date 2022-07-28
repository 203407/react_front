import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import {Card} from "react-bootstrap";

const urlpost = "https://192.168.1.65/gets.php";


function GeneralData() {

  const [datas,setDatas] = useState('');

  useEffect(() => {
    pot();
  }, []);


  const pot = () => {
    const peticion = {
        method: 'GET',      
    }

    get(peticion)
  
  }
  
  const get = async (peticion)  => {
  
  
    const data = await fetch(urlpost,peticion);
    const dato = await data.json();
  
    if (data.status !== 400){    
    setDatas(dato);        
    }else{
        alert("error")
    }
  
    
  }


    return (

      <div >


<Card style={{ width: '60rem' , height:' 30em', top:'40px' }} className=" container cd">
    
<div >
    <h2 className="dat">Datos de los sensores</h2>
    <label className="dhhume">dht11 humedad : {datas !== '' ? datas[datas.length-1][0] : 0}   </label> 
        
   
    <label className="dhtem">dht11 temperatura : {datas !== '' ? datas[datas.length-1][1] : 0}°</label>
      
  <br></br>
    <label className="temh">Temperatura agua : {datas !== '' ? datas[datas.length-1][2] : 0}</label>
      
   
    <label className="temt">Huemdad tierra : {datas !== '' ? datas[datas.length-1][3] : 0}°</label>
        -
   

</div>

</Card>
      </div>
    );
  }

  export default GeneralData;