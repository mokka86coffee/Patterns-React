import React, { Component } from 'react';
import Switch from './Switch';
import logo from './logo.svg';
import './App.css';

class Toggle extends React.Component {
  static On = ({on, children}) => on ? children : null
  static Off = ({on, children}) => on ? null : children
  static Button = ({on, onClick, ...restProps}) => <Switch {...restProps} on={on} onClick={onClick} />
  state = {on: false}
  toggle = () => this.setState(({on}) => ({on: !on}), () => this.props.onToggle(this.state.on))

  render() {
    return React.Children.map(this.props.children, childElement =>
      React.cloneElement(childElement, {
        on: this.state.on,
        onClick: this.toggle
      })
    )
  }
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args)
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.Button />
      <Toggle.On>The button is On</Toggle.On>
      <Toggle.Off>The button is Off</Toggle.Off>
    </Toggle>
  )

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
