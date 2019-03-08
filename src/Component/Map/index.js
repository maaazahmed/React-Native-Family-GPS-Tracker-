import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ImageBackground,
  PermissionsAndroid,
  BackHandler,
  DeviceEventEmitter,
  Text,
  TouchableOpacity
} from 'react-native';
import MapView, { MarkerAnimated, Marker } from 'react-native-maps';
import flagPinkImg from "../../images/log.png";
import Icon from "react-native-vector-icons/MaterialIcons"
import firebase from "react-native-firebase"
import { connect } from "react-redux"
import index from 'react-native-safe-area-view';
import { addedUserAction } from '../../store/action/action';


const database = firebase.database().ref("/")
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 24.8817609;
const LONGITUDE = 67.0648878;
const LATITUDE_DELTA = 0.100;
const LONGITUDE_DELTA = 0.100;
class ImageOverlayWithURL extends Component {

  static navigationOptions = ({ navigation }) => {
    const circleList = navigation.state.params.item
    return {
      title: navigation.state.params.item.circleName,
      headerStyle: { backgroundColor: '#e91e8d' },
      headerTitleStyle: { color: '#fff', fontSize: 14 },
      headerTintColor: '#fff',
      headerRight: (
        <View style={styles.headerRightButonContainer} >
          <TouchableOpacity onPress={() => navigation.navigate("UserList", circleList)} >
            <Icon name="group-add" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      )
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      coordinates: [],
      isMapLoading: true,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.setState({
        region: {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      })
    })
  }



  componentDidMount() {
    // console.log(this.props.navigation.state.params.item.key)
    // console.log(this.props.navigation.state.params.item.AddedPeople)
    let addLocations = []
    let AddedPeopleLocation = this.props.navigation.state.params.item.AddedPeople
    for (var lid in AddedPeopleLocation) {
      addLocations.push({ ...AddedPeopleLocation[lid], lid })
    }

    // navigator.geolocation.watchPosition(
    //   (position) => {
    //     // const currentUser = this.props.currentUser.currentUser
    //     // const obj = {
    //     //   name: currentUser.username,
    //     //   latitude: position.coords.latitude,
    //     //   longitude: position.coords.longitude,
    //     //   circleID: currentUser.uid
    //     // }
    //     console.log(obj, "--------")
        // database.child(`Locations/${currentUser.uid}`).set(obj)
        database.child(`Locations/`).on("value", async (snap) => {
          var cordsArr = []
          const cords = snap.val()
          for (var id in cords) {
            cordsArr.push({ ...cords[id] })
          }
          console.log(cordsArr, addLocations)


          // var newArr = []
          // for (var i = 0; i < cordsArr.length; i++) {
          //   var isSameId;
          //   for (var j = 0; j < addLocations.length; j++) {
          //     if (addLocations[j].key === cordsArr[i].circleID) {
          //       isSameId = true
          //     }
          //   }
          //   if (isSameId) {
          //     newArr.push(cordsArr[i])
          //   }
          // }
          let filterdData = cordsArr.filter(item => addLocations.some(other => item.circleID === other.key));
          console.log(filterdData, "New Data")
          this.setState({
            coordinates: filterdData
          })

        })
        setTimeout(() => {
          this.setState({
            isMapLoading: false
          })
        }, 1500)

    //   },
    //   (error) => { console.log(error) },
    //   {
    //     enableHighAccuracy: true,
    //     timeout: 20000,
    //     maximumAge: 10000
    //   }
    // )
  }

