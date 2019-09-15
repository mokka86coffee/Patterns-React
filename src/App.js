import React, { Component } from 'react';
import Switch from './Switch';
import logo from './logo.svg';
import './App.css';

class Toggle extends React.Component {
  state = {on: false}
  toggle = () => this.setState(({on}) => ({on: !on}), () => this.props.onToggle(this.state.on))

  render() {
    return <Switch on={this.state.on} onClick={this.toggle} />;
  }
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args)
}) {
  return <Toggle onToggle={onToggle} />
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Usage />
      </div>
    );
  }
}

export default App;
