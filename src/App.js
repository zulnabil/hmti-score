import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

const Play = styled.div`
  display: ${props => props.play ? 'block' : 'none'};
`

const InputTim = styled.div`
  display: ${props => props.play ? 'none' : 'block'};
`

const Scores = styled.div`
  font-size: 5em;
  font-weight: bold;
  border: 8px solid white;
`

class Clock extends React.Component {
  format(time) {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return minutes + ':' + seconds;
  }
  render () {
    const {time} = this.props;
    return (
      <div className="displayedTime">
        <h1 style={{marginBottom: '5px'}}>TIME<br></br>{this.format(time)}</h1>
      </div>
    )
  }
}

class Input extends React.Component {
  
  onSubmit(event) {
    event.preventDefault();
    this.props.onSetCountdown(parseInt(1200, 10));
  }
  render() {
    return (
      <form ref="form" onSubmit={this.onSubmit.bind(this)}>
        <input type="submit" value="Start"></input>
      </form>
    )
  }
}

class Button extends React.Component {
  render() {
    return (
        <button onClick={this.props.onClickHandler}>{this.props.label}</button>    
    );
  }
}

class Fouls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foulsA: 0,
      foulsB: 0
    }
  }

  upFoulsA() {
    this.setState({
      foulsA: this.state.foulsA + 1
    })
  }

  upFoulsB() {
    this.setState({
      foulsB: this.state.foulsB + 1
    })
  }

  resetFouls() {
    this.setState({
      foulsA: 0,
      foulsB: 0
    })
  }

  render() {
    return (
      <div>
        <h2 style={{marginBottom: '5px'}}>FOULS<br></br>
        {this.state.foulsA}&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.foulsB}
        </h2>
        <button onClick={this.upFoulsA.bind(this)}>+</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={this.upFoulsB.bind(this)}>+</button>
        <br></br>
        <button onClick={this.resetFouls.bind(this)} >Reset Fouls</button>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      running: false,
      play: false,
      TimA: '',
      TimB: '',
      scoreA: 0,
      scoreB: 0,
      foulsA: 0,
      foulsB: 0
    }
    this.inputTimA = React.createRef();
    this.inputTimB = React.createRef();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(this.state.running !== prevState.running){
      switch(this.state.running) {
        case true:
          this.handleStart();
      }
    }
  }
  
  handleStart() {
    this.timer = setInterval(() => {
      const newCount = this.state.count - 1;
      this.setState(
        {count: newCount >= 0 ? newCount : 0}
      );
    }, 1000);
  }
  
  handleStop() {
    if(this.timer) {
      clearInterval(this.timer);
      this.setState(
        {running:false}
      );
    }
  }

  handleResume() {
    this.setState({
      running: true
    })
  }
  
  handleReset() {
    this.setState(
      {count: 0}
    );
  }
  
  handleCountdown(seconds) {
    this.setState({
      count: seconds,
      running: true
    })
  }

  handleAddTim() {
    this.setState({
      TimA: this.inputTimA.current.value,
      TimB: this.inputTimB.current.value,
      play: true
    })
  }

  upScoreA() {
    this.setState({
      scoreA: this.state.scoreA + 1
    })
  }

  upScoreB() {
    this.setState({
      scoreB: this.state.scoreB + 1
    })
  }

  resetScore() {
    this.setState({
      scoreA: 0,
      scoreB: 0
    })
  }

  render() {
    const {count} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <InputTim play={this.state.play}>
            <h1>INFORMATIKA CUP HMTI 2019</h1>
            <h2>Masukkan nama Tim Pertama dan Tim Kedua!</h2>
            <input ref={this.inputTimA} type='text' placeholder='Tim Pertama' size='35' ></input><br></br>
            <input ref={this.inputTimB} type='text' placeholder='Tim Kedua' size='35' ></input><br></br>
            <button onClick={this.handleAddTim.bind(this)} >Submit</button>
          </InputTim>
          <Play play={this.state.play}>
            
            
            <div className='cobain'>
              <div className='cobain'>
              <Clock time={count}/>
                <Input onSetCountdown={this.handleCountdown.bind(this)}/>
                <Button label="Pause" onClickHandler={this.handleStop.bind(this)}/>&nbsp;&nbsp;
                <Button label="Resume" onClickHandler={this.handleResume.bind(this)}/>&nbsp;&nbsp;
                <Button label="Reset" onClickHandler={this.handleReset.bind(this)}/>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className='cobain'>
                <img src="https://cdn-std.dprcdn.net/files/acc_691706/K56tAG?download" className="App-logo" alt="logo" />
                <div>
                      <h3 style={{marginBottom: '1px'}}>
                        {this.state.TimA}&nbsp;&nbsp;&nbsp;VS&nbsp;&nbsp;&nbsp;{this.state.TimB}
                      </h3>
                      
                      <Scores>
                      {this.state.scoreA} : {this.state.scoreB}
                      </Scores>
                    
                    <button onClick={this.upScoreA.bind(this)}>+</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={this.upScoreB.bind(this)}>+</button>
                    <br></br>
                    <button onClick={this.resetScore.bind(this)} >Reset Score</button>
                  </div>  
                </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className='cobain'>
                <Fouls />
              </div>
            </div>
          </Play>
        </header>
      </div>
    );
  }
}

export default App;
