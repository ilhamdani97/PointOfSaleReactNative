import React, { Component } from 'react';
import { Paragraph, Button, Appbar } from 'react-native-paper';
import { StyleSheet, TouchableHighlight, View, StatusBar ,Dimensions} from 'react-native';
import { Icon } from 'react-native-elements'

class StartAccount extends Component {
  static navigationOptions = {
    headerTintColor: '#FF9800',
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0,
    },
  };
  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <Appbar.Header style={{ backgroundColor: 'transparent' }}>
          <Appbar.BackAction color="black"
            onPress={() => this.props.navigation.goBack()}
          />
        </Appbar.Header>
          <Button style={styles.padding} color="#2196F3" mode="contained" onPress={() => this.props.navigation.navigate('Login')}>
            <Paragraph style={{ color: 'white' }}>Login</Paragraph>
          </Button>
          <Button style={styles.padding1} color="#2196F3" mode="outlined" onPress={() => this.props.navigation.navigate('Register')}>
            <Paragraph style={{ color: '#2196F3' }}>Register</Paragraph>
          </Button>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  padding0: {
    marginTop: 30,
    textAlign: 'center',
    borderRadius: 20,
  },
  padding: {
    padding: 8,
    marginTop: 60,
    textAlign: 'center',
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    elevation: 0,
    justifyContent: 'center'
  },
  padding1: {
    padding: 8,
    marginTop: 20,
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    borderColor: '#2196F3',
    elevation: 0
  },
  button: {
    borderRadius: 20,
    padding: 8,
    marginTop: 30,
    textAlign: 'center',
    textDecorationColor: "black",


  },
  image: {

    height: 180,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
  }
})


export default StartAccount