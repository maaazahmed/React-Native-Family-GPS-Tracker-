import React, { Component } from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import firebase from "react-native-firebase";
import { connect } from "react-redux"
import { crrentUserAction } from "../../store/action/action"




const database = firebase.database().ref("/")
class Splash extends Component {
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                database.child(`Users/${user.uid}/`).once("value", async (snapshoot) => {
                    let currentUser = snapshoot.val()
                    currentUser.uid = snapshoot.key;
                    // setTimeout(() => {
                    await this.props.crrentUserAction(currentUser)
                    await this.props.navigation.navigate("Dashboard")
                    // }, 1000)
                    //    await console.log(currentUser)
                })
            }
            else {
                setTimeout(() => {
                    this.props.navigation.navigate("SignIn")
                }, 1000)
            }
        })


    }
    render() {
        return (
            <View style={styles.constianer} >
                <ActivityIndicator size="large" color="#fff" />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    constianer: {
        flex: 1,
        backgroundColor: "#e91e8d",
        justifyContent: "center",
        alignItems: "center",
    }
})




const mapStateToProp = (state) => {
    return ({

    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        crrentUserAction: (data) => {
            dispatch(crrentUserAction(data))
        },
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Splash)
