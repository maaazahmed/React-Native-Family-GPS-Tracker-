import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    ImageBackground,
    PermissionsAndroid,
    BackHandler,
    DeviceEventEmitter
} from 'react-native';
import MapView, { MarkerAnimated, Marker } from 'react-native-maps';
import flagPinkImg from "../../images/location-icon.png";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";



const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0.0922;
const LONGITUDE = 0.0421;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class ImageOverlayWithURL extends Component {

    static propTypes = {
        provider: MapView.ProviderPropType,
    };

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
        };
    }


    componentDidMount() {
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h6 style='color: #3e3e3e'>Use Location ?</h6>This app wants to change your device settings:<br/>Use GPS for location",
            ok: "YES",
            cancel: "NO",
            enableHighAccuracy: true,
        }).then((success) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // console.log(position, "Aslam Khan")
                    this.setState({
                        region: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }
                    })
                },
                (error) => { console.log(error) },
                {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 10000
                }
            )
            // console.log(success); // success => "enabled"
        }).catch((error) => {
            console.log(error); // success => "enabled"
        })

    }

    render() {
        const arr = [
            {
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
                pic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpI5265EtpPkjBqJktStVkARbiCNap_IxsM2-aJC6GxuiKG96k"
            },
            {
                latitude: 24.8817609,
                longitude: 67.0648878,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
                pic:"https://avatars2.githubusercontent.com/u/31310451?s=460&v=4"
            }
        ]
        return (
            <View style={styles.container}>
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    initialRegion={this.state.region}>
                    {arr.map((val, ind) => (
                        <MarkerAnimated
                            key={ind}
                            title="Maaz Ahmed"
                            loadingEnabled
                            loadingIndicatorColor="green"
                            loadingBackgroundColor="red"
                            // coordinate={this.state.region}
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
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
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
});