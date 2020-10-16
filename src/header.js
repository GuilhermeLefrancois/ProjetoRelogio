import React from 'react';
import './App.css';

const Header = (props) => 
(
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <img style={{height: 75 +"px", width: 100 +"px", marginRight: 30+"px"}} src="/logo512.png"></img>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li style={{marginRight: 15+"px"}} class="nav-item active">
                        <a class="nav-link" href="/index.html">Cronômetro<span class="sr-only">(current)</span></a>
                    </li>
                            
                    <li style={{marginRight: 15+"px"}} class="nav-item active">
                        <a class="nav-link" href="/relogio.html">Relógio<span class="sr-only">(current)</span></a>
                    </li>

                    <li style={{marginRight: 15+"px"}} class="nav-item active">
                        <a class="nav-link" href="/temporizador.html">Temporizador<span class="sr-only">(current)</span></a>                        
                    </li>
                </ul>
            </div>
        </nav>
    </header>       
)
export default Header;






