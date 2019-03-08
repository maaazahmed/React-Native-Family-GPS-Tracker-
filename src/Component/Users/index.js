import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import styles from "./style"
import firebase from "react-native-firebase"
import { UserListAction, addedUserAction, showUsersAction } from "../../store/action/action"
import { connect } from "react-redux"


const database = firebase.database().ref("/")
class UserList extends Component {
    static navigationOptions = {
        title: 'Add People',
        headerStyle: { backgroundColor: '#e91e8d' },
        headerTitleStyle: { color: '#fff', fontSize: 14 },
        headerTintColor: '#fff',
    }
    async componentWillMount() {
        const currentUser = this.props.currentUser.currentUser;
        const circleList = this.props.navigation.state.params;
        await database.child("Users").on("value", async (snap) => {
            let allUser = []
            let users = snap.val()

            for (var key in users) {
                if (key !== currentUser.uid)
                    allUser.push({ ...users[key], key })
            }
            await this.props.UserListAction(allUser)
        })
        await database.child(`Circle/${currentUser.uid}/${circleList.key}/AddedPeople/`).on("value", async (some) => {
            let addedUser = []
            var obj = some.val()
            for (var id in obj) {
                addedUser.push({ ...obj[id] })
            }
            await this.props.addedUserAction(addedUser)
        })
    }

    addUser(data) {
        const circleList = this.props.navigation.state.params;
        const currentUser = this.props.currentUser.currentUser;
        database.child(`Circle/${currentUser.uid}/${circleList.key}/AddedPeople/${data.key}`).set(data)
    }

    render() {
        const { addedUser, userList } = this.props._users;
        let filterdData = userList.filter(item => !addedUser.some(other => item.key == other.key));
        return (
            <View style={styles.container}>
                {/* {(filterdData.length < 0) ?
                    <View style={{ justifyContent: "center", flex: 1, aligenItems:"center", backgroundColor:"#f2f2f2" }} >

                    </View>
                    :  */}
                    <FlatList data={filterdData}
                        renderItem={({ item }) => {
                            return (
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
                                            onPress={this.addUser.bind(this, item)}
                                            activeOpacity={0.5}
                                            style={styles.IconContainer} >
                                            <Icon name="person-add"
                                                size={30}
                                                color="#e91e8d" />
                                        </TouchableOpacity >
                                    </View>
                                </View>
                            )
                        }} keyExtractor={(item) => { return item.key }} />

            </View>
        )
    }
}




const mapStateToProp = (state) => {
    return ({
        currentUser: state.root,
        userList: state.root,
        _users: state.root,
        _showUsers: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        UserListAction: (data) => {
            dispatch(UserListAction(data))
        },
        addedUserAction: (data) => {
            dispatch(addedUserAction(data))
        },
        showUsersAction: (data) => {
            dispatch(showUsersAction(data))
        },
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(UserList)





