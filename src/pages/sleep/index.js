import React from "react";
import {Service} from "./service";
import SleepBear from '../../assets/sleep.png';
import moment from "moment/moment";
import {Link} from "react-router-dom";
export class Sleep extends React.Component {
  constructor() {
    super();
    this.data = {
      start: null
    }
    this.state = {
      sleeps: [],       // all sleeps
      time: 0,          // sleep time
      status: 'stop',   // two status: 'start' or 'stop'
      sleepService: new Service()
    }
    // use bind because the "this" effect
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickStop = this.handleClickStop.bind(this);
  }

  // refresh time, add one second once
  refreshTime() {
    if (this.state.status === 'start') {
      setTimeout(() => {
        const time = this.state.time;
        this.setState({
          time: time + 1
        });
        this.refreshTime();
      }, 1000);
    }
  }

  // listen user click stop button
  handleClickStop() {
    this.time = 0;
    this.setState({
      status: 'stop'
    })
    this.state.sleepService.addSleep({
      start: this.data.start,
      end: new Date()
    })
    this.data.start = null;
  }

  // listen user click start button
  handleClickStart() {
    this.setState({
      status: 'start'
    });
    this.data.start = new Date();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.status === 'start' && prevState.status === 'stop') {
      this.refreshTime();
    }
  }

  render() {
    return (
      <div
        style={{
          background: '#222222',
          height: '100vh'
        }}
        className={'container'}>
        <h1 className={'text-white pt-2'}>Sleep</h1>
        <div className={'mt-5 text-center'}>
          <img alt={''} src={SleepBear} width={'70%'}/>
        </div>

        {this.state.status === 'start' && (
          <h1 className={'mt-5 text-center text-white'}>
            {moment().hours(0).minutes(0).seconds(this.state.time).format('HH:mm:ss')}
          </h1>
          )}

        <div className={'d-flex justify-content-center mt-5'}>
          {this.state.status === 'stop' && (
            <div
              onClick={this.handleClickStart}
              style={{
                width: '40vw',
                height: '40vw',
                borderRadius: '50%',
                border: '2px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                background: 'darkcyan',
                fontSize: '1.5em'
              }}
            >Sleep</div>

          )}

          {this.state.status === 'start' && (
            <div
              onClick={this.handleClickStop}
              style={{
                width: '40vw',
                height: '40vw',
                borderRadius: '50%',
                border: '2px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                background: 'darkred',
                fontSize: '1.5em'
              }}
            >Stop</div>

          )}


        </div>
        <div className={'mt-3 text-center'}>
          <Link to={'/sleeps'}>
            <i
              style={{fontSize: '30px'}}
              className="bi bi-calendar-check-fill text-white"></i>
          </Link>
        </div>
      </div>
    )
  }
}