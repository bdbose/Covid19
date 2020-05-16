import React,{Component} from 'react';
import Countup from  'countup';
import './css/eff.css';
import data from './data/cou.json';
import ReactDOM from 'react-dom';
import icon from './media/icon.jpg';


class MainBody extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[], 
            confirmed: [],
            recoverd:[],
            death: [],
            key: "World",
            list:[],
            dis_data:[],
            pop_data:[],
            def_pop:"",
            cd:""
        }
    }
    componentDidMount(){
        this.fetchdata();
        this.list();
        this.pop();
        console.log(data);
        
    }

    //reset footer

    reset=()=>{
        document.getElementById('apili').innerText="APIs"
        document.getElementById("noteli").innerText="NOTE"
        document.getElementById("aboutli").innerText="ABOUT ME"
        document.getElementById('apili').style.backgroundColor="#30336b"
        document.getElementById("noteli").style.backgroundColor="#30336b"
        document.getElementById("aboutli").style.backgroundColor="#30336b"
    }

    //cancel footer function

    clk=(tag,txt)=>{
        if(document.getElementById(tag).innerText===txt){
            this.reset()
            document.getElementById('news-info').style.display='block'
            document.getElementById(tag).innerText="CLOSE X"
            document.getElementById(tag).style.backgroundColor="rgb(235, 77, 75)"
            
        }
        else{
            this.reset();
            document.getElementById('news-info').style.display='none'
            
        }
    }

    //footer api

    api=()=>{
        this.clk('apili','APIs')
        ReactDOM.render(
            <div id='show'>
                API Used : <a href="https://covid19.mathdro.id/api">
                https://covid19.mathdro.id/api
                </a>
            </div>
            ,document.getElementById('news-info'))
    }

    //footer note

    note=()=>{
        this.clk('noteli','NOTE')
        ReactDOM.render(
            <div id='show'>
                    <i>Diamond Princess and Ms Zaandam are two 
                    cruise ships.
                    <br/>Here Zulu timezone (Z) or (Coordinated Universal Time)UTC +0:00 is used .
                    <br/>Covid Density is the number of confirmed cases by population of the country. 
                    <br/>Population of some countries are of 2019.
                </i> 
            </div>
            ,document.getElementById('news-info'))
           
    }

    //footer aboutme

    aboutme=()=>{
        this.clk('aboutli','ABOUT ME')
        ReactDOM.render(
            <div id='show'>
                <div id='photo'>
                    <img src={icon} alt='icon'/>
                </div>
                <div id='myinfo'>
                    Developed by:
                    <p>
                        Bidipto Bose
                        <br/>Email: bidiptobose123@gmail.com
                        <br/>Github: <a href='https://github.com/bdbose'>https://github.com/bdbose</a>
                    </p>
                </div>
            </div>
            ,document.getElementById('news-info')
        )

    }

    //fetch the name of countries

    list=async()=>{
        await fetch('https://covid19.mathdro.id/api/countries')
        .then(res=>res.json())
        .then(data=>{
            this.setState({list: data.countries})
            })
    }

    //number counting animation
    //data animation

    num_amin(cm,r,d){
        var c= new Countup('confirm',0, parseInt(cm.value));
        var c1= new Countup('recovered',0, parseInt(r.value));
        var c2= new Countup('death',0, parseInt(d.value));
        var a=parseInt(cm.value)-parseInt(r.value)-parseInt(d.value);
        var c3=new Countup('active',0,a);
        c.start();
        c1.start();
        c2.start();
        c3.start();
        var table={
            'ror': (r.value*100/cm.value).toFixed(2),
            'coun': this.state.key,
            'rod': (d.value*100/cm.value).toFixed(2)
        }
        console.log(table);
        this.setState({dis_data:table})
        this.pop();
        document.getElementById('ror').style.width=`${this.state.dis_data.ror}%`
        document.getElementById('rod').style.width=`${this.state.dis_data.rod}%`
        var popd=(this.state.def_pop*100)/7800000000;
        console.log(popd);
        var cd=(cm.value*100)/this.state.def_pop
        this.setState({cd:cd.toFixed(2)})
        document.getElementById('cd').style.width=`${cd*10}%`
        document.getElementById('pop').style.width=`${popd}%`
    }

    //default data call using api

    fetchdata=async ()=>{
        await fetch('https://covid19.mathdro.id/api')
        .then(res=>res.json())
        .then(apidata =>{
            this.setState({data: apidata});
            this.num_amin(apidata.confirmed,apidata.recovered,apidata.deaths);
        })
    }

    //getting the population of countries

    pop=()=>{
        var t=data.filter(i=>{return i.name===this.state.key})
        this.setState({def_pop: t[0].population})
        console.log(this.state.def_pop);
    }

    //getting data of countries
    //error display 

    country=async ()=>{
        if(this.state.key==='World'){
            this.fetchdata();
        }
        else
        {
            if(this.state.key==='Diamond Princess' || this.state.key==='MS Zaandam'){
                if(document.getElementById('alert').style.display==='none'){
                    document.getElementById('alert').style.display='block';
                }
                document.getElementById('alert').innerText='This is a Cruise Ship';
                setTimeout(()=>{document.getElementById('alert').style.display='none'},3000);        
            }
        await fetch(`https://covid19.mathdro.id/api/countries/${this.state.key}`)
        .then(res=> res.json())
        .then(apidata =>{
            this.setState({data: apidata})
            this.num_amin(apidata.confirmed,apidata.recovered,apidata.deaths);    
        })
        .catch(err=>{
            console.log(err);
            if(document.getElementById('alert').style.display==='none'){
                document.getElementById('alert').style.display='block';
            }
            document.getElementById('alert').innerText='Data Not Found';
            document.getElementById('ror').style.width=0;
            document.getElementById('rod').style.width=0;
            var er={
                'ror': 0,
                'coun': this.state.key,
                'rod': 0
            }
            this.setState({def_pop: 0})
            this.setState({cd:0})
            document.getElementById('pop').style.width=0
            document.getElementById('cd').style.width=0
            this.setState({dis_data:er});
            setTimeout(()=>{document.getElementById('alert').style.display='none'},3000);
        })
        }
    }

    //darkmode

    darkmode=()=>{
        if(document.body.style.backgroundColor!=='rgb(19, 15, 64)'){
            document.getElementById('darkmode').innerText="LIGHT-MODE"
            document.body.style.backgroundColor='rgb(19, 15, 64)'
            document.getElementById('title').style.color='white'
            document.getElementById('update').style.color='white'
            document.getElementById('select-cover').style.backgroundColor='rgb(48, 51, 107)'
            document.querySelector('select').style.backgroundColor='rgb(48, 51, 107)'
            document.querySelector('select').style.color='white'
            document.querySelector('button').style.backgroundColor='rgb(48, 51, 107)'
            document.querySelector('button').style.color='white'
            document.getElementById('reset').style.backgroundColor='rgb(48, 51, 107)'
            document.getElementById('reset').style.color='white'
        }
        else{
            
            document.getElementById('darkmode').innerText="DARK-MODE"
            document.body.style.backgroundColor='rgb(248,248,255)'
            document.getElementById('title').style.color='black'
            document.getElementById('update').style.color='black'
            document.getElementById('select-cover').style.backgroundColor='rgb(248,248,255)'
            document.querySelector('select').style.backgroundColor='rgb(248,248,255)'
            document.querySelector('select').style.color='black'
            document.querySelector('button').style.backgroundColor='rgb(248,248,255)'
            document.querySelector('button').style.color='black'
            document.getElementById('reset').style.backgroundColor='rgb(248,248,255)'
            document.getElementById('reset').style.color='black'
        }
    }
    render(){
        return(
        <div className='home-body'>  
        <div className='title'  id='title'>
            COVID-19
            <span>Data Visualizer</span>
        </div>
            <div className='info'>
                <div className='confirm'>Confirmed: <span id='confirm'>0</span></div>
                <div className='recover'>Recoverd:  <span id='recovered'>0</span></div>
                <div className='active'>Active:<span id='active'>0</span></div>
                <div className='death'>Death:  <span id='death'>0</span></div>
            </div>
            <div className='select-cover' id="select-cover">
        <select value={this.state.key} onChange={e=>this.setState({key: e.target.value})}>
            <option key='world'>World</option>
            {this.state.list.map(item=>{
                return(
                    <option key={item.name}>
                        {item.name}
                    </option>
                )
            })}
        </select>
        </div>
        <div className="alert" id='alert'></div>
        <div className='button'>
            <button onClick={()=>{this.country();}}>Search</button>
            <button id='reset' onClick={()=>{
                this.fetchdata();
                this.setState({key:"World"})
            }}>Reset</button>
        </div>
        <div className='up-time' id='update'>Updated: {this.state.data.lastUpdate}</div>
        <div className='map' id='basic'>
            <ul>
                <li><span id='item'>Country:</span><span id="value">{this.state.dis_data.coun}</span></li>
                <li><span id='item'>Recovery:</span><span id="value">{this.state.dis_data.ror}%</span><div className='ani' id='ror'></div></li>
                <li><span id='item'>Death Rate:</span><span id="value">{this.state.dis_data.rod}%</span><div className='ani' id='rod'></div></li>
                <li><span id='item'>Population:</span><span id="value">{this.state.def_pop}</span><div className='ani' id='pop'></div></li>
                <li><span id='item'>Covid Density:</span><span id="value">{this.state.cd}%</span><div className='ani' id='cd'></div></li>
            </ul>
        </div>  
        <footer>
            <div className='news' id='news-info'></div>
            <div className="about">
                <ul>
                    <li id='darkmode' onClick={this.darkmode}>DARK-MODE</li>
                    <li id='apili' onClick={this.api}>APIs</li>
                    <li id='noteli' onClick={this.note}>NOTE</li>
                    <li id='aboutli' onClick={this.aboutme}>ABOUT ME</li>
                </ul>
            </div>
            <div className='copyright'>Copyright © 2020 by Bidipto Bose</div>
        </footer>    
        </div>
        )}
}

export default MainBody;