import React from 'react';
import '../App.css';

const BotaoR = (props) => 
(
    <button class="btn btn-dark" id="btn-relogio" onClick={props.onClick}>{props.label}</button>
)
export default BotaoR;