  render() {
    const arr = this.state.coordinates


    // console.log(arr)
    return (
      <View style={styles.container}>
        {(this.state.isMapLoading) ?
          <View style={{ flex: 1, backgroundColor: "#f2f2f2", justifyContent: "center", alignItems: 'center', }} >
            <Text >Loading...</Text>
          </View>
          :
          <MapView
            provider={this.props.provider}
            style={styles.map}
            showUserLocation
            followUserLocation
            loadingEnabled
            initialRegion={this.state.region}>
            {arr.map((val, ind) => (
              <Marker.Animated
                key={ind}
                title={val.name}
                loadingEnabled
                loadingIndicatorColor="green"
                loadingBackgroundColor="red"
                coordinate={{
                  latitude: val.latitude,
                  longitude: val.longitude,
                }}>
                <View style={{ justifyContent: "center", alignItems: "center" }} >
                  <ImageBackground
                    source={flagPinkImg}
                    style={{ width: 50, height: 50, justifyContent: "center" }} >
                    <Image
                      source={{ uri: val.pic || "http://conferenceoeh.com/wp-content/uploads/profile-pic-dummy.png" }}
                      style={{ width: 30, marginBottom: 10, height: 30, borderRadius: 100, alignSelf: "center" }}
                    />
                  </ImageBackground>
                  <Text style={{  color: "#e91e8d" }} >{val.name}</Text>
                </View>
              </Marker.Animated>
            ))}
          </MapView>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  headerRightButonContainer: {
    marginRight: 10,
    // flexDirection: "row", width: 80,
    alignItems: "center",
    justifyContent: "space-around"
  },
});





const mapStateToProp = (state) => {
  return ({
    currentUser: state.root,
  });
};
const mapDispatchToProp = (dispatch) => {
  return {
    circleListAction: (data) => {
      dispatch(circleListAction(data))
    },
  }
}

export default connect(mapStateToProp, mapDispatchToProp)(ImageOverlayWithURL)
































// import React from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Platform,
//   PermissionsAndroid
// } from "react-native";
// import MapView, {
//   Marker,
//   AnimatedRegion,
//   Polyline,
//   PROVIDER_GOOGLE
// } from "react-native-maps";
// import haversine from "haversine";


// const LATITUDE_DELTA = 0.009;
// const LONGITUDE_DELTA = 0.009;
// const LATITUDE = 10.7755;
// const LONGITUDE = 67.765;

// class AnimatedMarkers extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       latitude: LATITUDE,
//       longitude: LONGITUDE,
//       routeCoordinates: [],
//       distanceTravelled: 0,
//       prevLatLng: {},
//       coordinate: new AnimatedRegion({
//         latitude: LATITUDE,
//         longitude: LONGITUDE,
//         latitudeDelta: 0,
//         longitudeDelta: 0
//       })
//     };
//   }

//   componentDidMount() {
//     const { coordinate } = this.state;

//     this.requestCameraPermission();

//     this.watchID = navigator.geolocation.watchPosition(
//       position => {
//         const { routeCoordinates, distanceTravelled } = this.state;
//         const { latitude, longitude } = position.coords;

//         const newCoordinate = {
//           latitude,
//           longitude
//         };
//         console.log({ newCoordinate });

//         if (Platform.OS === "android") {
//           if (this.marker) {
//             this.marker._component.animateMarkerToCoordinate(
//               newCoordinate,
//               500
//             );
//           }
//         } else {
//           coordinate.timing(newCoordinate).start();
//         }

//         // this.setState({
//         //   latitude,
//         //   longitude,
//         //   routeCoordinates: routeCoordinates.concat([newCoordinate]),
//         //   distanceTravelled:
//         //     distanceTravelled + this.calcDistance(newCoordinate),
//         //   prevLatLng: newCoordinate
//         // });
//       },
//       error => console.log(error),
//       {
//         enableHighAccuracy: true,
//         timeout: 20000,
//         maximumAge: 1000,
//         distanceFilter: 10
//       }
//     );
//   }

//   componentWillUnmount() {
//     navigator.geolocation.clearWatch(this.watchID);
//   }

//   getMapRegion = () => ({
//     latitude: this.state.latitude,
//     longitude: this.state.longitude,
//     latitudeDelta: LATITUDE_DELTA,
//     longitudeDelta: LONGITUDE_DELTA
//   });

//   calcDistance = newLatLng => {
//     const { prevLatLng } = this.state;
//     return haversine(prevLatLng, newLatLng) || 0;
//   };

//   requestCameraPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: "Location Access Permission",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK"
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log("You can use the camera");
//       } else {
//         console.log("Camera permission denied");
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   render() {
//       console.log(this.getMapRegion(),"Maaz")
//     return (
//       <View style={styles.container}>
//         <MapView
//           style={styles.map}
//           provider={PROVIDER_GOOGLE}
//           showUserLocation
//           followUserLocation
//           loadingEnabled
//           region={this.getMapRegion()}
//         >
//           <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
//           <Marker.Animated
//             ref={marker => {
//               this.marker = marker;
//             }}
//             coordinate={this.state.coordinate}
//           />
//         </MapView>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={[styles.bubble, styles.button]}>
//             <Text style={styles.bottomBarContent}>
//               {parseFloat(this.state.distanceTravelled).toFixed(2)} km
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "flex-end",
//     alignItems: "center"
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject
//   },
//   bubble: {
//     flex: 1,
//     backgroundColor: "rgba(255,255,255,0.7)",
//     paddingHorizontal: 18,
//     paddingVertical: 12,
//     borderRadius: 20
//   },
//   latlng: {
//     width: 200,
//     alignItems: "stretch"
//   },
//   button: {
//     width: 80,
//     paddingHorizontal: 12,
//     alignItems: "center",
//     marginHorizontal: 10
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     marginVertical: 20,
//     backgroundColor: "transparent"
//   }
// });


// export default AnimatedMarkers