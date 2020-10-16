import React, { Profiler } from 'react';
import '../App.css';

const ContadorT = (props) => 
(
    <h1 id="contador-crono" style={{textAlign: "center"}}>{props.horas}:{props.minutos}:{props.segundos}</h1>
)
export default ContadorT;