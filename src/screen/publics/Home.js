import React, { Component } from 'react';
import { Button, } from 'react-native-paper';
import { StyleSheet, View, StatusBar, Dimensions, Image, Text, TouchableHighlight,ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Item, Input, Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import { URLAPI } from 'react-native-dotenv'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableNumber: '',
            onloading: 0
        };
    }
    handleChange = (text, name) => {
        this.setState({
            [name]: text,
        })
    } 
    onLoadTrue = () => {
        this.setState({
            onloading: this.state.onloading+1,

        })
    }
    onLoadFalse = () => {
        this.setState({
            onloading: this.state.onloading-1,

        })
    }
    componentWillUnmount() {
        this.setState({
            onloading: this.state.onloading-1
        })
      }
    onTable = async () => {
        let table = this.state.tableNumber
        try {
            this.onLoadTrue()
            let tempTable = {
                tableNumber: this.state.tableNumber
                
            }
            await axios.post(`${URLAPI}transactions`, {
                tableNumber: tempTable.tableNumber
            })
                .then((response) => {
                    if (typeof response.data.token !== 'undefined') {
                        this.props.navigation.navigate('Menu', {
                            dataTable: this.state.tableNumber,
                        })
                        this.onLoadFalse()
                    } else {
                        alert(response.data.message)
                    }
                    AsyncStorage.setItem('table',table)
                })
                .catch((error) => {
                    alert(error)
                    this.onLoadFalse()
                })
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        const { width, height } = Dimensions.get('window')
        return (
            <View>
                <ScrollView>
                    <View style={styles.container}>
                        <StatusBar backgroundColor='#FF8A65' barStyle='light-content' />
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ width: width * 76 / 100, height: 60, backgroundColor: '#FF8A65', borderBottomRightRadius: 40, borderTopRightRadius: 40, marginTop: 30 }} >
                                <Image
                                    style={{ width: 234, height: 49, marginLeft: 20, marginTop: 6 }}
                                    source={require('../../assets/image/logo.png')}
                                />
                            </View>
                            <View style={{ width: width * 30 / 100, height: 40, backgroundColor: '#FFFFFF', borderRadius: 40, marginLeft: 2, marginTop: 6 }} >
                                <Text style={{ color: '#757575', marginLeft: 10, marginTop: 10, fontSize: 16 }}></Text>
                            </View>
                        </View>
                        <Image
                            style={{ width: 200, height: 200, marginTop: 50 }}
                            source={require('../../assets/image/store.png')}
                        />
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 50 }}>
                            <View style={{ width: width * 60 / 100, height: 60, }} >
                                <Item regular style={{ borderRadius: 20, Colors: '#FF8A65' }}>
                                    <Input style={{ color: 'black' }} placeholder='Enter No Table' keyboardType={'numeric'}
                                        onChangeText={text => this.handleChange(text, "tableNumber")}
                                        value={this.state.tableNumber}
                                    />
                                </Item>
                            </View>
                            <TouchableHighlight onPress={() => { this.onTable(this.state)}} underlayColor="white">
                                <View style={{ height: 52, width: 60, backgroundColor: "#FF8A65", borderRadius: 50, marginLeft: 10 }}>
                                    {this.state.onloading === 0 &&
                                        <Image
                                            style={{ width: 38, height: 38, marginLeft: 11, marginTop: 7 }}
                                            source={require('../../assets/image/chair.png')}
                                        />
                                    }
                                    {this.state.onloading > 0 &&
                                        <ActivityIndicator
                                            color="#FFFFFF"
                                            animating={true}
                                            style={{marginTop:8}}
                                            size="large"
                                        />
                                    }
                                </View>
                            </TouchableHighlight>

                        </View>

                    </View>
                </ScrollView>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center'
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
export default Home