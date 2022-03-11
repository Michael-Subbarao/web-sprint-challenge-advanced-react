import React,{ useState } from 'react'
import axios from 'axios'; 

const initialState = {
  x: 2,
  y: 2,
  email: '',
  steps: 0,
  message: '',
}

export default function AppFunctional(props) {
  const [x,setX] = useState(initialState.x);
  const [y,setY] = useState(initialState.y);
  const [email,setEmail] = useState(initialState.email);
  const [steps,setSteps] = useState(initialState.steps);
  const [message,setMessage] = useState(initialState.message);
  
  const reset = () =>{
    setX(initialState.x);
    setY(initialState.y);
    setEmail(initialState.email);
    setSteps(initialState.steps);
    setMessage(initialState.message);
  }

    const onChange = e => {
      const {value} = e.target
      this.setState({...this.state, email: value})
    }
    

    //movement
    const left = () =>{
      if(x>1){
        setX(x-1)
        setSteps(steps + 1)
      } else {
        setMessage("You can't go left")
      }
  }

    const right = () =>{
      if(x<3){
        setX(x+1)
        setSteps(steps + 1)
      } else {
        setMessage("You can't go right")
      }
  }

    const up = () =>{
      if(y>1){
        setY(y-1)
        setSteps(steps + 1)
    } else {
        setMessage("You can't go up")
    }
  }
    const down = () =>{
      if(y<3){
        if(y >= 1 && y < 3){
          setY(y+1)
          setSteps(steps + 1)
        } else {
          setMessage("You can't go down")
        }
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
        setMessage(res.data.message)
      })
      .catch(error=> {
        setMessage(err.response.data.message)
      })
      setEmail('');
    }
    return (
      <div id="wrapper" className={props.className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({x}, {y})</h3>
          <h3 id="steps">You moved {steps} {steps===1?'time': 'times'}</h3>
        </div>
        <div id="grid">
          <div className= { x ===1 && y === 1 ? 'square active' : 'square '}>{x ===1 && y === 1 ? 'B' : ''}</div>
          <div className={ x === 2 && y === 1 ? 'square active' : 'square '}>{x ===2 && y === 1 ? 'B' : ''}</div>
          <div className={ x === 3 && y === 1 ? 'square active' : 'square '}>{x ===3 && y === 1 ? 'B' : ''}</div>
          <div className={ x === 1 && y === 2 ? 'square active' : 'square '}>{x ===1 && y === 2 ? 'B' : ''}</div>
          <div className={ x === 2 && y === 2 ? 'square active' : 'square '}>{x ===2 && y === 2 ? 'B' : ''}</div>
          <div className={ x === 3 && y === 2 ? 'square active' : 'square '}>{x ===3 && y === 2 ? 'B' : ''}</div>
          <div className={ x === 1 && y === 3 ? 'square active' : 'square '}>{x ===1 && y === 3 ? 'B' : ''}</div>
          <div className={ x === 2 && y === 3 ? 'square active' : 'square '}>{x ===2 && y === 3 ? 'B' : ''}</div>
          <div className={ x === 3 && y === 3 ? 'square active' : 'square '}>{x ===3 && y === 3 ? 'B' : ''}</div>
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
        <input id="email" type="email" placeholder="type email" onChange={onChange} value={email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }

