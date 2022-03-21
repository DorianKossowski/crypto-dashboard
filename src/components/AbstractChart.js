import React, { Component } from 'react';
import { LineChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Line, Tooltip } from "recharts";

import api from '../helpers/Api.js';
import OvalLoader from './helpers/OvalLoader';
import ErrorAlert from './helpers/ErrorAlert';
import handleError from '../helpers/ErrorHandlingService';

class AbstractChart extends Component {

      state = {
          chartData : null,
          loading: false,
          errMsg: ''
      }

      componentDidMount() {
          this.getChartData();
      }

      getChartData = () => {
          this.setState({ loading: true });
          this.setState({ errMsg: '' });
          api({
              method: 'GET',
              url: '/charts/' + this.getChartUrl()
          })
          .then(data => this.setState({ chartData: data }))
          .catch(error => this.setState({ errMsg: handleError(error, 'Error during getting chart data: ') }))
          .finally(() => this.setState({ loading: false }));
      }

      getChartRender = () => {
          if (this.state.chartData === null) {
            return (<></>)
          }
          const {dates, values} = this.state.chartData
          const data = this.formatChartData(dates, values)
          return (
              <ResponsiveContainer width='100%' height={400}>
                  <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <XAxis dataKey="x" minTickGap = {60}/>
                      <YAxis domain={['dataMin', 'dataMax']}/>
                      <Line type="linear" dataKey="y" stroke="#82ca9d" dot={false} />
                      <Tooltip formatter={(value, name, props) => [value, props.payload.date]}/>
                  </LineChart>
              </ResponsiveContainer>
          );
      }

      formatChartData = (dates, values) => {
        const data = []
        for (var i = 0; i < values.length; i++) {
          data.push({ x: dates[i].substring(0, 4), date: dates[i], y: Math.round(values[i] * 1000) / 1000 })
        }
        return data;
      }

      render = () => {
          return (
              <div>
                  <ErrorAlert msg={this.state.errMsg}/>
                  <h1>{this.getChartName()}</h1>
                  {this.state.loading ? <OvalLoader/> : this.getChartRender()}
              </div>
          );
      }

      // ABSTRACT
      getChartName = () => new Error('Not implemented!');

      getChartUrl = () => new Error('Not implemented!');
}

export default AbstractChart;
