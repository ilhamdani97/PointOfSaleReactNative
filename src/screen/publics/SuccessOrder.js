import React, {Component} from 'react'
import {Image,Text,View} from 'react-native'
import { Appbar, Button } from 'react-native-paper';
class SuccessOrder extends Component {
    render(){
        return(
            <View style={{alignContent:'center',alignItems:'center'}}>
                <Image
                                style={{ width: 150, height: 150 , marginTop:120}}
                                source={require('../../assets/image/victory.png')}
                            />
                <Text style={{ textAlign: 'right', fontSize: 19, color: '#616161',marginTop:20 }}>Please Bring This To The Casir, Thank's</Text>
                <Button style={{ height: 40, borderRadius: 25, backgroundColor: '#FF8A65',marginTop:20 }} color="black" mode="contained" onPress={() => this.props.navigation.navigate('Home')}
                        >
                            <Text style={{marginTop:8,fontSize:18}}>Go To Home</Text>
                        </Button>
            </View>
        )
    }
}
export default SuccessOrder