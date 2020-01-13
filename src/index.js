import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Card from './card';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router, 
    Switch,
    Route, 
    Link, 
    useParams
} from "react-router-dom";
import HourlyCard from './HourlyCard';

const city_link = "http://api.openweathermap.org/data/2.5/forecast?id=465543&APPID=04d61ef19932cd9a18fc9ae6e026f150";

class Cards extends React.Component{
    constructor(props){
        super(props);
        this.state = {days : [{day:"Mon", weather:"Snow", low_temperature:10, high_temperature:15},
                    {day:"Tue", weather:"Clouds", low_temperature:8, high_temperature:12},
                    {day:"Wed", weather:"sunny", low_temperature:11, high_temperature:15},
                    {day:"Thu", weather:"lightning", low_temperature:14, high_temperature:19},
                    {day:"Fri", weather:"Clouds", low_temperature:13, high_temperature:20}]};    
        
        fetch(city_link)
            .then(res => res.json())
            .then(res => {
                let ndays = [];
                // let dates = res.list.map(date => new Date(date['dt']*1000));
                for(let i = 0; i < 5; i++){
                    let item = res.list[i*8];
                    let date = new Date(item['dt']*1000);
                    ndays.push({day: date.toString().slice(0, 3), weather: item['weather'][0]['main'], 
                        low_temperature: Math.round(item['main']['temp_min']-273.15), high_temperature: Math.round(res.list[i*8+5]['main']['temp_max']-273.15)});
                }

                this.setState({days: ndays});
                console.log(res);
                this.state={days:ndays};
                });
    }

    render(){
        
         this.week = this.state.days.map((d) =>
            <Card day={d.day} weather={d.weather} low_temperature={d.low_temperature} high_temperature={d.high_temperature} key={d.day}
                onClick={event => window.location.href="/"+d.day}></Card>

        );
        return(
            <div className="cards">
                {this.week} 
            </div>
        );
    }
}

class App extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Router>
                <Switch>
                    <Route path="/:id" children={<SwitchRouter />}>
                    </Route>
                    <Route path="">
                        <Cards></Cards>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

function SwitchRouter(){
    let {id} = useParams();
    return(
        <HourlyCard id={id}></HourlyCard> 
    );
}

ReactDOM.render(<App></App>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
