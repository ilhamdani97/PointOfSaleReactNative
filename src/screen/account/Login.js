import React, { Component } from 'react';
import { Button, Checkbox, Appbar } from 'react-native-paper';
import { StyleSheet, TouchableHighlight, View, Text, Image, StatusBar, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Item, Input, Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
          textUsername: "",
          textPassword: "",
          token: "",
          fatchUser: ""
        }
      }
      componentDidMount() {
        axios.get(`http://192.168.1.25:3000/api/users`)
          .then(response => {
            this.setState({
              fatchUser: response.data
            })
          })
          .catch(error => {
            alert(error)
          })
      }
    
      _handleUsername = (text) => {
        this.setState({
          textUsername: text
        })
      }
      _handlePassword = (text) => {
        this.setState({
          textPassword: text
        })
      }
      aksiLogin = async () => {
        try {
          let tempUser = {
            username: this.state.textUsername,
            password: this.state.textPassword
          }
          await axios.post(`http://192.168.1.25:3000/api/login`, {
            username: tempUser.username,
            password: tempUser.password
          })
            .then((response) => {
              if (typeof response.data.token !== 'undefined') {
                AsyncStorage.setItem('token', response.data.token)
                this.props.navigation.navigate('LoginStack')
              } else {
                alert(response.data.message)
              }
            })
            .catch((error) => {
              alert(error)
            })
        } catch (e) {
          console.log(e)
        }
      }
    render() {
        const { width, height } = Dimensions.get('window')
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Appbar.Header style={{ backgroundColor: '#42A5F5' }}>
                        <Appbar.BackAction color="white"
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </Appbar.Header>
                    <StatusBar backgroundColor='#42A5F5' barStyle='light-content' />

                    <View style={{ padding: 20, paddingTop: 35 }}>
                        <Item regular style={{ borderRadius: 20, Colors: '#42A5F5' }}>
                            <Icon style={styles.icon} active name='mail' />
                            <Input placeholder='email' tokenboardType={'numeric'}
                                onChangeText={this._handleUsername}
                            />
                        </Item>
                    </View>
                    <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 5,paddingBottom:20 }}>
                        <Item regular style={{ borderRadius: 20, Colors: '#42A5F5' }}>
                            <Icon style={styles.icon} active name='key' />
                            <Input placeholder='Password' secureTextEntry={true}  
                                onChangeText={this._handlePassword}
                            />
                        </Item>
                    </View>

                    <View style={{ paddingLeft: 20, paddingRight: 20, }}>
                        <Button style={{ height: 40, borderRadius: 25, backgroundColor: '#42A5F5' }} color="black" mode="contained" onPress={() => this.aksiLogin()}>
                            Login
                        </Button>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 8 }}>
                        <View style={{ width: width * 60 / 100, height: 40, }}>
                            <Text style={{ marginTop: 10, textAlign: 'right', }}>Don't have an account ? </Text>
                        </View>
                        <View style={{ width: width * 40 / 100, height: 40, }}>
                            <TouchableHighlight onPress={() => this.props.navigation.navigate('Register')}>
                                <Text style={{ marginTop: 10, textDecorationLine: 'underline', color: "#42A5F5", textAlign: 'left', }}>
                                    Register
              </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
    },
    input: {
        width: 200,
        borderColor: "#42A5F5",
        paddingTop: 5
    },

    icon: {
        color: "#42A5F5"

    },
})
export default Login;