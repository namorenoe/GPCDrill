import React, {Component} from 'react';
import PropTypes from "prop-types";
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid} from 'recharts';

/**Component that contains the chart*/
export default class Stats extends Component {
    render() {
        let data = [];
        let displayData = {};
        if (this.props.data) {
            this.props.data.forEach((d) => {
                let hour = (new Date(d.date)).getHours();
                if (displayData["" + hour]) {
                    displayData["" + hour].TOTAL += 1
                    if (d.votingSite == "Presencial (U.Externado)") displayData["" + hour].UNIANDES += 1
                    else if (d.votingSite == "Remoto") displayData["" + hour].JAVERIANA += 1
                    
                    
                } else {
                    displayData["" + hour] = {
                        HORA: hour,
                        TOTAL: 1,
                        PRESENCIAL: d.votingSite == "Presencial (U.Externado)" ? 1 : 0,
                        REMOTO: d.votingSite == "Remoto" ? 1 : 0,
 
                    };
                }
            });
            for(var key in displayData) {
                data.push(displayData[key]);
            } 
        }
        console.log(displayData);
        return (
            <div className="col-6">
                <LineChart width={500} height={500} data={data}
                           margin={{top: 10, right: 15, left: 15, bottom: 5}}>
                    <XAxis dataKey="HORA"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="TOTAL" stroke="magenta" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="PRESENCIAL" stroke="red" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="REMOTO" stroke="orange" activeDot={{r: 8}}/>
                </LineChart>
            </div>
        );
    }
}

Stats.propTypes = {
    data: PropTypes.array.isRequired
};