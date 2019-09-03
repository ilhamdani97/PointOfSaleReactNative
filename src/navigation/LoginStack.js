import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import LoginNav from './LoginNav'


const StackLogin = createStackNavigator({
    LoginNav: LoginNav,


}, {
        initialRouteName: "LoginNav",
        headerMode: 'none'
    });

class LoginStack extends Component {
    render() {
        return (
            <LoginStack />
        );
    }
}
export default StackLogin