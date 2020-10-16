import React, { createElement } from 'react';
import Botao from './Cronometro/Botao-cronometro';
import BotaoR from './Relogio/Botao-relogio';
import LabelCronometro from './Cronometro/Label-cronometro';
import LabelParcial from './Cronometro/Label-parcial';
import Contador from './Cronometro/Contador-cronometro';
import BotaoT from './Temporizador/Botao-temporizador';
import ContadorT from './Temporizador/Contador-temporizador';
import LabelT from './Temporizador/Label-temporizador';
import './App.css';

var volta = 0;
var cont = 0;
var id = 0;
class App extends React.Component 
{
    constructor(props)
    {
      super(props);
      this.state=
      {
        segundos: 0,
        minutos: 0,
        horas: 0,
        stop: true,
        nameStop: "Start",
        name: "CRONÔMETRO",
        parcial: "",
        segundosT: 0,
        minutosT: 0,
        horasT: 0,
        nameStopT: "Start",
        nameT: "TEMPORIZADOR"
      };
    };

    zerarCronometro() 
    {
      this.state.segundos = -1;      
      this.state.minutos = 0;
      this.state.horas = 0;
      this.state.parcial = "";
      volta = 0;      
    };
    
    parcial()
    {
      volta += 1;
      const p = volta+"° volta - "+this.state.horas+" : " +this.state.minutos+ " : " +this.state.segundos+"\n";
      this.state.parcial += p //({parcial: this.state.parcial + p})
      alert(this.state.parcial)
    };

    pararTempoCrono()
    {
      this.setState({ 
          stop: !this.state.stop 
        })
      if (this.state.stop)
        this.state.nameStop = "Stop"
      else
        this.state.nameStop = "Start"
    };

    incrementar () 
    {
      if (this.state.stop === false)
      {
        this.setState
        (
          function (state, props) 
          {
            if (state.segundos == 59)
            {
              this.zerarSegundos();
              this.incrementarMinuto(state);
            }
            this.trocaLabelCrono();  
            return({ segundos: state.segundos +1})
          })
      }
    };
    
    incrementarMinuto (state)
    {
      this.setState 
      (
        function (state, props) 
        {
          if (state.minutos == 59)
          {
            this.zerarMinutos();
            this.incrementarHoras(state);
          }  
          return{ minutos: state.minutos + 0.5}
      })
    };

    incrementarHoras (state) 
    {
      this.setState(() => 
      { 
        return {horas: state.horas +1}
      })
    };
    
    zerarSegundos () 
    {
      this.setState({ segundos: 0 })
    };

    zerarMinutos () 
    {
      this.setState({ minutos: 0 })
    };

    trocaLabelCrono()
    {
      if(this.state.name.trim() == "CRONÔMETRO")
        this.setState({name: "DO"})
      else if(this.state.name.trim() == "DO")
        this.setState({name: "FUTURO"})
      else if(this.state.name.trim() == "FUTURO")
        this.setState({name: "CRONÔMETRO"})
    }

    trocaLabelTemp()
    {
      if(this.state.nameT.trim() == "TEMPORIZADOR")
        this.setState({nameT: "DO"})
      else if(this.state.nameT.trim() == "DO")
        this.setState({nameT: "PASSADO"})
      else if(this.state.nameT.trim() == "PASSADO")
        this.setState({nameT: "TEMPORIZADOR"})
    }

    componentDidMount()
    {
      this.timer = setInterval(() => this.incrementar(), 1000)
      this.timer = setInterval(() => this.decrementar(), 1000)
      this.timer = setInterval(() => this.AtualizaHoras(), 1000)
    };
 
    AtualizaHoras()
    {
      var moment = require('moment-timezone')
      cont = 0
      var listaHoras = document.getElementsByClassName("p-horas")
      for(var c = 0; c < listaHoras.length; c++)
      {
        //console.log(moment().tz(document.getElementById("cidade"+c).innerText).format('DD/MM/YYYY HH:mm:ss').toString())
        listaHoras[c].innerText =  moment().tz(document.getElementById("cidade"+c).innerText).format('DD/MM/YYYY HH:mm:ss').toString()
      }
    }

