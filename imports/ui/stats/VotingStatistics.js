import React, {Component} from "react";
import {scaleBand, scaleLinear} from 'd3-scale';
import Axes from "./Axes.js";
import Bars from "./Bars.js";

import "./VotingStatistics.css";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.xScale = scaleBand();
        this.yScale = scaleLinear();
    }

    render() {
        const margins = {top: 50, right: 20, bottom: 100, left: 60};
        const svgDimensions = {width: 400, height: 400};

        let rawData = this.props.data;
        let data = [
            {
                puesto: "ML",
                cuenta: 0
            },
            {
                puesto: "W",
                cuenta: 0
            },
            {
                puesto: "FRANCO",
                cuenta: 0
            },
            {
                puesto: "CP",
                cuenta: 0
            },
            {
                puesto: "SD",
                cuenta: 0
            }
        ];
        rawData.forEach((rd) => {
            data.forEach((pv) => {
                if (pv.puesto === rd.votingSite) pv.cuenta++;
            });
        });

        console.log(data);

        let maxValue = 0;
        data.forEach((d) => {
            if (d.cuenta > maxValue) maxValue = d.cuenta;
        });

        console.log(maxValue);
        maxValue += 1;

        // scaleBand type
        const xScale = this.xScale
            .padding(0.5)
            // scaleBand domain should be an array of specific values
            // in our case, we want to use movie titles
            .domain(data.map(d => d.puesto))
            .range([margins.left, svgDimensions.width - margins.right])

        // scaleLinear type
        const yScale = this.yScale
        // scaleLinear domain required at least two values, min and max
            .domain([0, maxValue])
            .range([svgDimensions.height - margins.bottom, margins.top])

        return (
            <div className="col-6">
                <svg width={svgDimensions.width} height={svgDimensions.height}>
                    <Axes
                        scales={{xScale, yScale}}
                        margins={margins}
                        svgDimensions={svgDimensions}
                    />
                    <Bars
                        scales={{xScale, yScale}}
                        margins={margins}
                        data={data}
                        maxValue={maxValue}
                        svgDimensions={svgDimensions}
                    />
                </svg>
            </div>
        )
    }
}