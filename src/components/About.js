import React from 'react'
import '../App.css';
import logo from '../images/notes.png'

const About = () => {
 
  return (
    <div>
      <div className="about-div">
        <div className="details">
          <h1 className="title">Your notes.</h1>
          <h1 className="title">Organized.</h1>
          <h1 className="title">Effortless.</h1>
          <div className="description">
            <p>Take notes anywhere. Find information faster. Share ideas with anyone. Write your notes related to anything in life and access them anytime, anywhere with iNotebook </p>
          </div>
        </div>
        <div className="notes-img">
          <img src={logo} alt=""></img>
        </div>
      </div>
    </div>
  )
}

export default About
