import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import styles from "./style"
import firebase from "react-native-firebase"
import { UserListAction } from "../../store/action/action"
import { connect } from "react-redux"


const database = firebase.database().ref("/")
class UserList extends Component {
    static navigationOptions = {
        title: 'Add People',
        headerStyle: { backgroundColor: '#e91e8d' },
        headerTitleStyle: { color: '#fff', fontSize: 14 },
        headerTintColor: '#fff',
    }

    componentDidMount() {
        database.child("Users").on("value", (snap) => {
            let arr = []
            let users = snap.val()
            for (var key in users) {
                arr.push({ ...users[key], key })
            }
            this.props.UserListAction(arr)
        })
    }


    render() {
        let userList = this.props.userList.userList
        return (
            <View style={styles.container}>
                <FlatList data={userList}
                    renderItem={({ item }) => (
                        <View style={styles.listContaineer}>
                            <View style={styles.listImgeView} >
                                <Image
                                    resizeMode="cover"
                                    style={styles.Image}
                                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpI5265EtpPkjBqJktStVkARbiCNap_IxsM2-aJC6GxuiKG96k" }} />
                            </View>
                            <View style={styles.nameEmail} >
                                <View style={styles.nameEmailView} >
                                    <Text style={styles.nametext} >{item.username}</Text>
                                    <Text style={styles.email} >{item.email}</Text>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    style={styles.IconContainer} >
                                    <Icon name="person-add"
                                        size={30}
                                        color="#e91e8d" />
                                </TouchableOpacity >
                            </View>

                        </View>
                    )} keyExtractor={(item) => { return item.key }} />

            </View>
        )
    }
}




const mapStateToProp = (state) => {
    return ({
        currentUser: state.root,
        userList: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        UserListAction: (data) => {
            dispatch(UserListAction(data))
        },
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(UserList)





