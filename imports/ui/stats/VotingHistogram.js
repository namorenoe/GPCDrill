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
                    if (d.votingSite == "Universidad de los Andes") displayData["" + hour].UNIANDES += 1
                    else if (d.votingSite == "Universidad Javeriana") displayData["" + hour].JAVERIANA += 1
                    else if (d.votingSite == "FRANCO") displayData["" + hour].FRANCO += 1
                    else if (d.votingSite == "CP") displayData["" + hour].CP += 1
                    else if (d.votingSite == "SD") displayData["" + hour].SD += 1
                } else {
                    displayData["" + hour] = {
                        HORA: hour,
                        TOTAL: 1,
                        UNIANDES: d.votingSite == "Universidad de los Andes" ? 1 : 0,
                        JAVERIANA: d.votingSite == "Universidad Javeriana" ? 1 : 0,
                        FRANCO: d.votingSite == "FRANCO" ? 1 : 0,
                        CP: d.votingSite == "CP" ? 1 : 0,
                        SD: d.votingSite == "SD" ? 1 : 0,
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
                    <Line type="monotone" dataKey="Universidad de los Andes" stroke="red" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="Universidad Javeriana" stroke="orange" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="FRANCO" stroke="blue" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="CP" stroke="green" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="SD" stroke="black" activeDot={{r: 8}}/>
                </LineChart>
            </div>
        );
    }
}

Stats.propTypes = {
    data: PropTypes.array.isRequired
};