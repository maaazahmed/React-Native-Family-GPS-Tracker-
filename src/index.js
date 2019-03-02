import React, { Component } from 'react'
import {
  Animated,
  Easing
} from 'react-native'
import { createStackNavigator, createAppContainer } from "react-navigation";

import {
  SignUp,
  SignIn,
  Dashboard,
  Splash,
  CreataCircle,
  ImageOverlayWithURL
} from "./Component/index"



const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 650,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene, index, scenes } = sceneProps
      const toIndex = index
      const thisSceneIndex = scene.index
      const height = layout.initHeight
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      })

      // Since we want the card to take the same amount of time
      // to animate downwards no matter if it's 3rd on the stack
      // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
      const translateY = position.interpolate({
        inputRange: [0, thisSceneIndex],
        outputRange: [height, 0]
      })

      const slideFromRight = { transform: [{ translateX }] }
      const slideFromBottom = { transform: [{ translateY }] }

      const lastSceneIndex = scenes[scenes.length - 1].index

      // Test whether we're skipping back more than one screen
      if (lastSceneIndex - toIndex > 1) {
        // Do not transoform the screen being navigated to
        if (scene.index === toIndex) return
        // Hide all screens in between
        if (scene.index !== lastSceneIndex) return { opacity: 0 }
        // Slide top screen down
        return slideFromBottom
      }
      return slideFromRight
    },
  }
}






const AppNavigator = createStackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerLeft: null
    },
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      headerLeft: null
    },
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      headerLeft: null
    },
  },
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null
    },

  },
  CreataCircle: {
    screen: CreataCircle,
  },
  ImageOverlayWithURL: {
    screen: ImageOverlayWithURL,
  }
}, {
    initialRouteName: "ImageOverlayWithURL",
    transitionConfig,
  });

const AppNavigation = createAppContainer(AppNavigator);


export default AppNavigation