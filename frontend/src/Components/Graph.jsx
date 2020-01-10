import React, { Component } from "react";
import Axios from "axios";
const d3 = require("d3")

class Graph extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    Axios.get(`api/week/${this.props.symbol}`)
    .then(res => {
      let result = res.data
      this.setState({sevenDayData : result})
    })
    .then(() => {

      const width = 700,
            height = 500;

      const minMaxDates = (sevenDayData) => {
        return [
          Date.parse(sevenDayData.closePrices[6].date),
          Date.parse(sevenDayData.closePrices[0].date)
        ]
      }
      const minMaxPrice = (sevenDayData) => {
        let prices = sevenDayData.closePrices.map((dayObject) => {
          return dayObject.closePrice
        })
        return [Math.min(...prices), Math.max(...prices)]
      }

      const chart = d3
        .select(this.chartRef)
        .attr("width", width + 100)
        .attr("height", height + 100)
        .append("g")
        .attr("transform", "translate(100, 0)");

      const x = d3
        .scaleTime()
        .domain(minMaxDates(this.state.sevenDayData))
        .range([0, width - 20]);

      const y = d3
        .scaleLinear()
        .domain([0, minMaxPrice(this.state.sevenDayData)[1]]) //max value
        .range([height, 20]);

      const graph = chart
        .selectAll(".graph")
        .data(this.state.sevenDayData)
        .enter()
        .append("g")
        .attr("class", "graph");

      graph
        .append("path")
        .attr("class", "line")
        .attr("d", parentData => {
          return d3
            .line()
            .curve(d3.curveBasis) // make points round, not sharp
            .x(d => x(d.date))
            .y(d => y(d.value))(parentData.values);
        });

      chart
        .append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0,${y(0) - 20})`)
        .call(d3.axisBottom(x));

      chart
        .append("g")
        .attr("class", "axis axis--y")
        .attr("transform", `translate(0,0)`)
        .call(d3.axisLeft(y));
    })
  }

  render() {
    return(
      <div>
        <p>
          {this.state.graph}
        </p>
        <svg
          className='line-chart'
          ref={r => (this.chartRef = r)} />
      </div>
    )
  }
}

export default Graph;
