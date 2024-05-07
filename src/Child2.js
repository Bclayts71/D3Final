import React, { Component } from "react";
import * as d3 from "d3";

class Child2 extends Component {
    constructor(props) {
        super(props);
        this.state = {dropDownValue: 'A',};
    }
    componentDidUpdate() {
        var data = this.props.data2
        const dailyData = [{}];
        let count = 0;
        if(this.state.dropDownValue == 'A'){
            for (let i = 0; i < data.length; i++) {
                if(data[i]['category'] == 'A'){
                    dailyData[count] = {x:data[i]['x'], y:data[i]['y'], category:data[i]['category']};
                    count++;
                }
              }
        }
        
        else if(this.state.dropDownValue == 'B'){
            for (let i = 0; i < data.length; i++) {
                if(data[i]['category'] == 'B'){
                    dailyData[count] = {x:data[i]['x'], y:data[i]['y'], category:data[i]['category']};
                    count++;
                }
              }
        }
        else{
            for (let i = 0; i < data.length; i++) {
                if(data[i]['category'] == 'C'){
                    dailyData[count] = {x:data[i]['x'], y:data[i]['y'], category:data[i]['category']};
                    count++;
                }
              }
        }
        console.log("daily",dailyData)
        console.log(data)

        console.log(this.state.dropDownValue)
        var margin = { top: 10, right: 10, bottom: 30, left: 20 },
            w = 500 - margin.left - margin.right,
            h = 300 - margin.top - margin.bottom;

        var container = d3.select(".child2_svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .select(".g_2")
            .attr("transfom", `translate(${margin.left}, ${margin.top})`);

        var x_data = data.map(item => item.x)
        const x_scale = d3.scaleLinear().domain([0, d3.max(x_data)]).range([margin.left, w]);
        container.selectAll(".x_axis_g").data([0]).join('g').attr("class", 'x_axis_g')
            .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

        var y_data = data.map(item => item.y)
        const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);
        container.selectAll(".y_axis_g").data([0]).join('g').attr("class", 'x_axis_g')
            .attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(y_scale));
        container.selectAll("circle")
            .data(dailyData)
            .join("circle")
            .attr("cx", function (d) {
                return x_scale(d.x);
            })
            .attr("cy", function (d) {
                return y_scale(d.y);
            })
            .attr("r", 3)
            .style("fill", "#69b3a2")
            
    }



    render() {
        return (
            <div>
                <select onChange={(event) => this.setState({ dropDownValue: event.target.value })}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
                <svg className="child2_svg">
                    <g className="g_2"></g>
                </svg>
            </div>
        );
    }
}

export default Child2