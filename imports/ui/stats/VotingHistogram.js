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
                    else if (d.votingSite == "Universidad Jorge Tadeo Lozano") displayData["" + hour].TADEO += 1
                    else if (d.votingSite == "Universidad Pedagógica Nacional") displayData["" + hour].UPN += 1
                    else if (d.votingSite == "Universidad Santo Tomás") displayData["" + hour].UST += 1
                    else if (d.votingSite == "Universidad del Rosario") displayData["" + hour].UR += 1
                    else if (d.votingSite == "Universidad Antonio Nariño") displayData["" + hour].UAN += 1
                    else if (d.votingSite == "Universidad EAN") displayData["" + hour].EAN += 1
                    else if (d.votingSite == "Universidad Externado") displayData["" + hour].EXTERNADO += 1
                    else if (d.votingSite == "Universidad Nacional") displayData["" + hour].UNAL += 1
                    else if (d.votingSite == "Politécnico Grancolombiano") displayData["" + hour].POLI += 1
                    else if (d.votingSite == "Universidad de la Salle") displayData["" + hour].SALLE += 1
                    else if (d.votingSite == "Universidad de La Sabana") displayData["" + hour].SABANA += 1
                    else if (d.votingSite == "Konrad Lorenz") displayData["" + hour].KL += 1
                } else {
                    displayData["" + hour] = {
                        HORA: hour,
                        TOTAL: 1,
                        UNIANDES: d.votingSite == "Universidad de los Andes" ? 1 : 0,
                        JAVERIANA: d.votingSite == "Universidad Javeriana" ? 1 : 0,
                        TADEO: d.votingSite == "Universidad Jorge Tadeo Lozano" ? 1 : 0,
                        UPN: d.votingSite == "Universidad Pedagógica Nacional" ? 1 : 0,
                        UST: d.votingSite == "Universidad Santo Tomás" ? 1 : 0,
                        UR: d.votingSite == "Universidad del Rosario" ? 1 : 0,
                        UAN: d.votingSite == "Universidad Antonio Nariño" ? 1 : 0,
                        EAN: d.votingSite == "Universidad EAN" ? 1 : 0,
                        EXTERNADO: d.votingSite == "Universidad Externado" ? 1 : 0,
                        UNAL: d.votingSite == "Universidad Nacional" ? 1 : 0,
                        POLI: d.votingSite == "Politécnico Grancolombiano" ? 1 : 0,
                        SALLE: d.votingSite == "Universidad de la Salle" ? 1 : 0,
                        SABANA: d.votingSite == "Universidad de La Sabana" ? 1 : 0,
                        KL: d.votingSite == "Konrad Lorenz" ? 1 : 0,
 
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
                    <Line type="monotone" dataKey="UNIANDES" stroke="red" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="JAVERIANA" stroke="orange" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="TADEO" stroke="blue" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="UPN" stroke="green" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="UST" stroke="black" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="UR" stroke="black" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="UAN" stroke="black" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="EAN" stroke="black" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="EXTERNADO" stroke="black" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="UNAL" stroke="black" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="POLI" stroke="black" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="SALLE" stroke="black" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="SABANA" stroke="black" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="KL" stroke="black" activeDot={{r: 8}}/>
                </LineChart>
            </div>
        );
    }
}

Stats.propTypes = {
    data: PropTypes.array.isRequired
};