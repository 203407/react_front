import {useEffect, useState} from "react";

import {Card} from "react-bootstrap";



const urlpost = "https://192.168.1.65/gets.php";


function TablaSensores() {

  const [datas,setDatas] = useState('');

  var lens = datas.length;

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
   <div className=''>


      <Card style={{ width: '60rem' , height:' 34em', top:'40px' }} className=" container cd2">
    

            <div className="dcl">

            <table className="tabl3">
                <thead>
                <tr className="trtb">
                    <th className="ths">Humedad DHT11   </th>
                    <th className="ths">Temperatura DHT11</th>
                    <th className="ths">Humedad suelo</th>
                    <th className="ths">Temperatura Agua</th>
                </tr>
                </thead>

                <tbody>
                  
                  
                {datas === '' ? <tr><td colSpan="3">Sin datos</td> </tr>: datas.map(item =>
                        <tr  className="trtb">
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                            <td>{item[2]}</td> 
                            <td>{item[3]}</td>                                                            
                        </tr>
                    )
                }



                </tbody>

      </table> 


            </div>
            
    
 
    
    </Card>


   </div>
  );
}

export default TablaSensores;