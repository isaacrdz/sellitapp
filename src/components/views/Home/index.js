import React, { Component } from 'react';
import {  StyleSheet, Text, View } from 'react-native';

import { navigatorDrawer } from '../../utils/misc';

class Home extends Component{

  constructor(props){
    super(props);

    this.props.navigator.setOnNavigatorEvent((event)=>{
      navigatorDrawer(event, this)
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default Home;
