import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import firebase from "react-native-firebase"
import { crrentUserAction } from "../../store/action/action"
import { connect } from "react-redux"
import styles from "./style"


const database = firebase.database().ref()
 class SignIn extends Component {
    static navigationOptions = {
        title: 'Sign In',
        headerStyle: { backgroundColor: '#e91e8d' },
        headerTitleStyle: { color: '#fff', fontSize: 14 },
        headerTintColor: '#ffffff',
    }
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            isLoader: false
        }
    }

    SignIn() {
        const { email, password } = this.state
        if (password !== "" && email !== "") {
            this.setState({
                isLoader: true
            })
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((res) => {
                    database.child(`Users/${res.user._user.uid}/`).once("value", async (snapshoot) => {
                        let currentUser = snapshoot.val()
                        currentUser.uid = snapshoot.key;
                        await this.props.crrentUserAction(currentUser)
                        await this.props.navigation.navigate("Dashboard")
                        await this.setState({
                            isLoader: false
                        })
                    })
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    alert(errorMessage)
                    this.setState({
                        isLoader: false
                    })
                })
        }
        else {
            alert("All Feilds are required !")
        }
    }


    render() {
        const { email, password } = this.state
        return (
            <View style={styles.container}>
                <View style={[styles.TextInputView, styles.marginTop]} >
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={(email) => this.setState({ email })}
                        style={[styles.TextInput, {}]} />
                </View>
                <View style={[styles.TextInputView, styles.marginTop]} >
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Password"
                        value={password}
                        onChangeText={(password) => this.setState({ password })}
                        style={[styles.TextInput, {}]} />
                </View>
                <View style={styles.buttonView} >
                    {(this.state.isLoader) ?
                        <ActivityIndicator size="large" color="#e91e8d" />
                        :
                        <TouchableOpacity onPress={this.SignIn.bind(this)} activeOpacity={.5} style={styles.button} >
                            <Text style={styles.buttonText} >SIGN IN</Text>
                        </TouchableOpacity>}
                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("SignUp")}
                    style={{ marginTop: 10 }} >
                    <Text style={{ color: "#e91e8d", fontSize: 12 }} >Don't have an accunt !</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


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

export default connect(mapStateToProp, mapDispatchToProp)(SignIn)
