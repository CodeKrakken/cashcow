import React, { Component } from "react";
import Axios from "axios";
const d3 = require("d3")


class Graph extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this._createGraph(this.props.symbol)
  }

  componentDidUpdate(prevProps) {
    if (this.props.symbol !== prevProps.symbol) {
      d3.select('#chart').select('svg').remove()
      this._createGraph(this.props.symbol)
    }
  }

  _createGraph(symbol) {
    d3.json(`/api/week/${symbol}`).then(data => {
      let timeseries = []

      for (let i = 0; i < data.length; i++) {
        timeseries.push({
          //graph input array accepts array of objects in the following format
          date: new Date(data[i].date),
          high: data[i].high, // can delete high,low and open as no longer using
          low: data[i].low,
          open: data[i].open,
          close: data[i].close,
          volume: data[i].volume
        })
      }

      // graph is drawn with the following functions
      try {
        this.setState({ data : timeseries });
        this.initializeChart()
        this.handleGraphScale()
        this.generateAxes()
        this.generateCloseLine()
      } catch (err) {
        console.log(err)
      }
      }
    );
  }

  initializeChart = () => {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    // append an svg element to the <div id='chart'> element
    const svg = d3
      .select('#chart')
      .append('svg')
      // assign the height and width of the svg element
      .attr('viewBox', '0  0 800 600')
      .attr('width', width + margin['left'] + margin['right'])
      .attr('height', height + margin['top'] + margin['bottom'])
      .append('g')
      .attr('transform', `translate(${margin['left']},  ${margin['top']})`);

    this.setState({
      svg : svg,
      margin : margin,
      width : width,
      height : height
    })
  }

  handleGraphScale = () => {
    const xMin = d3.min(this.state.data, d => {
      return d['date'];
    });
    const xMax = d3.max(this.state.data, d => {
      return d['date'];
    });
    const yMin = d3.min(this.state.data, d => {
      return d['close'];
    });
    const yMax = d3.max(this.state.data, d => {
      return d['close'];
    });

    const xScale = d3
      .scalePoint()
      .domain(this.state.data.map((d) => d['date']).reverse()) //
      .range([0, this.state.width]); // chart width
    const yScale = d3
      .scaleLinear()
      .domain([yMin - 4, yMax]) // size of range of y values
      .range([this.state.height, 0]); // chart height

    this.setState({
      yScale,
      xScale
    })
  }

  generateAxes = () => {
    this.state.svg
      // append 'g' element to 'svg' element
      .append('g')
      .attr('id', 'xAxis')
      .attr('transform', `translate(0, ${this.state.height})`)
      .call(d3.axisBottom(this.state.xScale)
        .tickFormat(d3.timeFormat("%a %d %b")));

    this.state.svg
      .append('g')
      .attr('id', 'yAxis')
      .attr('transform', `translate(${this.state.width}, 0)`)
      .call(d3.axisRight(this.state.yScale)
        .tickFormat(d3.format("$")));
  }

  generateCloseLine = () => {
    const line = d3.line()
      .x(d => { // draw x line
        return this.state.xScale(d['date']);
      })
      .y(d => { //draw y line
        return this.state.yScale(d['close']);
      });

    this.state.svg
      .append('path')
      .data([this.state.data])
      .style('fill', 'none')
      .attr('id', 'priceChart')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', '1.5')
      .attr('d', line);
  }

  render () {
    return(
      <div className="chart-container-div">
        <div className="text-center" id="chart">
          <h2>Closing price (last 7 working days)</h2>
        </div>
      </div>
    )
  }
}

export default Graph;
