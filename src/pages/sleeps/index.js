import React from "react";
import {Service} from "../sleep/service";
import moment from "moment";

export class Sleeps extends React.Component {
  constructor() {
    super();
    this.state = {
      sleeps: []
    }
  }

  componentDidMount() {
    this.setState({
      sleeps: new Service().sleeps
    })
  }

  render() {
    return (
      <div style={{
        background: '#222222',
        height: '100vh'
      }} className={'container'}>
        <h1 className={'text-white pt-2'}>Sleep History</h1>
        <table className="table bg-secondary">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Duration</th>
          </tr>
          </thead>
          <tbody>
            {this.state.sleeps.map((sleep, index) => {
              return (
                <tr key={sleep.start}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {moment(sleep.start).format('lll')}
                  </td>
                  <td>
                    {moment(sleep.end).format('lll')}
                  </td>
                  <td>
                    {moment(sleep.end).diff(sleep.start, 'hours')}
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    )
  }
}