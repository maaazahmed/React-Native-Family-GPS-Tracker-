import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import styles from "./style"
import firebase, { config } from "react-native-firebase"
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
        // data.circleKey = circleList.key

        database.child(`Circle/${currentUser.uid}/${circleList.key}/AddedPeople/${data.key}`).set(data)
        database.child(`Users/${data.key}/frindes/`).on("value", (sna) => {
            console.log(sna.val())
        })
        // database.child(`Users/${data.key}/frindes/`).set([{ isFriend: true, uid: currentUser.uid }])
    }

    render() {
        const { addedUser, userList } = this.props._users;
        const sum = addedUser.concat(userList)
        // var a = userList.map((el, i) => {
        //     console.log(Object.values(el)[3])
        // })

        // var b = addedUser.map((el, i) => {
        //     console.log(Object.values(el)[2], "-----------")
        // })

        // // console.log(a, "A")

        var newArr = []
        for (var i = 0; i < userList.length; i++) {
            var isSameId;
            for (var j = 0; j < addedUser.length; j++) {
                if (addedUser[j].key === userList[i].key) {
                    isSameId = true
                }
            }
            if (!isSameId) {
                newArr.push(userList[i])
            }
        }

        return (
            <View style={styles.container}>
                <FlatList data={newArr}
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
            console.log(data, "DATA")
            dispatch(showUsersAction(data))
        },
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(UserList)





