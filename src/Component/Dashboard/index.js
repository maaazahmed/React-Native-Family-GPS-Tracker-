import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native';
import firebase from "react-native-firebase"
import { connect } from "react-redux"
import Icon from "react-native-vector-icons/MaterialIcons"



const { width } = Dimensions.get("window")
const database = firebase.database().ref("/")
class Dashboard extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Home',
            headerStyle: { backgroundColor: '#e91e8d' },
            headerTitleStyle: { color: '#fff', fontSize: 14 },
            headerTintColor: '#e91e8d',
            headerRight: (
                <View style={{
                    marginRight: 10, flexDirection: "row", width: 80,
                    alignItems: "center",
                    justifyContent: "space-around"
                }} >
                    <TouchableOpacity onPress={() => navigation.navigate("UserList")} >
                        <Icon name="group-add" size={30} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="settings" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
            )
        }
    }
    constructor() {
        super()
        this.state = {
        }
    }

    componentDidMount() {
        const currentUser = this.props.currentUser.currentUser
        database.child(`Circle/${currentUser.uid}`).on("value", (snap) => {
            let arr = []
            let users = snap.val()
            for (var key in users) {
                arr.push({ ...users[key], key })
            }
        })
    }


    render() {
        return (
            <View style={[styles.container]} >
                <View style={{
                    height: 70,
                    width,
                    borderBottomColor: "#9b9b9b",
                    borderBottomWidth: 1,
                    flexDirection: "row",
                }}  >
                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, alignItems: "center",  flex:1 }} >
                        <Text style={{ color: "#3e3e3e", fontSize: 15 }} >Famely</Text>
                        <Icon name={"keyboard-arrow-right"} size={30} color="#3e3e3e" />
                    </View>
                </View>
                <View style={styles.bottomContainer} >
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("CreataCircle")}
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
