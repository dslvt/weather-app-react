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

const city_link = "https://api.openweathermap.org/data/2.5/forecast?id=465543&APPID=04d61ef19932cd9a18fc9ae6e026f150";

class Cards extends React.Component{
    constructor(props){
        super(props);
        this.state = {days : []};    
        
        fetch(city_link)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                let ndays = [];
                console.log(res);
                for(let i = 0; i < 5; i++){
                    let item = res.list[i*8];
                    let date = new Date(item['dt']*1000);
                    let low = 1000, high = -1000;
                    for (let j = 0; j < 8; j++){
                        low = Math.min(res.list[i*8+j]['main']['temp_min'], low);
                        high = Math.max(res.list[i*8+j]['main']['temp_max'], high);
                    }
                    ndays.push({day: date.toString().slice(0, 3), weather: item['weather'][0]['main'], 
                        low_temperature: Math.round(low-273.15), 
                        high_temperature: Math.round(high-273.15)});
                }

                this.setState({days: ndays});
                });
    }

    render(){
        
         this.week = this.state.days.map((d) =>
            <Link to={'/weather-app-react/'+d.day} className="nolink">
                <Card day={d.day} weather={d.weather} low_temperature={d.low_temperature} high_temperature={d.high_temperature} key={d.day}
                    onClick={event => window.location.href="/"+d.day}></Card>
            </Link>
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
                    <Route path="/weather-app-react/:id" children={<SwitchRouter />}>
                    </Route>
                    <Route path="/weather-app-react/">
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
