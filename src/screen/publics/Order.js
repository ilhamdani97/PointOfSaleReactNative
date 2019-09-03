import React, { Component } from 'react';
import { StyleSheet, Image, FlatList, ActivityIndicator, Text, Dimensions, TouchableOpacity, Share, ScrollView, TouchableHighlight } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { View } from 'native-base';
import { Card, Icon } from "react-native-elements";
import { connect } from 'react-redux';
import * as actionOrder from '../../redux/actions/orders';
import axios from "axios";
import { URLSTORE } from 'react-native-dotenv'

class Menu extends Component {
    static navigationOptions =
        {
            title: 'Order Detail',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#42A5F5'
            }
        };
    constructor(props) {
        super(props)
        params = props.navigation.state.params
        this.state = {
            Order: [],
            data: null,
            countOrder: 1,
            total: this.props.orders.data.orders
        };
    }

    // plusCount = () => {
    //     this.setState({
    //         countOrder: this.state.countOrder + 1
    //     })
    // }
    // minCount = () => {
    //     this.setState({
    //         countOrder: this.state.countOrder - 1
    //     })
    // }

    toRupiah = (price) => {
        let rupiah = '';
        let jumlah = (rupiah)
        let convert = price.toString().split('').reverse().join('');
        for (var i = 0; i < convert.length; i++) if (i % 3 == 0) jumlah += convert.substr(i, 3) + '.';
        return 'Rp. ' + jumlah.split('', jumlah.length - 1).reverse().join('');
    }
    componentDidMount() {
        this.props.getData(),
            this.state.total = this.props

    }
    async componentWillMount() {
        this.setState(
            { data: await this.props.orders.data }
        )
    }
    onCallBill = async () => {
        try {
            await axios({
                url: `${URLSTORE}truncate`,
                method: 'get'
            })
                .then((response) => {
                    this.props.navigation.navigate('SuccessOrder')
                })
                .catch((error) => {
                    console.log(error)
                });
        } catch{
            console.log('err')
        }
    }
    render() {
        const totalS = this.props.orders.data;
        const foodTotal = totalS.reduce((totalAll, total) => totalAll + total.price, 0);
        const service = foodTotal * 5.5 / 100
        const tax = foodTotal * 10 / 100
        const total = foodTotal + service + tax

        console.log(totalS)
        const { width, height } = Dimensions.get('window');
        if (this.props.orders.isLoading == true) {
            return (
                <ActivityIndicator
                color="#FF8A65"
                animating={true}
                style={styles.indicator}
                size="large"
            />
            );
        }
        // if (this.props.orders.data.length == 0) {
        //     return (
        //         <View>
        //         <Appbar.Header style={{ backgroundColor: 'transparent' }}>
        //                 <Appbar.BackAction color="#FF8A65"
        //                     onPress={() => this.props.navigation.navigate('Menu')}
        //                 />
        //         </Appbar.Header>
        //         <View style={{alignContent:'center',alignItems:'center'}}>
        //         <Image
        //                         style={{ width: 120, height: 120 , marginTop:120}}
        //                         source={require('../../assets/image/warning.png')}
        //                     />
        //         <Text style={{ textAlign: 'right', fontSize: 19, color: '#616161',marginTop:20 }}>Please Confirm Your's Order</Text>
                
        //     </View>
        //     </View>
        //     );
        // }
        return (
            <View style={{ backgroundColor: 'white', marginBottom: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                        <Appbar.BackAction color="#FF8A65"
                            onPress={() => this.props.navigation.navigate('Menu')}
                        />
                    </Appbar.Header>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ width: width * 50 / 100, height: 40, backgroundColor: '#FF8A65', borderBottomRightRadius: 40, borderTopRightRadius: 40, }} >
                            <Text style={{ color: '#FFFFFF', marginLeft: 10, marginTop: 5, fontSize: 22, fontWeight: 'bold' }}>Order Sumary</Text>
                        </View>
                        <View style={{ width: width * 30 / 100, height: 40, backgroundColor: '#FFFFFF', borderRadius: 40, marginLeft: 2, marginTop: 6 }} >

                        </View>
                    </View>
                    <View style={{ height: 200, marginTop: 6 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {this.props.orders.data.map((item, i) => (
                                <View key={i}>
                                    <View style={{ flex: 1, flexDirection: 'row', marginLeft: 10, marginTop: 10 }} >
                                        <View style={{ width: width * 8 / 100, height: 30, }}>
                                            <View style={{ borderWidth: 2, borderColor: '#FF8A65', marginTop: 16, height: 24, width: 24 }}>
                                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#757575', marginTop: 2, marginLeft: 6, marginRight: 2 }}>{item.qty}</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: width * 10 / 100, height: 30, marginTop: 20 }}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#757575' }}>X</Text>
                                        </View>
                                        <View style={{ width: width * 48 / 100, height: 30, marginLeft: 4, marginTop: 6 }} >
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#757575' }}>{item.menu_id.name}</Text>
                                            <Text style={{ fontSize: 16, color: '#757575' }}> Rp.{item.price}</Text>
                                        </View>
                                        <View style={{ width: width * 30 / 100, height: 30, marginTop: 14 }} >
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FF8A65' }}>{this.toRupiah(item.price)}</Text>
                                        </View>
                                    </View>
                                    <View style={{ borderWidth: 1, borderColor: '#9E9E9E', margin: 10, }} />
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={{ height: 200, borderColor: '#FF8A65', borderBottomLeftRadius: 70, borderTopLeftRadius: 70, borderWidth: 1, backgroundColor: '#F5F5F5' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ width: width * 64 / 100, height: 35, marginTop: 10 }}>
                                <Text style={{ textAlign: 'right', fontSize: 19, color: '#616161', }}>Sub Total</Text>
                            </View>
                            <View style={{ width: width * 30 / 100, height: 35, marginTop: 10, marginLeft:14 }} >
                                <Text style={{ textAlign: 'right',fontSize: 19, color: '#616161', }}>{this.toRupiah(foodTotal)}</Text>
                            </View>

                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ width: width * 64 / 100, height: 35, }}>
                                <Text style={{ textAlign: 'right', fontSize: 19, color: '#616161', }}>Discount</Text>
                            </View>
                            <View style={{ width: width * 30 / 100, height: 35, }} >
                                <Text style={{ fontSize: 19, color: '#616161', marginLeft:14 }}> - </Text>
                            </View>

                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ width: width * 64 / 100, height: 35, }}>
                                <Text style={{ textAlign: 'right', fontSize: 19, color: '#616161', }}>Service Charge (5.5 %)</Text>
                            </View>
                            <View style={{ width: width * 30 / 100, height: 35, }} >
                                <Text style={{textAlign: 'right', fontSize: 19, color: '#616161', marginLeft:14}}>{this.toRupiah(service)}</Text>
                            </View>

                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ width: width * 64 / 100, height: 35, }}>
                                <Text style={{ textAlign: 'right', fontSize: 19, color: '#616161', }}>Tax (10 %)</Text>
                            </View>
                            <View style={{ width: width * 30 / 100, height: 35, }} >
                                <Text style={{ textAlign: 'right',fontSize: 19, color: '#616161', marginLeft:14}}>{this.toRupiah(tax)}</Text>
                            </View>

                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ width: width * 64 / 100, height: 35, }}>
                                <Text style={{ textAlign: 'right', fontSize: 19, color: '#616161', fontWeight: 'bold' }}>Total</Text>
                            </View>
                            <View style={{ width: width * 30 / 100, height: 35, }} >
                                <Text style={{textAlign: 'right', fontSize: 19, color: '#616161', marginLeft:14}}>{this.toRupiah(total)}</Text>
                            </View>

                        </View>
                    </View>

                    <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 10 }}>
                        <Button style={{ height: 40, borderRadius: 25, backgroundColor: '#FF8A65' }} color="black" mode="contained" onPress={() => this.onCallBill()}
                        >
                            CALL BILL
                        </Button>
                    </View>
                </ScrollView>

            </View>
        );
        }
    
}

const mapStateToProps = state => {
    return {
        orders: state.orders
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getData: () => dispatch(actionOrder.getData()),
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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