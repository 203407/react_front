import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import {Card, Collapse} from "react-bootstrap";
import TbT from "./TbTem"
const urlpost = "http://192.168.2.2/gets.php";





var xd = 1;
var k=0;

var limi_infe_temp = [];
var limi_supe_temp = [];



var limi_infe_hume = [];
var limi_supe_hume = [];


var frec_hume = [];
var frec_tem = [];

var frec_rel_hume = [];
var frec_rel_tem = [];

var marca_hume = [];
var marca_tem = [];

var frec_acu_hume = [];
var frec_acu_tem = [];

var frec_com_hume = [];
var frec_com_tem = [];

var limi_infe_exa_temp = [];
var limi_supe_exa_temp = [];

var limi_infe_exa_hume = [];
var limi_supe_exa_hume = [];

var media_hume = 0;
var media_tem = 0;

var mediana_hume = 0;
var mediana_tem = 0;


var moda_hume = 0;
var moda_tem = 0;

var rango_hume = 0;
var rango_tem = 0;

var varian_hume = 0;
var varian_tem = 0;

var desvia_hume = 0;
var desvia_tem=0;

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
      setDatas(dato)  
      order(dato);
    }else{
        alert("error")
    }
    
  }


  const   order =   (datas) => {
    var temperatura = [];
    var humedad = [];
    for(let i =0;i<datas.length;i++){
      temperatura[i] = parseFloat(datas[i][1]);
      humedad[i] =  parseFloat(datas[i][2]);
    }
    temperatura.sort();
    humedad.sort();

    calculos(temperatura,humedad);
  }

  const calculos = (temperatura,humedad) => {

  var tam = temperatura.length - 1;    
   k = 1 + 3.322*Math.log10(tam);    
  k = k.toFixed();  
  
  var rangoTem = temperatura[tam] - temperatura[0];
  var rangoHume = humedad[tam] - humedad[0]; 
    
  var ampliTem =  parseInt ((rangoTem / k) + 1);
  var ampliHum = parseInt ((rangoHume / k) + 1) ; 

 
  var valv = 0, valc = 0;

  // Limites temperatura
  for(let i =0;i<k;i++){
      if(i == 0){
        limi_infe_temp[i] = temperatura[0];
        valv = temperatura[0]
      }else{
        valv += ampliTem;
        limi_infe_temp[i] = valv; 
      }
  }

  for(let j = 0;j<k;j++){
    if(j == 0){
      limi_supe_temp[j] = (limi_infe_temp[1] ) - 1;
      valc = (limi_infe_temp[1] ) - 1
    }else{
      valc += ampliTem;
      limi_supe_temp[j] = valc;
    }
  }

  valv = 0;
  valc = 0;
//  Limites humedad
  for(let i =0;i<k;i++){
    if(i == 0){
      limi_infe_hume[i] = humedad[0];
      valv = humedad[0]
    }else{
      valv += ampliHum;
      limi_infe_hume[i] = valv; 
    }
}

for(let j = 0;j<k;j++){
  if(j == 0){
    limi_supe_hume[j] = (limi_infe_hume[1] ) - 1;
    valc = (limi_infe_hume[1] ) - 1
  }else{
    valc += ampliHum;
    limi_supe_hume[j] = valc;
  }
}


  //Frecuencias
  for(let i = 0;i<k;i++){

    for(let j = 0;j<tam;j++){

           
      if(temperatura[j] >= limi_infe_temp[i] && temperatura[j] <= limi_supe_temp[i] ){
       
        if(frec_tem[i] == undefined){
          frec_tem[i] = 1;  
        }else{
          frec_tem[i] += 1;
        }

      }
    }
  }      
    
  for(let i = 0;i<k;i++){
    if(frec_hume[i] == undefined){
      frec_hume[i]=0;
    }
  }
    
  for(let i = 0;i<k;i++){
    if(frec_tem[i] == undefined){
      frec_tem[i]=0;
    }
  }
  
  for(let b = 0;b<k;b++){
    for(let s = 0;s<tam;s++){
      if(humedad[s] >= limi_infe_hume[b] && humedad[s] <= limi_supe_hume[b] ){
        if(frec_hume[b] == undefined){
          frec_hume[b] = 1;  
        }else{
          frec_hume[b] += 1;
        }    
      }
    }
  }



  //Frecuencia relativa y marca de clase
  for(let i=0;i<k;i++){
      frec_rel_hume[i] = (frec_hume[i]/tam);
      frec_rel_tem[i] = (frec_tem[i]/tam);
      
      marca_tem[i] = (limi_infe_temp[i] + limi_supe_temp[i]) / 2;
      marca_hume[i] = (limi_infe_hume[i] + limi_supe_hume[i]) / 2;
  }
  
  
  //Frecuencia acumulda
  for(let i=0;i<k;i++){

    if(i==0){
    
      frec_acu_hume[i] = frec_hume[0];
      frec_acu_tem[i] = frec_tem[0]; 

  
    }else{      

      if(frec_hume[i] == undefined){
        frec_acu_hume[i] = frec_acu_hume[i-1];  
      }else{
        frec_acu_hume[i] = frec_acu_hume[i-1] + frec_hume[i];
      }
      
      if(frec_tem[i] == undefined){
        frec_acu_tem[i] = frec_acu_tem[i-1];  
      }else{
        frec_acu_tem[i] = frec_acu_tem[i-1]+ frec_tem[i]; 
      }

      }
    }    

  //Frecuencia complementaria
    console.log(tam)
  for (let i=0;i<k;i++){
    frec_com_hume[i] = tam - frec_acu_hume[i];
    frec_com_tem[i] = tam - frec_acu_tem[i];
  }


  //Limites inferiores exactos
  var univTem = (limi_infe_temp[1] - limi_supe_temp[0]) / 2;
  var univHum = (limi_infe_hume[1] - limi_supe_hume[0]) / 2;




  for(let i=0;i<k;i++){
    limi_infe_exa_hume[i] = limi_infe_hume[i] - univHum;
    limi_supe_exa_hume[i] = limi_supe_hume[i] + univHum;

    limi_infe_exa_temp[i] = limi_infe_temp[i] - univTem;
    limi_supe_exa_temp[i] = limi_supe_temp[i] + univTem;
  }

  //Media 

  for(let i =0;i<k;i++){
    media_hume += marca_hume[i] * frec_hume[i];
    media_tem += marca_tem[i] * frec_tem[i];
   }

   media_hume = media_hume / tam;
   media_tem = media_tem / tam;

   
  // mediana
  var puntoM = (tam+1) / 2;
  var placeHume = 0;
  var placeTem = 0; 

  for(let i =0;i<k;i++){
    if(puntoM <= frec_acu_hume[i]){
      placeHume = i;
      break;
    }
  }

 
  
  for(let i =0;i<k;i++){
    if(puntoM <= frec_acu_tem[i]){
      placeTem = i;
      break;
    }
  }

//mediana = round((limites_ins[place] + ( ( (tam/2) - frecM[place-1]) / frec[place]) * ampl),3) 
  if(placeHume == 0){
    mediana_hume = (limi_infe_hume[placeHume] + (tam/2) - 0) / frec_hume[placeHume];
  }else{
    mediana_hume = (limi_infe_hume[placeHume] + (tam/2) - frec_acu_hume[placeHume-1]) / frec_hume[placeHume];
  }
  
  if(placeTem == 0){
    mediana_tem = (limi_infe_temp[placeTem] + (tam/2) - 0) / frec_tem[placeTem];
  }else{
    mediana_tem = (limi_infe_temp[placeTem] + (tam/2) - frec_acu_tem[placeTem-1]) / frec_tem[placeTem];
  }
  
  mediana_hume = mediana_hume.toFixed(3);
  mediana_tem = media_tem.toFixed(3);

  var newplaceh=0,newplacet=0;
  var ht=0,hh=0;
    for(let i=0;i<k;i++){

        if(frec_hume[i] >= hh ){
          newplaceh = i;
          hh = frec_hume[i]
        }
        if(frec_tem[i]>= ht){
          newplacet = i;
          ht = frec_tem[i]
        }

    }

  var plh,plt;
    if(newplaceh == 0){
        plh = 0;
    }else{
      if(frec_hume[newplaceh-1] == undefined){
        plh = 0;
      }else{
        plh = frec_hume[newplaceh-1]
      }     
    }

    if(newplacet == 0){
      plt = 0;
    }else{
      if(frec_tem[newplacet-1] == undefined){
        plt = 0;
      }else{
        plt = frec_tem[newplacet-1]
      }     
    }

    var plm1h,plm1t;
    if(newplaceh == k-1){
      plm1h = 0;
    }else{
      if(  frec_hume[newplaceh+1] == undefined){
        plm1h = 0;
      }else{
        plm1h = frec_hume[newplaceh+1];
      }
      
    }
   
    if(newplacet == k-1){
      plm1t = 0;
    }else{
      if(frec_tem[newplacet+1] == undefined){
        plm1t = 0;
      }else{
        plm1t = frec_tem[newplacet+1];
      }
    }
    
  var amph = limi_supe_hume[0] - limi_infe_hume[0];
  var ampt = limi_supe_temp[0] - limi_infe_temp[0];;

    moda_hume = limi_infe_hume[newplaceh] + ( (frec_hume[newplaceh] - plh) / ( (frec_hume[newplaceh] - plh) +  (frec_hume[newplaceh] - plm1h)) ) * amph
    moda_tem = limi_infe_temp[newplacet] + ( (frec_tem[newplacet] - plt) / ( (frec_tem[newplacet] - plt) +  (frec_tem[newplacet] - plm1t)) ) * ampt
   


    moda_hume = moda_hume.toFixed(3);
    moda_tem = moda_tem.toFixed(3)
    rango_hume = (limi_supe_exa_hume[k-1] - limi_infe_exa_hume[0]).toFixed(3);
    rango_tem = (limi_supe_exa_temp[k-1] - limi_infe_exa_temp[0]).toFixed(3);


    var prevh,prevt;
    for(let i = 0;i<k;i++){
     
      prevh = Math.pow((marca_hume[i] - media_hume),2) * frec_hume[i];
     
      varian_hume += prevh;
      
      prevt = Math.pow((marca_tem[i] - media_tem),2) * frec_tem[i];
      varian_tem += prevt;

    }    


    varian_hume = (varian_hume / tam).toFixed(3);
    varian_tem = (varian_tem / tam).toFixed(3);

    desvia_hume = Math.sqrt(varian_hume).toFixed(3);
    desvia_tem = Math.sqrt(varian_tem).toFixed(3);
    
    media_hume = media_hume.toFixed(3);
    media_tem = media_tem.toFixed(3);
  }
 

    return (
      <div>
        

    <Card style={{ width: '80rem' , height:'40rem', top:'40px' }} className=" container cd2">
    
    <div >
      
      <table style={{ width: '40rem'} } className="tabl">
                <thead>
                <tr>
                    <th>clase   </th>
                    <th>Marca de clase</th>
                    <th>Limi Inferiores</th>
                    <th>Limi Superiores</th>
                    <th>Frecuencia Absoluta</th>             
                    <th>Frecuencia Acomulada</th>
                    <th>Frecuencia complementaria</th>
                    <th>Limi Inferiores exactos</th>
                    <th>Limi Superiores exactos</th>
                </tr>
                </thead>

                <tbody>
                
                <tr >               
                {marca_hume.map(item =>            
                    <tr >{xd++}</tr>  
                )}                  
                </tr>
                
                
                <tr  className="mc" >               
                {marca_hume.map(item =>            
                    <tr >{item}</tr>  
                )}                  
                </tr>
                
                <tr className="limInHume">               
                {limi_infe_hume.map(item =>            
                    <tr>{item}</tr>  
                )}                  
                </tr>

                <tr className="limSuHume">               
                {limi_supe_hume.map(item =>            
                    <tr>{item}</tr>  
                )}                  
                </tr>

                {/* datas !== '' ? datas[datas.length-1][3] : 0 */}
                <tr className="frecH">               
                {frec_hume.map(item =>            
                    <tr>{ item }</tr>   )}                  
                </tr>

                <tr className="frecAco">               
                {frec_acu_hume.map(item =>            
                    <tr>{ item }</tr>   )}                  
                </tr>

                <tr className="frecCom">               
                {frec_com_hume.map(item =>            
                    <tr>{ item }</tr>   )}                  
                </tr>


                <tr className="limInHumeAxac">               
                {limi_infe_exa_hume.map(item =>            
                    <tr>{ item }</tr>   )}                  
                </tr>

                <tr className="limSuHumeAxac">               
                {limi_supe_exa_hume.map(item =>            
                    <tr>{ item }</tr>   )}                  
                </tr>

                </tbody>

      </table> 
        
        <div className="dataS">
          <h5 style={{}}>Datos estadisticos  de la humedad de la tierra</h5>
          <h5>Media : {media_hume}</h5>
          <h5>mediana : {mediana_hume}</h5>
          <h5>Moda : {moda_tem}</h5>
          <h5>Rango : {rango_hume}</h5>
          <h5>Varianza : {varian_hume}</h5>
          <h5>Desviacion estandar : {desvia_hume}</h5>
        </div>
        
          


        <table style={{ width: '40rem'} } className="tabl2">
    <thead>
    <tr>
        <th>clase   </th>
        <th>Marca de clase</th>
        <th>Limi Inferiores</th>
        <th>Limi Superiores</th>
        <th>Frecuencia Absoluta</th>             
        <th>Frecuencia Acomulada</th>
        <th>Frecuencia complementaria</th>
        <th>Limi Inferiores exactos</th>
        <th>Limi Superiores exactos</th>
    </tr>
    </thead>

    <tbody>
    
    <tr >               
    {marca_tem.map(item =>            
        <tr >{xd++}</tr>  
    )}                  
    </tr>
    
    
    <tr  className="mc" >               
    {marca_tem.map(item =>            
        <tr >{item}</tr>  
    )}                  
    </tr>
    
    <tr className="limInHume">               
    {limi_infe_temp.map(item =>            
        <tr>{item}</tr>  
    )}                  
    </tr>

    <tr className="limSuHume">               
    {limi_supe_temp.map(item =>            
        <tr>{item}</tr>  
    )}                  
    </tr>

    {/* datas !== '' ? datas[datas.length-1][3] : 0 */}
    <tr className="frecH">               
    {frec_tem.map(item =>            
        <tr>{ item }</tr>   )}                  
    </tr>

    <tr className="frecAco">               
    {frec_acu_tem.map(item =>            
        <tr>{ item }</tr>   )}                  
    </tr>

    <tr className="frecCom">               
    {frec_com_tem.map(item =>            
        <tr>{ item }</tr>   )}                  
    </tr>


    <tr className="limInHumeAxac">               
    {limi_infe_exa_temp.map(item =>            
        <tr>{ item }</tr>   )}                  
    </tr>

    <tr className="limSuHumeAxac">               
    {limi_supe_exa_temp.map(item =>            
        <tr>{ item }</tr>   )}                  
    </tr>

    </tbody>

</table> 
        <div className="dataS2">
          <h5 style={{}}>Datos estadisticos  de la Temperatura Ambiente</h5>
          <h5>Media : {media_tem}</h5>
          <h5>mediana : {mediana_tem}</h5>
          <h5>Moda : {moda_tem}</h5>
          <h5>Rango : {rango_tem}</h5>
          <h5>Varianza : {varian_tem}</h5>
          <h5>Desviacion estandar : {desvia_tem}</h5>
        </div>
{/* 
        <TbT  
        marca_te = {marca_tem} limi_infe_te = {limi_infe_temp} limi_supe_te = {limi_supe_temp}  frec_te = {frec_tem}  
        frec_acu_te = {frec_acu_tem}  frec_com_te = {frec_com_tem}  limi_infe_exa_te = {limi_infe_exa_temp} limi_supe_exa_te = {limi_supe_exa_temp}
        ></TbT> */}
    </div>
    
    </Card>

      </div>
    );
  }

  export default Tablas;