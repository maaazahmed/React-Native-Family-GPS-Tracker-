
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux"
import store from "./src/store"
import AppNavigation from "./src/index"


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
           <AppNavigation />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({

});
