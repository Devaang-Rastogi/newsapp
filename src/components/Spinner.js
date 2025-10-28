import React, { Component } from 'react'
import loading from './hold-on.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={loading} alt="loading" height={48} width={48} />
      </div>
    )
  }
}

export default Spinner