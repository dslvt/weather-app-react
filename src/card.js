import React, {Component} from 'react';
import './card.css';
import lightning_bw_icon from './img/lightning-bw.svg';
import lightning_icon from './img/lightning.svg';
import sun_bw_icon from './img/sun-bw.svg';
import sun_icon from './img/sun.svg';
import cloudy_bw_icon from './img/cloudy-bw.svg';
import cloudy_icon from './img/cloudy.svg';
import snow_icon from './img/snow.svg';
import snow_bw_icon from './img/snow-bw.svg';
import rain_icon from './img/rain.svg';
import rain_bw_icon from './img/rain-bw.svg';


class Card extends React.Component {
    constructor(props){
        super(props);
        this.state = {hovered:false}
        this.image_types = {'Snow':{bw_icon:snow_bw_icon, icon:snow_icon},
                            'Clouds':{bw_icon:cloudy_bw_icon,icon:cloudy_icon},
                            'Rain': {bw_icon: rain_bw_icon, icon:rain_icon},
                            'Sunny':{bw_icon:sun_bw_icon,icon:sun_icon},
                            'lightning':{bw_icon:lightning_bw_icon,icon:lightning_icon}}; 
    }


    render(){
        let day = this.image_types[this.props.weather];
        if(day == undefined){
            day = this.image_types['Sunny'];
        }
        return (
            <div className={this.state.hovered?"weather-card hovered-card":"weather-card"}
                    onMouseEnter={()=>{this.setState({hovered:true})}}
                    onMouseLeave={()=>{this.setState({hovered:false})}}>
                <p className="day-name">{this.props.day}</p>
                <img className="day-img"
                        src={this.state.hovered?day.icon:day.bw_icon}>{}</img>
                <p className="temperature">{this.props.low_temperature}° {this.props.high_temperature}°</p>
            </div>
        );
    }
} 


export default Card;