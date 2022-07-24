import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import {Card} from "react-bootstrap";

const urlpost = "http://192.168.2.6/gets.php";


function Tablas() {

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



  const lol = () => {
    return<td>hola</td>

   
  }

    return (
      <div>
        

    <Card style={{ width: '80rem' , height:' 40rem', top:'40px' }} className=" container cd2">
    
    <div >

    <table class="table table-hover" id={"tab"}>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th>Mascotas</th>
                </tr>
                </thead>

                <tbody>

      
     

      {/* {()=> {
        for(var i = 0;i<1;i++){
          console.log(i);
          <td>{datas[i][0]}</td>
        }
      }} */}


      </tbody>

      </table>
    </div>
    
    </Card>

      </div>
    );
  }

  export default Tablas;