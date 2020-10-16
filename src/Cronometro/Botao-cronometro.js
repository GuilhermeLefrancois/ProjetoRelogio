import React from 'react';
import '../App.css';

const Botao = (props) => 
(
    <button class="btn btn-dark" id="btn-crono" style={{marginRight: 35 + 'px', marginTop: 20 + 'px'}} onClick={props.onClick}>{props.label}</button>
)
export default Botao;