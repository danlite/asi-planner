import React, { Component } from 'react'

class LevelFeature extends Component {
  render() {
    return (
      <div className="LevelFeature">
        {this.props.children}
      </div>
    )
  }
}

export default LevelFeature
