import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }


  
  componentDidUpdate() {
    
    var data = this.props.data1;
    console.log(data);
    let countA = 0;
    let countB = 0;
    let countC = 0;
    for (let i = 0; i < data.length; i++) {
        if(data[i]['category'] == 'A'){
            countA++;
        }
        else if(data[i]['category'] == 'B'){
            countB++;
        }
        else{
            countC++;
        }
      }
      console.log(countA,countB,countC)
      const data2 = [
        {x:'A', y:countA},
        {x:'B', y:countB},
        {x:'C', y:countC}
      ];
      console.log(data2)

      const margin = { top: 30, right: 30, bottom: 30, left: 30 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;
  
      const x = d3.scaleBand()
        .domain(data2.map(d => d.x))
        .range([margin.left, width - margin.right])
        .padding(0.1);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(data2, d => d.y)])
        .range([height - margin.bottom, margin.top]);
  
      const svg = d3.select('.chart');
      svg.selectAll('.bar').remove();
      svg.selectAll('g').remove();
      svg.selectAll('.bar-label').remove();
      svg.selectAll('text').remove();
      svg.selectAll('.x-axis').selectAll('*').remove();
      svg.selectAll('.y-axis').selectAll('*').remove();
      svg.selectAll('.bar')
      .data(data2)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.x))
      .attr('y', d => y(d.y))
      .attr('width', x.bandwidth())
      .attr('height', d => height - margin.bottom - y(d.y))
      .attr('fill', 'lightgrey');
    
    svg.selectAll('.bar-label')
      .data(data2)
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', d => x(d.x) + x.bandwidth() / 2)
      .attr('y', d => y(d.y) + 20)
      .attr('text-anchor', 'middle')
      .style('fill', 'black')
      .text(d => d.y.toFixed(2));
    
      svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x));
        
      const yAxis = d3.axisLeft(y).ticks(5);
  
      svg.append('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y))
        .call(yAxis);
        svg.append('text')
        .attr('class', 'x-axis-title')
        .attr('x', width / 2)
        .attr('y', height - margin.bottom + 35)
        .attr('text-anchor', 'middle')
        .text("categories");
  
      svg.selectAll('.x-axis .domain')
        .remove();
      svg.selectAll('.y-axis .domain')
        .remove();
  
    }
  
  render() {
    return(
        <svg className="chart" width="600" height="400">
        </svg>
    );
  }
  
}
export default Child1