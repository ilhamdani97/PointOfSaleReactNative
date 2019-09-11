import React, { Component } from 'react';
import { StyleSheet, Alert, TextInput, Image, ActivityIndicator, Text, Dimensions, Share, ScrollView, TouchableHighlight } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { View } from 'native-base';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import * as actionMenus from '../../redux/actions/menus';
import * as addMenus from '../../redux/actions/addmenus';
import axios from 'axios'
import { URLAPI } from 'react-native-dotenv'
class Menu extends Component {
    static navigationOptions =
        {
            title: 'Menus List',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#FF9800'
            }
        };
    constructor(props) {
        super(props)
        params = props.navigation.state.params
        AsyncStorage.getItem('table', (error, result) => {
            if (result) {
                this.setState({
                    table: result
                })
            }
        });
        this.state = {
            Menu: [],
            data: null,
            order: [''],
            onloading: 0,
            table: null,
            margin:10

        };
    }
    onLoadTrue = () => {
        this.setState({
            onloading: this.state.onloading + 1,

        })
    }
    onLoadFalse = () => {
        this.setState({
            onloading: this.state.onloading - 1,
        })
    }
    onMargin = () => {
        this.setState({
            margin: this.state.margin = 74,
        })
    }
    toRupiah = (price) => {
        let rupiah = '';
        let convert = price.toString().split('').reverse().join('');
        for (var i = 0; i < convert.length; i++) if (i % 3 == 0) rupiah += convert.substr(i, 3) + '.';
        return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
    }
    confirm = () => {
        Alert.alert(
            'BarBar Food Message',
            'Are You Sure for This Order ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.onAdd(this.props.addmenus.data) },
            ],
            { cancelable: false },
        );
    }
    componentDidMount() {
        this.props.getData()
    }
    async componentWillMount() {
        this.setState(
            { data: await this.props.menus.data },

        )
    }
    handleAddMenus = item => () => {
        this.onMargin()
        const findMenu = this.props.addmenus.data.findIndex(order => {
            return order.menu.id === item.id;
        });
        if (findMenu == -1) {
            this.props.addMenus({ menu: item, qty: 1 });
        } else {
            let orders = this.props.addmenus;
            orders.data[findMenu].qty += 1;
            this.props.updateQty(orders.data);
        }
    }
    handleRemove = item => () => {
        let orders = this.props.addmenus;
        const menuIndex = this.props.addmenus.data.findIndex(order => {
            return order.menu.id === item.menu.id;
        });
        if (orders.data[menuIndex].qty > 1) {
            orders.data[menuIndex].qty -= 1;
            this.props.updateQty(orders.data);
        } else {
            let orders = this.props.addmenus;
            orders.data.splice(menuIndex, 1);
            this.props.updateQty(orders.data);
        }
    }
    handlePostOrder = item => () => {
        this.props.addOrder(item)
    }
    onAdd = async (item) => {
        try {
            this.onLoadTrue()
            let data = item
            await axios({
                url: `${URLAPI}order`,
                method: 'post',
                data: data
            })
                .then((response) => {
                    this.props.navigation.navigate('Order')
                    this.onLoadFalse()
                })
                .catch((error) => {
                    console.log(error)
                    this.onLoadFalse()
                });
        } catch{
            console.log('err')
        }
    }
    render() {
        const { width, height } = Dimensions.get('window')
        const margin = this.state.margin
        if (this.props.menus.isLoading == true) {
            return (
                <ActivityIndicator
                    color="#FF8A65"
                    animating={true}
                    style={styles.indicator}
                    size="large"
                />
            );
        }
        return (
            <View style={{ backgroundColor: 'white', marginBottom: 10 }}>
                <Appbar.Header style={{ backgroundColor: '#FF8A65' }}>
                    <Appbar.BackAction color="white"
                        onPress={() => this.props.navigation.goBack()}
                    />
                </Appbar.Header>
                <View style={{ flexDirection: 'row', backgroundColor: '#FF8A65', position: 'absolute', marginTop: 56 }}>
                    <View style={{ padding: 100, flex: 1, height: 100 }} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ width: width * 70 / 100, height: 80, backgroundColor: '#FF8A65', borderRadius: 40, marginLeft: 20 }} >
                        <Image
                            style={{ width: 234, height: 49 }}
                            source={require('../../assets/image/logo.png')}
                        />
                    </View>
                    <View style={{ width: width * 30 / 100, height: 40, backgroundColor: '#FFFFFF', borderRadius: 40, marginLeft: 2, marginTop: 6 }} >
                        <Text style={{ color: '#757575', marginLeft: 10, marginTop: 10, fontSize: 16 }}>Table : {this.state.table}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', height: height * 75 / 100, borderTopLeftRadius: 80, marginTop: 80 }}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ borderTopLeftRadius: 80, marginTop: 16, marginBottom:margin }} >

                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ width: width * 55 / 100, height: 40, borderRadius: 40, marginLeft: 20 }} >

                            </View>
                            <View style={{ width: width * 44 / 100, height: 40, backgroundColor: '#FF8A65', borderRadius: 40, marginLeft: 2, marginTop: 6 }} >
                                <Text style={{ color: '#FFFFFF', marginLeft: 10, marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>Food</Text>
                            </View>
                        </View>
                        {this.props.menus.data.map((item, i) => (
                            <View key={i} style={{ marginBottom: 5 }}>
                                {item.categoryId === 4 &&
                                    <TouchableHighlight onPress={this.handleAddMenus(item)} underlayColor="white">
                                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 30, marginTop: 20 }} >
                                            <View style={{ width: width * 18 / 100, height: 54, }}>
                                                <Image
                                                    style={{ width: 52, height: 52 }}
                                                    source={require('../../assets/image/ramen.png')}
                                                />
                                            </View>
                                            <View style={{ width: width * 58 / 100, height: 30, marginLeft: 4, marginTop: 6 }} >
                                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#757575' }}>{item.name}</Text>
                                                <Text style={{ fontSize: 16, color: '#757575' }}>{this.toRupiah(item.price)}</Text>
                                            </View>

                                            <View style={{ width: width * 12 / 100, height: 30, marginTop: 14 }} >
                                                <Image
                                                    style={{ width: 20, height: 20 }}
                                                    source={require('../../assets/image/add.png')}
                                                />
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                }
                            </View>
                        ))}
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ width: width * 55 / 100, height: 40, borderRadius: 40, marginLeft: 20 }} >

                            </View>
                            <View style={{ width: width * 44 / 100, height: 40, backgroundColor: '#FF8A65', borderRadius: 40, marginLeft: 2, marginTop: 6 }} >
                                <Text style={{ color: '#FFFFFF', marginLeft: 10, marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>Drink</Text>
                            </View>
                        </View>
                        {this.props.menus.data.map((item, i) => (
                            <View key={i}>
                                {item.categoryId === 5 &&
                                    <View style={{ flex: 1, flexDirection: 'row', marginLeft: 30, marginTop: 20, marginBottom: 10 }} >
                                        <View style={{ width: width * 18 / 100, height: 54, }}>
                                            <Image
                                                style={{ width: 52, height: 52 }}
                                                source={require('../../assets/image/juice.png')}
                                            />
                                        </View>
                                        <View style={{ width: width * 58 / 100, height: 30, marginLeft: 4, marginTop: 6 }} >
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#757575' }}>{item.name}</Text>
                                            <Text style={{ fontSize: 16, color: '#757575' }}>{this.toRupiah(item.price)}</Text>
                                        </View>
                                        <TouchableHighlight onPress={this.handleAddMenus(item)} underlayColor="white">
                                            <View style={{ width: width * 12 / 100, height: 30, marginTop: 14 }} >
                                                <Image
                                                    style={{ width: 20, height: 20 }}
                                                    source={require('../../assets/image/add.png')}
                                                />
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                }
                            </View>
                        ))}
                    </ScrollView>
                    {this.props.addmenus.data.length > 0 &&
                        <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center', borderTopColor: "#FF8A65", backgroundColor: "#FFFFFF", width: width * 100 / 100, height: 80, borderTopWidth: 2 }}>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 8, }}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {this.props.addmenus.data.map((item, i) => (
                                        <View key={i} style={{
                                            width: width * 23 / 100, height: 54, alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <TouchableHighlight onPress={this.handleRemove(item)} underlayColor="white">
                                                <View style={{ height: 28, width: 28, backgroundColor: "#FF8A65", borderRadius: 50, marginBottom: 4 }}>
                                                    <Text style={{ color: 'white', fontSize: 18, marginLeft: 6, marginTop: 3, }}> {item.qty}</Text>
                                                </View>
                                            </TouchableHighlight>
                                            <Text style={{ fontSize: 12 }}>{item.menu.name}</Text>
                                        </View>
                                    ))}
                                </ScrollView>
                                <View style={{ width: 50, height: 50, marginRight: 10, marginLeft: 4 }} >
                                    <View style={{ height: 48, width: 48, backgroundColor: "#FF8A65", borderRadius: 50 }}>

                                        {this.state.onloading === 0 &&
                                            <TouchableHighlight onPress={() => this.confirm()} underlayColor="transparent">
                                                <Image
                                                    style={{ width: 34, height: 34, marginLeft: 7, marginTop: 5 }}
                                                    source={require('../../assets/image/bill.png')}
                                                />
                                            </TouchableHighlight>
                                        }
                                        {this.state.onloading > 0 &&
                                            <ActivityIndicator
                                                color="#FFFFFF"
                                                animating={true}
                                                style={{ marginTop: 6 }}
                                                size="large"
                                            />
                                        }
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        menus: state.menus,
        addmenus: state.addmenus
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getData: () => dispatch(actionMenus.getData()),
        addMenus: (value) => dispatch(addMenus.addMenus(value)),
        removeMenu: (id) => dispatch(addMenus.removeMenu(id)),
        addOrder: (value) => dispatch(addMenus.addOrder(value)),
        updateQty: (value) => dispatch(addMenus.updateQty(value)),
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    card: {
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    },
    row: {
        padding: 5,
        marginBottom: 5,
        backgroundColor: 'skyblue',
    },
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);