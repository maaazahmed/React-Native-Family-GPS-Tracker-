import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    FlatList
} from 'react-native';
import styles from "./style"
import firebase from "react-native-firebase"
import { connect } from "react-redux"
import Icon from "react-native-vector-icons/MaterialIcons"
import { circleListAction } from "../../store/action/action"



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
                <View style={styles.headerRightButonContainer} >
                    <TouchableOpacity>
                        <Icon name="settings" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            )
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
            this.props.circleListAction(arr)
        })
    }
    render() {
        const circleList = this.props.circleList.circleList;
        return (
            <View style={[styles.container]} >
                <View style={styles.FlatListView} >
                    <FlatList
                        data={circleList}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate("MapContainer",{item})}
                                activeOpacity={0.5}
                                style={[styles.listContainer]}  >
                                <View style={styles.listContent} >
                                    <Text style={styles.listText} >{item.circleName}</Text>
                                    <Icon
                                        name={"keyboard-arrow-right"}
                                        size={30} color="#3e3e3e" />
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.key}
                    />
                </View>
                <View style={styles.bottomContainer} >
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("CreataCircle")}
                        activeOpacity={.5}
                        style={[styles.TouchableOpacity]} >
                        <Icon name="add-circle" size={25} color="#fff" />
                        <Text style={styles.createText} >Create Circle</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}



const mapStateToProp = (state) => {
    return ({
        currentUser: state.root,
        circleList: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        circleListAction: (data) => {
            dispatch(circleListAction(data))
        },
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Dashboard)
