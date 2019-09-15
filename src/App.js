import React, { Component } from 'react';
import Switch from './Switch';
import logo from './logo.svg';
import './App.css';

const ToggleContext = React.createContext();

const ToggleConsumer = (props) => {
  return (
    <ToggleContext.Consumer>{context => {
        if (!context) {
          throw new Error('Toggle components suppose to be rendered within "Toggle" component');
        }
        return props.children(context)
      }}
    </ToggleContext.Consumer>
  )}

class Toggle extends React.Component {
  static On = ({children}) => <ToggleConsumer>{({on}) => on ? children : null}</ToggleConsumer>
  static Off = ({children}) => <ToggleConsumer>{({on}) => on ? null : children}</ToggleConsumer>
  static Button = ({children}) => <ToggleConsumer>{({on, toggle}) => <Switch on={on} onClick={toggle}/>}</ToggleConsumer>

  state = {on: true}
 
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
