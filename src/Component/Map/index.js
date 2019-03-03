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
    Text
} from 'react-native';
import MapView, { MarkerAnimated, Marker } from 'react-native-maps';
import flagPinkImg from "../../images/location-icon.png";


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 24.8817609;
const LONGITUDE = 67.0648878;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;
export default class ImageOverlayWithURL extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Locations',
            headerStyle: { backgroundColor: '#e91e8d' },
            headerTitleStyle: { color: '#fff', fontSize: 14 },
            headerTintColor: '#fff',
            headerRight: (
                <View style={styles.headerRightButonContainer} >
                    <TouchableOpacity>
                        <Icon name="settings" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            )
        }
    }

    constructor(props) {
        super(props);
        this.state = {
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
        navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    },
                })
                setTimeout(() => {
                    this.setState({
                        isMapLoading: false
                    })
                }, 1500)
            },
            (error) => { console.log(error) },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 10000
            }
        )

    }

    render() {
        console.log(this.state.region)
        const arr = [
            {
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
                pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpI5265EtpPkjBqJktStVkARbiCNap_IxsM2-aJC6GxuiKG96k"
            },
            {
                latitude: 24.8817609,
                longitude: 67.0648878,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
                pic: "https://avatars2.githubusercontent.com/u/31310451?s=460&v=4"
            }
        ]
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
                            <MarkerAnimated
                                key={ind}
                                title="Maaz Ahmed"
                                loadingEnabled
                                loadingIndicatorColor="green"
                                loadingBackgroundColor="red"
                                coordinate={{
                                    latitude: val.latitude,
                                    longitude: val.longitude,
                                }}>
                                <ImageBackground
                                    source={flagPinkImg}
                                    style={{ width: 85, height: 85, justifyContent: "center" }} >
                                    <Image
                                        source={{ uri: val.pic }}
                                        style={{ width: 30, marginBottom: 10, height: 30, borderRadius: 100, alignSelf: "center" }}
                                    />
                                </ImageBackground>
                            </MarkerAnimated>
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