import React, {Component} from 'react';
import { View, Text } from 'react-native';
//Component Name
import Splash from './src/components/Splash';
import OrderCreate from './src/components/OrderCreate/OrderCreate';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 'Splash'
    };
    setTimeout(() => {
      this.setState({ currentScreen: 'OrderCreate' })
    }, 2000)
  }
  render() {
    const { currentScreen } = this.state;
    let mainScreen = currentScreen === 'Splash' ? <Splash/> : <OrderCreate/>;
    return mainScreen;
  }
}
