import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import firebase from "react-native-firebase"
import { connect } from "react-redux"
import Icon from "react-native-vector-icons/MaterialIcons"



const database = firebase.database().ref("/")
class Dashboard extends Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: { backgroundColor: '#e91e8d' },
        headerTitleStyle: { color: '#fff', fontSize: 14 },
        headerTintColor: '#e91e8d',
    }

    constructor() {
        super()
        this.state = {
        }
    }
    render() {
        return (
            <View style={[styles.container, {}]} >
                <View style={styles.bottomContainer} >
                    <TouchableOpacity
                        activeOpacity={.5}
                        style={styles.TouchableOpacity} >
                        <Icon name="add-circle" size={25} color="#fff" />
                        <Text style={styles.createText} >Create Circle</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',

    },

    bottomContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
    },
    TouchableOpacity: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e91e8d",
        flexDirection: "row"
    },
    createText: {
        color: "#fff",
        marginLeft: 5, fontWeight: "300"
    }
});





const mapStateToProp = (state) => {
    return ({
        currentUser: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        // crrentUserAction: (data) => {
        //     dispatch(crrentUserAction(data))
        // },
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Dashboard)
