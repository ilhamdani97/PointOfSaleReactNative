import React, { Component } from 'react'
import { StyleSheet, } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { Card, Icon } from "react-native-elements";
import Home from '../screen/publics/Home';
import Category from '../screen/publics/Category'
import Official from '../screen/publics/Official'
import StartAccount from '../screen/account/StartAccount';

const PublicNav = createBottomTabNavigator({
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
                <Icon name="list" color={tintColor} size={25} />
            )
        }
    },
    Official: {
        screen: Official,
        navigationOptions: {
            tabBarLabel: 'Official',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="shopping-cart" color={tintColor} size={25} />
            )
        }
    },
    Account: {
        screen: StartAccount,
        navigationOptions: {
            tabBarLabel: 'Account',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="face" color={tintColor} size={25} />
            )
        }
    }
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default createAppContainer(PublicNav)