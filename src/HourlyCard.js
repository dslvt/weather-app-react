import React from 'react';
import { Bar } from '@vx/shape';
import './HourlyCard.css';

class HourlyCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <p>{this.props.id}</p>
        );
    }
}

export default HourlyCard;