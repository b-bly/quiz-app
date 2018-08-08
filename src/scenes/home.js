import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <p>It's good to be home</p>
        <Link to="/new-quiz" className="btn btn-link text-secondary">
          <button>Start</button>
        </Link>
        
      </div>
    )
  }
}

export default Home