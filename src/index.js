import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Card from './card';
import * as serviceWorker from './serviceWorker';


function Cards(props){
    let days = [{day:"Mon", weather:"snowy", low_temperature:10, high_temperature:15},
                {day:"Tue", weather:"sunny", low_temperature:8, high_temperature:12},
                {day:"Wed", weather:"sunny", low_temperature:11, high_temperature:15},
                {day:"Thu", weather:"lightning", low_temperature:14, high_temperature:19},
                {day:"Fri", weather:"cloudy", low_temperature:13, high_temperature:20}];    

    let week = days.map((d) =>
            <Card day={d.day} weather={d.weather} low_temperature={d.low_temperature} high_temperature={d.high_temperature}></Card>
    );
    
    return(
        <div className="cards">
            {week} 
        </div>
    );
}

ReactDOM.render(<Cards></Cards>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
