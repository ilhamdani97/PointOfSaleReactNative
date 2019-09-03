import React, {Component} from 'react'
import { createStackNavigator, createAppContainer } from "react-navigation"

import PublicNav from './PublicNav'
import Home from '../screen/publics/Home'
import Login from '../screen/account/Login';
import Menu from '../screen/publics/Menu'
import Order from '../screen/publics/Order';
import SuccessOrder from '../screen/publics/SuccessOrder';
const SatackPublic = createStackNavigator({
    Home:Home,
    Menu:Menu,
    Order:Order,
    SuccessOrder:SuccessOrder

} ,{
    initialRouteName: "Home",
    headerMode: 'none'
});

class PublicStack extends Component {
    render() {
      return (
        <PublicStack />
      );
    }
  }
  export default SatackPublic;