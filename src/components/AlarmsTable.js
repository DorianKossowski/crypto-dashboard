import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';

import ManageAlarmModal from './modals/ManageAlarmModal';

class AlarmsTable extends Component {

    render() {
        return (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Value</th>
                <th>Last occured</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.map(alarm => this.toRow(alarm))}
            </tbody>
          </Table>
        );
    }

  toRow = alarm => {
    return (
      <tr>
        <td>{alarm.name}</td>
        <td>{alarm.description}</td>
        <td>{alarm.value}</td>
        <td>{alarm.lastOccured}</td>
        <td><ManageAlarmModal singleElement={ alarm } postAction={ this.props.postAction } chartType={ this.props.chartType }/></td>
      </tr>
    );
  }
}

export default AlarmsTable;
