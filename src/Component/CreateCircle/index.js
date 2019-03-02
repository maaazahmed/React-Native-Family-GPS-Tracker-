import React, { Component } from "react"
import { View, Text, TouchableOpacity, TextInput } from "react-native"
import styles from "./style"
import { connect } from "react-redux"
import firebase from "react-native-firebase"


const database = firebase.database().ref("/")
class CreataCircle extends Component {
    static navigationOptions = {
        title: "Create Circle",
        headerStyle: { backgroundColor: '#e91e8d' },
        headerTitleStyle: { color: '#fff', fontSize: 14 },
        headerTintColor: '#ffffff',
    }
    constructor() {
        super()
        this.state = {
            circleName: ""
        }
        this.creataCircle = this.creataCircle.bind(this)
    }


    creataCircle() {
        // console.log(currentUser.uid)
        // console.log(this.props.currentUser.currentUser)
        const currentUser = this.props.currentUser.currentUser;
        const obj = {
            circleName: this.state.circleName
        }
        if (obj.circleName !== "") {
            database.child(`Circle/${currentUser.uid}`).push(obj)
            this.setState({
                circleName: ""
            })
        }
        else {
            alert("Please inter Circle name !")
        }
    }


    render() {
        return (
            <View style={styles.container} >
                <View style={styles.content} >
                    <View style={styles.TextInputContainer} >
                        <Text style={styles.titleText} >Enter your circle name</Text>
                        <View style={styles.TextInputView}>
                            <TextInput
                                value={this.state.circleName}
                                onChangeText={(circleName) => this.setState({ circleName })}
                                placeholder="Enter circle name"
                                placeholderTextColor={"#9b9b9b"}
                                style={styles.TextInput} />
                        </View>
                    </View>
                    <View style={styles.buttonContainer} >
                        <TouchableOpacity
                            onPress={this.creataCircle}
                            activeOpacity={.5}
                            style={styles.TouchableOpacity} >
                            <Text style={styles.createText} >CREATE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}


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

export default connect(mapStateToProp, mapDispatchToProp)(CreataCircle)
