import React from 'react'
import axios from 'axios'; 
const URL = 'http://localhost:9000/api/result';

const initialState = {
  x: 2,
  y: 2,
  email: '',
  steps: 0,
  grid: [[null, null, null], [null, "B", null], [null, null, null]]
}

export default class AppClass extends React.Component {
  constructor(props){
    super(props)
    this.state = initialState;
  }
  //When Resetting
  reset = () =>{
    this.setState(initialState);
  }
  onChange = (key, value) => {
    this.setState({
      ...this.state,
      form: { ...this.state.form, [key]: value },
    })
  }
  onSubmit = e =>{
    e.preventDefault()
    axios.post(URL, this.state)
      .then(reponse =>{
        this.setState({
          
        })
      })
    
  }
  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" onChange={(this.onChange)}></input>
          <input id="submit" type="submit" onSubmit = {this.onSubmit}></input>
        </form>
      </div>
    )
  }
}
