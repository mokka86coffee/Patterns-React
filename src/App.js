import React, { Component } from 'react';
import Switch from './Switch';
import logo from './logo.svg';
import './App.css';

const ToggleContext = React.createContext();

class Toggle extends React.Component {
  static On = ({children}) => <ToggleContext.Consumer>{({on}) => on ? children : null}</ToggleContext.Consumer>
  static Off = ({children}) => <ToggleContext.Consumer>{({on}) => on ? null : children}</ToggleContext.Consumer>
  static Button = ({children}) => <ToggleContext.Consumer>{({on, toggle}) => <Switch on={on} onClick={toggle}/>}</ToggleContext.Consumer>

  state = {on: false}
 
  toggle = () => this.setState(({on}) => ({on: !on}), () => this.props.onToggle(this.state.on))

  render() {
    return (
      <ToggleContext.Provider
        value={{
          on: this.state.on,
          toggle: this.toggle
        }}
      >
        {this.props.children}
      </ToggleContext.Provider>
    )
  }
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args)
}) {
  return (
    <Toggle onToggle={onToggle}>
      <div>
        <Toggle.Button />
      </div>
      <div>
        <Toggle.On>The button is On</Toggle.On>
        <Toggle.Off>The button is Off</Toggle.Off>
      </div>
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
