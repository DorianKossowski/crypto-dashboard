import React, { Component } from 'react';
import { LineChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Line, Tooltip, Legend } from "recharts";

import api from '../helpers/Api.js';
import OvalLoader from './helpers/OvalLoader';
import ErrorAlert from './helpers/ErrorAlert';
import handleError from '../helpers/ErrorHandlingService';

class LookIntoBitcoinChart extends Component {

      state = {
          chartData : null,
          bitcoinData : null,
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
          api({
              method: 'GET',
              url: '/charts/bitcoin'
          })
          .then(data => this.setState({ bitcoinData: data }))
          .catch(error => this.setState({ errMsg: handleError(error, 'Error during getting chart data: ') }))
          .finally(() => this.setState({ loading: false }));
      }

      getChartRender = () => {
          if (this.state.chartData === null || this.state.bitcoinData === null) {
            return (<OvalLoader/>)
          }
          const {dates, values} = this.state.chartData
          const bitcoin = this.state.bitcoinData.values
          const data = this.formatChartData(dates, values, bitcoin)
          return (
              <ResponsiveContainer width='100%' height={400}>
                  <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <XAxis dataKey="x" minTickGap = {60}/>
                      <YAxis yAxisId="data" domain={['dataMin', 'dataMax']}/>
                      <YAxis yAxisId="bitcoin" orientation="right" domain={['dataMin', 'dataMax']}/>
                      <Line yAxisId="data" type="linear" dataKey="data" stroke="#82ca9d" dot={false} />
                      <Line yAxisId="bitcoin" type="linear" dataKey="btc" stroke="#4b6adb" dot={false} />
                      <Tooltip formatter={(value, name, props) => [value, props.payload.date]}/>
                      <Legend />
                  </LineChart>
              </ResponsiveContainer>
          );
      }

      formatChartData = (dates, values, bitcoin) => {
        const data = []
        for (var i = 0; i < values.length; i++) {
          data.push({ x: dates[i].substring(0, 4), date: dates[i], data: Math.round(values[i] * 1000) / 1000, btc: bitcoin[i] })
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

export default LookIntoBitcoinChart;
