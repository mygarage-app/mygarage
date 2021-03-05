import { StatusBar } from 'expo-status-bar';
//import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from 'firebase'

var firebaseConfig = { // TODO: Need to move to env variables to hide this from people
  apiKey: "AIzaSyBrhw2u0u-Lpfvc1wMsTtum_KY7n28PVaU",
  authDomain: "mygarage-95f8c.firebaseapp.com",
  projectId: "mygarage-95f8c",
  storageBucket: "mygarage-95f8c.appspot.com",
  messagingSenderId: "684151953020",
  appId: "1:684151953020:web:0335b09e59cb29543d5bf9",
  measurementId: "G-XNYYH3XVQY"
};

if(firebase.apps.length === 0)
{
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'


const Stack = createStackNavigator();

import React, { Component } from 'react'

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }

    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    
    if(!loaded){
      return(
        <View style = {{flex: 1, justifyContents: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator intialRouterName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    
    return(
      <View style = {{flex: 1, justifyContents: 'center'}}>
        <Text>User is Logged In</Text>
      </View>
    )

  }
}

export default App
