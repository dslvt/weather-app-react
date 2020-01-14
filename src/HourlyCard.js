import React from 'react';
import './HourlyCard.css';
import { Group } from '@vx/group';
import { GlyphDot } from '@vx/glyph';
import { LinePath } from '@vx/shape';
import { genDateValue } from '@vx/mock-data';
import { scaleTime, scaleLinear } from '@vx/scale';
import { curveMonotoneX, curveBasis } from '@vx/curve';


const city_link = "http://api.openweathermap.org/data/2.5/forecast?id=465543&APPID=04d61ef19932cd9a18fc9ae6e026f150";

class HourlyCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {temp: [], dt: []};
        fetch(city_link)
            .then(res => res.json())
            .then(res => {
                let temperature = [];
                let dt = [];
                for(let i=0; i<res.list.length; i++){
                    let date = new Date(res.list[i]['dt']*1000);
                    if(date.toString().slice(0, 3) == this.props.id){
                        temperature.push(Math.round(res.list[i]['main']['temp'] - 273.15));
                        dt.push(date);
                        console.log(temperature);
                    }
                }
                this.setState({temp: temperature, dt: dt});
            });
    }

    render(){
        
        let a = this.state.temp.map(t => (
            <a>{t}</a>
        ));

        const bdata = this.state.dt.reverse();
        const adata = this.state.temp.reverse();
        let data = [];
        for (let i =0; i<adata.length; i++){
            data.push({date: bdata[i], value: adata[i]});
        }

        console.log('data ' + data.toString());
        // accessors
        const date = d => d.date;
        const value = d => d.value;

        // scales
        const xScale = scaleTime({
        domain: [Math.min(...data.map(date)), Math.max(...data.map(date))]
        });
        const yScale = scaleLinear({
        domain: [Math.min(...data.map(value)), Math.max(...data.map(value))]
        });

        // positions
        const x = d => xScale(date(d));
        const y = d => yScale(value(d));

        // colors
        const primary = '#8921e0';
        const secondary = '#00f2ff';
        const contrast = '#ffffff';
        let width = 512;
        let height = 512; 
        let margin = 10;
        const xMax = height-margin*2;
        const yMax = xMax;

        // update scale range to match bounds
        xScale.range([0, xMax]);
        yScale.range([yMax, 0]);
        ;
        return(
            <div className="graph-area">
                <svg width={width} height={height}>
                    <rect x={0} y={0} width={width} height={height} fill={secondary} rx={14} />
                    <Group top={margin.top}>
                        <LinePath
                        data={data}
                        x={x}
                        y={y}
                        stroke={primary}
                        strokeWidth={2}
                        strokeDasharray="2,2"
                        curve={curveBasis}
                        />
                        <LinePath
                        data={data}
                        x={x}
                        y={y}
                        stroke={primary}
                        strokeWidth={3}
                        curve={curveMonotoneX}
                        />
                        {data.map((d, i) => {
                        const cx = x(d);
                        const cy = y(d);
                        return (
                            <g key={`line-point-${i}`}>
                            <GlyphDot cx={cx} cy={cy} r={6} fill={contrast} stroke={secondary} strokeWidth={10} />
                            <GlyphDot cx={cx} cy={cy} r={6} fill={secondary} stroke={primary} strokeWidth={3} />
                            <GlyphDot cx={cx} cy={cy} r={4} fill={contrast} />
                            </g>
                        );
                        })}
                    </Group>
                </svg>
 
            
          </div>
        );
    }
}

export default HourlyCard;