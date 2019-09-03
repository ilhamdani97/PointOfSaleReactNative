import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { Card, Icon } from "react-native-elements";

import Home from '../screen/publics/Home';
import Category from '../screen/publics/Category'
import Official from '../screen/publics/Official'
import Account from '../screen/privates/Account'

const LoginNav = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="home" color={tintColor} size={25} />
            )
        }
    },
    Category: {
        screen: Category,
        navigationOptions: {
            tabBarLabel: 'Category',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="favorite" color={tintColor} size={25} />
            )
        }
    },
    Official: {
        screen: Official,
        navigationOptions: {
            tabBarLabel: 'Official',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="chat" color={tintColor} size={25} />
            )
        }
    },
    Account: {
        screen: Account,
        navigationOptions: {
            tabBarLabel: 'Account L',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="face" color={tintColor} size={25} />
            )
        }
    },
}, {
        tabBarOptions: {
            activeTintColor: '#2196F3',
            inactiveTintColor: '#42A5F5',
            style: {
                backgroundColor: '#ffffff',
                borderTopWidth: 0,
                shadowOffset: { width: 6, height: 6 },
                shadowColor: 'black',
                shadowOpacity: 0.5,
                elevation: 6,
                paddingTop: 10
            }
        }
    });
export default createAppContainer(LoginNav)