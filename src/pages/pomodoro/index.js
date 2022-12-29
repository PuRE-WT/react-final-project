import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from "moment-duration-format";
import {Modal} from "react-bootstrap";

momentDurationFormatSetup(moment);
export class Pomodoro extends React.Component {
  constructor() {
    super();
    this.data = {
      timer: null,
    }
    this.state = {
      time: 60 * 25,      // default time is 25 minutes
      flicker: true,
      status: 'stop',     // there are three status: stop, start, pause
      open: false,        // control modal visible
      thing: ''           // what is current doing
    }

    // use bind because the "this" effect
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickStop = this.handleClickStop.bind(this);
    this.handleClickPause = this.handleClickPause.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  // handle click "submit" button on the modal
  handleClickSubmit() {
    this.setState({
      status: 'start',
      open: false
    });
  }

  // handle click start button
  handleClickStart() {
    if (this.state.time === 0) {
      this.setState({
        open: true
      })
    } else {
      this.setState({
        status: 'start'
      });
    }
  }

  // handle click stop button
  handleClickStop() {
    clearTimeout(this.data.timer);
    this.setState({
      status: 'stop',
      time: 25 * 60,
      thing: ''
    });
  }

  // handle click pause button
  handleClickPause() {
    clearTimeout(this.data.timer);
    this.setState({
      status: 'pause'
    });
  }

  // update the time, subtract one second
  refreshTime() {
    if (this.state.status === 'start') {
      clearTimeout(this.data.timer);
      this.data.timer = setTimeout(() => {
        const time = this.state.time;
        if (time > 0) {
          this.setState({
            time: time - 1
          })
          this.refreshTime();
        } else {
          this.setState({
            status: 'stop'
          })
        }

      }, 1000);
    }
  }

  componentDidMount() {
    this.refreshTime();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // trigger only the current status is 'start' and last status is not 'start'
    if (this.state.status === 'start' && (prevState.status === 'stop' || prevState.status === 'pause')) {
      this.refreshTime();
    }
  }

  render() {
    return (
      <div className={'container'}>
        <h1 className={'mt-2'}>Pomodoro</h1>
        <Modal
          onHide={() => this.setState({open: false})}
          show={this.state.open}>
          <Modal.Header closeButton>
            <Modal.Title>Enter current thing</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              value={this.state.thing}
              onChange={e => this.setState({
                thing: e.target.value
              })}
              className={'form-control'}
              placeholder={'Enter current thing'}/>
            <div className={'mt-2'}>
              <button
                onClick={this.handleClickSubmit}
                className={'me-2 btn btn-primary'}>Submit</button>
              <button onClick={() => this.setState({open: false})} className={'btn btn-light'}>Cancel</button>
            </div>
          </Modal.Body>
        </Modal>
        <div
          style={{
            width: '60vw',
            height: '60vw',
            marginTop: '10vh',
            borderRadius: '50%',
            background: 'gainsboro',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '3em'
          }}
        >
          <span>
            {moment().hours(0).minutes(0).seconds(this.state.time).format('HH:mm:ss')}
          </span>
        </div>
        {this.state.thing && this.state.status !== 'stop' && (
          <div className="alert alert-success mt-5 text-center" role="alert">
            {this.state.thing}
          </div>
          )}
        <div style={{marginTop: '50px'}} className={'mb-3 text-center'}>
          <button
            onClick={this.handleClickStart}
            className={'w-50 btn btn-primary'}>
            Start
          </button>
        </div>
        <div className={'mb-3 text-center'}>
          <button
            onClick={this.handleClickPause}
            className={'w-50 btn btn-warning text-white'}>
            Pause
          </button>
        </div>
        <div className={'mb-3 text-center'}>
          <button
            onClick={this.handleClickStop}
            className={'w-50 btn btn-danger'}>
            Stop
          </button>
        </div>
      </div>
    )
  }
}

