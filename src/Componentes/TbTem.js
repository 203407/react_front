

// function TbTem(marca_tem,limi_infe_tem,limi_supe_tem,frec_tem,frec_acu_tem,frec_com_tem,limi_infe_exa_tem,limi_supe_exa_tem) {
    function TbTem(props) {
var xd =0;


  return (
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
    {props.marca_te.map(item =>            
        <tr >{xd++}</tr>  
    )}                  
    </tr>
    
    
    <tr  className="mc" >               
    {props.marca_te.map(item =>            
        <tr >{item}</tr>  
    )}                  
    </tr>
    
    <tr className="limInHume">               
    {props.limi_infe_te.map(item =>            
        <tr>{item}</tr>  
    )}                  
    </tr>

    <tr className="limSuHume">               
    {props.classNamelimi_supe_te.map(item =>            
        <tr>{item}</tr>  
    )}                  
    </tr>

    {/* datas !== '' ? datas[datas.length-1][3] : 0 */}
    <tr className="frecH">               
    {props.frec_te.map(item =>            
        <tr>{ item }</tr>   )}                  
    </tr>

    <tr className="frecAco">               
    {props.frec_acu_te.map(item =>            
        <tr>{ item }</tr>   )}                  
    </tr>

    <tr className="frecCom">               
    {props.frec_com_te.map(item =>            
        <tr>{ item }</tr>   )}                  
    </tr>


    <tr className="limInHumeAxac">               
    {props.limi_infe_exa_te.map(item =>            
        <tr>{ item }</tr>   )}                  
    </tr>

    <tr className="limSuHumeAxac">               
    {props.limi_supe_exa_te.map(item =>            
        <tr>{ item }</tr>   )}                  
    </tr>

    </tbody>

</table> 

  );
}

export default TbTem;