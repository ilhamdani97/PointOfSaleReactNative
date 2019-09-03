import React, { Component } from 'react'
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
import { Provider, connect } from 'react-redux'

import { MenuStore } from './src/redux/menuStore'
import LoginStack from './src/navigation/LoginStack'
import PublicStack from './src/navigation/PublicStack'
import RootStack from './src/navigation/RootStack'

const AppNavigator = createSwitchNavigator({
  LoginStack: LoginStack,
  PublicStack: PublicStack,
  RootStack: RootStack
}, {
    initialRouteName: 'PublicStack'
  })
const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  render() {
    return (
      <Provider store={MenuStore}>
        <AppContainer />
      </Provider>
      
    )
  }
}

export default App;