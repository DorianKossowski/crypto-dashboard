import React, { Component } from 'react';

import api from '../helpers/Api.js';
import OvalLoader from './helpers/OvalLoader';
import ErrorAlert from './helpers/ErrorAlert';
import handleError from '../helpers/ErrorHandlingService';

import AddAlarmModal from './modals/AddAlarmModal';
import AlarmsTable from './AlarmsTable';

class Alarms extends Component {

      state = {
          alarms : [
          ],
          loading: false,
          errMsg: ''
      }

      componentDidMount() {
          this.getAlarmsData();
      }

      getAlarmsData = () => {
          this.setState({ loading: true });
          this.setState({ errMsg: '' });
          api({
              method: 'GET',
              url: '/alarms?chartType=' + this.props.chartType
          })
          .then(data => this.setState({ alarms: data.alarms }))
          .catch(error => this.setState({ errMsg: handleError(error, 'Error during getting alarms: ') }))
          .finally(() => this.setState({ loading: false }));
      }

      getAlarmsRender = () => {
          const mainContent = this.state.alarms.length === 0 ?
              <div><p>Lack of alarms in database</p></div> : <AlarmsTable data={ this.state.alarms } postAction={ this.getAlarmsData } chartType={ this.props.chartType }/>
          return (
            <>
              {mainContent}
              Want more? <AddAlarmModal postAction={ this.getAlarmsData } chartType={ this.props.chartType }/>
            </>
          );
      }

      render = () => {
          return (
              <div>
                  <ErrorAlert msg={this.state.errMsg}/>
                  <h3>Alarms</h3>
                  {this.state.loading ? <OvalLoader/> : this.getAlarmsRender()}
              </div>
          );
      }
}

export default Alarms;
