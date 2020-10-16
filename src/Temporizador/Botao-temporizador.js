import React from 'react';
import '../App.css';

const BotaoT = (props) => 
(
    <button class="btn btn-dark" id="btn-temp" style={{marginRight: 35 + 'px', marginTop: 20 + 'px'}} onClick={props.onClick}>{props.label}</button>
)
export default BotaoT;