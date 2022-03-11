import React from 'react'
import axios from 'axios'; 
const URL = 'http://localhost:9000/api/result';

const initialState = {
  x: 2,
  y: 2,
  email: '',
  steps: 0,
  message: '',
}

export default class AppClass extends React.Component {
  constructor(props){
    super(props)
    this.state = initialState;
  }
  //When Resetting
  
  render() {
    const { className } = this.props
    const {x, y, steps, email, message} = this.state

    const reset = () =>{
      this.setState(initialState);
      this.setState({
        message: ''
      })
    }

    const onChange = e => {
      const {value} = e.target
      this.setState({...this.state, email: value})
    }
    

    //movement
    const left = () =>{
      if(x>1){
        this.setState({
          ...this.state,
          steps: this.state.steps + 1,
          x: this.state.x - 1,
        })
      }
      else {
        this.setState({message: "You can't go left"})
      }
    }

    const right = () =>{
      if(x<3){
        this.setState({
          ...this.state,
          steps: this.state.steps + 1,
          x: this.state.x + 1,
        })
      }
      else {
        this.setState({message: "You can't go right"})
      }
    }

    const up = () =>{
      if(y>1){
        this.setState({
          ...this.state,
          steps: this.state.steps + 1,
          y: this.state.y - 1,
        })
      }
      else {
        this.setState({message: "You can't go up"})
      }
    }
    const down = () =>{
      if(y<3){
        this.setState({
          ...this.state,
          steps: this.state.steps + 1,
          y: this.state.y + 1,
        })
      }
      else {
        this.setState({message: "You can't go down"})
      }
    }

    const onSubmit = event => {
      event.preventDefault()
     
      axios.post('http://localhost:9000/api/result', {
        'x': x,
        'y': y,
        'steps': steps,
        'email': email
      })
      .then(response=> {
        this.setState({...this.state, message: response.data.message})
        this.setState({...this.state, email: ''})
      })
      .catch(error=> {
        this.setState({...this.state, message: error.response.data.message})
      })
      this.setState({
        email: ''
      })
    }
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({x}, {y})</h3>
          <h3 id="steps">You moved {steps} {steps===1?'time': 'times'}</h3>
        </div>
        <div id="grid">
          <div className= { this.state.x ===1 && this.state.y === 1 ? 'square active' : 'square '}>{this.state.x ===1 && this.state.y === 1 ? 'B' : ''}</div>
          <div className={ this.state.x === 2 && this.state.y === 1 ? 'square active' : 'square '}>{this.state.x ===2 && this.state.y === 1 ? 'B' : ''}</div>
          <div className={ this.state.x === 3 && this.state.y === 1 ? 'square active' : 'square '}>{this.state.x ===3 && this.state.y === 1 ? 'B' : ''}</div>
          <div className={ this.state.x === 1 && this.state.y === 2 ? 'square active' : 'square '}>{this.state.x ===1 && this.state.y === 2 ? 'B' : ''}</div>
          <div className={ this.state.x === 2 && this.state.y === 2 ? 'square active' : 'square '}>{this.state.x ===2 && this.state.y === 2 ? 'B' : ''}</div>
          <div className={ this.state.x === 3 && this.state.y === 2 ? 'square active' : 'square '}>{this.state.x ===3 && this.state.y === 2 ? 'B' : ''}</div>
          <div className={ this.state.x === 1 && this.state.y === 3 ? 'square active' : 'square '}>{this.state.x ===1 && this.state.y === 3 ? 'B' : ''}</div>
          <div className={ this.state.x === 2 && this.state.y === 3 ? 'square active' : 'square '}>{this.state.x ===2 && this.state.y === 3 ? 'B' : ''}</div>
          <div className={ this.state.x === 3 && this.state.y === 3 ? 'square active' : 'square '}>{this.state.x ===3 && this.state.y === 3 ? 'B' : ''}</div>
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick = {left}>LEFT</button>
          <button id="up" onClick = {up}>UP</button>
          <button id="right" onClick = {right}>RIGHT</button>
          <button id="down" onClick = {down}>DOWN</button>
          <button id="reset" onClick = {reset}>reset</button>
        </div>
        <form onSubmit = {onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange} value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
//value={this.state.email}