    separaHora(valor)
    {
      cont = 0
      var lista = []
      while(valor != "" && valor != null)
      {
         if(valor.indexOf(":") != -1)
         {
            if(cont == 0)
            {
               lista[0] = valor.substring(0, valor.indexOf(":"))
            }
            else
            {
              lista[1] = valor.substring(0, valor.indexOf(":"))
            }
            valor = valor.replace(valor.substring(0, valor.indexOf(":")+1), "");
         }  
         else
         {
          lista[2] = valor
         }
      }
      return lista
    }

    adicionarHora()
    {
      const cidade = prompt("Digite Country/City: ")
      if(cidade != "" && cidade != null)
      {
        var moment = require('moment-timezone')
        let localTime = moment( ).tz(cidade).format('DD/MM/YYYY HH:mm:ss').toString()
        const div = document.createElement('div')
        var value = ` <div id="div-relogio">
                        <p id="cidade`+id+`"style="margin: 2px;">${cidade}</p>
                        <p class="p-horas">${localTime}</p>
                      </div>`
        div.innerHTML = value
        document.getElementById('divRelogio').appendChild(div)
        id+=1;
      }
    }
    
    decrementaHora()
    {
        if(this.state.horasT > 0)
        {
          this.setState({horasT: this.state.horasT - 1})
          this.setState({minutosT: 60})
        }
        else
        {
          this.zerarTemporizador()
          alert("FIM!")
          this.setState({nameStopT: "Start"})
        }
    }

    decrementaMinuto()
    {
        if(this.state.minutosT > 0)
        {
          this.setState({minutosT: this.state.minutosT - 1})
          this.setState({segundosT: 59})
        }
        else
        {
          this.decrementaHora()
        }
    }

    decrementar()
    {
      if (this.state.nameStopT == "Stop")
      {
        this.setState
        (
          function (state, props) 
          {
            if(this.state.segundosT == 0)
            {
               this.decrementaMinuto()
            }
            else
            {
              this.trocaLabelTemp()
              return({ segundosT: state.segundosT - 1})
            }
            
          })
      }
    }

    zerarTemporizador()
    {
      this.state.segundosT = 0;      
      this.state.minutosT = 0;
      this.state.horasT = 0;
    }

    pararTempoTemp()
    {
      if (this.state.nameStopT == "Start")
        this.setState({nameStopT:"Stop"})
      else
        this.setState({nameStopT:"Start"})
    }

    iniciar()
    {
      cont = 0
      var valor = prompt("Digite o valor inicial do Temporizador -HH:MM:SS-")
      while(valor != "" && valor != null)
      {
        if(valor.indexOf(":") != -1)
        {
          if(cont == 0)
            this.setState({horasT: valor.substring(0, valor.indexOf(":"))});
          else
            this.setState({minutosT: valor.substring(0, valor.indexOf(":"))});
          valor = valor.replace(valor.substring(0, valor.indexOf(":")+1), "");
        }
        else
        {
          this.setState({segundosT: valor});
        }

        cont+=1;
        if(cont==3)
          break;
      }
    }

    render()
    {
        return (
        <div>
          <div id="painelCronometro">
            <div id="">
              <LabelCronometro name={this.state.name} />
              <Contador horas={this.state.horas} minutos={this.state.minutos} segundos={this.state.segundos} />
              <Botao onClick={() => this.zerarCronometro()} label={"Zerar"} />
              <Botao onClick={() => this.pararTempoCrono()} label={this.state.nameStop} />
              <Botao onClick={() => this.parcial()} label={"Parcial"} />
              <LabelParcial parcial={this.state.parcial}/>
            </div>
          </div>

          <div id="divRelogio">
            <BotaoR onClick={() => this.adicionarHora()} label={"Adicionar um horário"} />
          </div>

          <div id="divTemporizador">
            <div id="painelTemporizador">
              <LabelT name={this.state.nameT} />
              <ContadorT horas={this.state.horasT} minutos={this.state.minutosT} segundos={this.state.segundosT} />
              <BotaoT onClick={() => this.zerarTemporizador()} label={"Zerar"} />
              <BotaoT onClick={() => this.pararTempoTemp()} label={this.state.nameStopT} />
              <BotaoT onClick={() => this.iniciar()} label={"Iniciar"} />
            </div>
          </div>
        </div>
        );  
    };
}
export default App;