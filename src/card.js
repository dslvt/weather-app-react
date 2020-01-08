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


class Card extends React.Component {
    constructor(props){
        super(props);
        this.state = {hovered:false}
        this.image_types = {'snowy':{bw_icon:snow_bw_icon, icon:snow_icon},
                            'cloudy':{bw_icon:cloudy_bw_icon,icon:cloudy_icon},
                            'sunny':{bw_icon:sun_bw_icon,icon:sun_icon},
                            'lightning':{bw_icon:lightning_bw_icon,icon:lightning_icon}}; 
    }


    render(){
        const day = this.image_types[this.props.weather];
        return (
            <div className="weather-card">
                <span className="day-name">{this.props.day}</span>
                <img className="day-img"
                        onMouseEnter={()=>{this.setState({hovered:true})}}
                        onMouseLeave={()=>{this.setState({hovered:false})}}
                        src={this.state.hovered?day.icon:day.bw_icon}>{}</img>
                <div className='low-high-temperature'>
                    <span className="temprerature">{this.props.low_temperature}°</span>
                    <span className="temprerature">{this.props.high_temperature}°</span>
                </div>
            </div>
        );
    }
} 

export default Card;