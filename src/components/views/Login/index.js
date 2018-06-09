import React, { Component } from 'react';
import {  StyleSheet, Text, View, Button } from 'react-native';

import LoadTabs from "../Tabs"

class Login extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <Button
          title="Go to home"
          onPress = {()=>{
            LoadTabs();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop: 20,

  }
});

export default Login;
