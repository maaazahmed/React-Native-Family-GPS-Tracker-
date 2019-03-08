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
import styles from "./Style"




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
    let addLocations = []
    let AddedPeopleLocation = this.props.navigation.state.params.item.AddedPeople
    for (var lid in AddedPeopleLocation) {
      addLocations.push({ ...AddedPeopleLocation[lid], lid })
    }
    database.child(`Locations/`).on("value", async (snap) => {
      var cordsArr = []
      const cords = snap.val()
      for (var id in cords) {
        cordsArr.push({ ...cords[id] })
      }
      let filterdData = cordsArr.filter(item => addLocations.some(other => item.circleID === other.key));
      this.setState({
        coordinates: filterdData
      })

    })
    setTimeout(() => {
      this.setState({
        isMapLoading: false
      })
    }, 1500)
  }

  render() {
    const arr = this.state.coordinates
    return (
      <View style={styles.container}>
        {(this.state.isMapLoading) ?
          <View style={styles.loadingContainer} >
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
                <View style={styles.markerContainer} >
                  <ImageBackground
                    source={flagPinkImg}
                    style={styles.ImageBackground} >
                    <Image
                      source={{ uri: val.pic || "http://conferenceoeh.com/wp-content/uploads/profile-pic-dummy.png" }}
                      style={styles.Image}
                    />
                  </ImageBackground>
                  <Text style={{ color: "#e91e8d" }} >{val.name}</Text>
                </View>
              </Marker.Animated>
            ))}
          </MapView>}
      </View>
    );
  }
}


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






























