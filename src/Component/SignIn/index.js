// 1242 × 2688
// import React, { Component } from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//     TextInput,
//     TouchableOpacity,
//     ActivityIndicator
// } from 'react-native';
// import firebase from "react-native-firebase"
// import { crrentUserAction } from "../../store/action/action"
// import { connect } from "react-redux"
// import styles from "./style"


// const database = firebase.database().ref()
//  class SignIn extends Component {
//     static navigationOptions = {
//         title: 'Sign In',
//         headerStyle: { backgroundColor: '#e91e8d' },
//         headerTitleStyle: { color: '#fff', fontSize: 14 },
//         headerTintColor: '#ffffff',
//     }
//     constructor() {
//         super()
//         this.state = {
//             email: "",
//             password: "",
//             isLoader: false
//         }
//     }

//     SignIn() {
//         const { email, password } = this.state
//         if (password !== "" && email !== "") {
//             this.setState({
//                 isLoader: true
//             })
//             firebase.auth().signInWithEmailAndPassword(email, password)
//                 .then((res) => {
//                     database.child(`Users/${res.user._user.uid}/`).once("value", async (snapshoot) => {
//                         let currentUser = snapshoot.val()
//                         currentUser.uid = snapshoot.key;
//                         await this.props.crrentUserAction(currentUser)
//                         await this.props.navigation.navigate("Dashboard")
//                         await this.setState({
//                             isLoader: false
//                         })
//                     })
//                 })
//                 .catch((error) => {
//                     var errorMessage = error.message;
//                     alert(errorMessage)
//                     this.setState({
//                         isLoader: false
//                     })
//                 })
//         }
//         else {
//             alert("All Feilds are required !")
//         }
//     }


//     render() {
//         const { email, password } = this.state
//         return (
//             <View style={styles.container}>
//                 <View style={[styles.TextInputView, styles.marginTop]} >
//                     <TextInput
//                         placeholder="Email"
//                         value={email}
//                         onChangeText={(email) => this.setState({ email })}
//                         style={[styles.TextInput, {}]} />
//                 </View>
//                 <View style={[styles.TextInputView, styles.marginTop]} >
//                     <TextInput
//                         secureTextEntry={true}
//                         placeholder="Password"
//                         value={password}
//                         onChangeText={(password) => this.setState({ password })}
//                         style={[styles.TextInput, {}]} />
//                 </View>
//                 <View style={styles.buttonView} >
//                     {(this.state.isLoader) ?
//                         <ActivityIndicator size="large" color="#e91e8d" />
//                         :
//                         <TouchableOpacity onPress={this.SignIn.bind(this)} activeOpacity={.5} style={styles.button} >
//                             <Text style={styles.buttonText} >SIGN IN</Text>
//                         </TouchableOpacity>}
//                 </View>
//                 <TouchableOpacity
//                     onPress={() => this.props.navigation.navigate("SignUp")}
//                     style={{ marginTop: 10 }} >
//                     <Text style={{ color: "#e91e8d", fontSize: 12 }} >Don't have an accunt !</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }


// const mapStateToProp = (state) => {
//     return ({

//     });
// };
// const mapDispatchToProp = (dispatch) => {
//     return {
//         crrentUserAction: (data) => {
//             dispatch(crrentUserAction(data))
//         },
//     }
// }

// export default connect(mapStateToProp, mapDispatchToProp)(SignIn)





































import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
    Easing,
    ImageBackground
} from 'react-native';
import firebase from "react-native-firebase"
import { crrentUserAction } from "../../store/action/action"
import { connect } from "react-redux"
import styles from "./style"
import Logo from "../../images/logo6.png"


const database = firebase.database().ref()
class SignIn extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            isLoader: false,
            logoTransformAnim: new Animated.Value(0),
            logoHeightAnim: new Animated.Value(0),
            formContainerAnimOpacity: new Animated.Value(0),
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


    componentDidMount() {
        this.logoTransformAnim()
        this.logoHeightAnim()
    }
    logoTransformAnim = () => {
        const { logoTransformAnim, logoHeightAnim } = this.state
        Animated.timing(logoTransformAnim, {
            toValue: .5,
            duration: 1000,
            easing: escape.linear
        }).start(() => {
            const logoHeightAnim_GO = Animated.timing(logoHeightAnim, {
                toValue: .5,
                duration: 1000,
                easing: Easing.linear
            })
            const logoHeightAnim_BACK = Animated.timing(logoHeightAnim, {
                toValue: 0,
                duration: 1000,
                easing: Easing.linear
            })
            const animations = Animated.sequence([logoHeightAnim_GO, logoHeightAnim_BACK])
            Animated.loop(animations).start()
        })
    }

    logoHeightAnim = () => {
        const { logoTransformAnim, logoHeightAnim, formContainerAnimOpacity } = this.state
        setTimeout(() => {
            Animated.timing(logoHeightAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }).start(() => {
                Animated.parallel([
                    Animated.timing(formContainerAnimOpacity, {
                        toValue: 1,
                        duration: 1000
                    }),
                    Animated.timing(logoTransformAnim, {
                        toValue: 1,
                        duration: 500,
                        easing: Easing.linear
                    })
                ]).start()
            })
        }, 5000)
    }



    render() {
        const { email, password, logoTransformAnim, logoHeightAnim, formContainerAnimOpacity } = this.state;
        let _logoTransformAnim = logoTransformAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [100, 270, 100]
        })
        let _logoSizeAnim = logoHeightAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [70, 85, 85]
        })
        const _formContainerAnimOpacity = formContainerAnimOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })
        return (
            <ImageBackground
                resizeMode={"stretch"}
                blurRadius={1}
                style={styles.ImageBackground}
                source={require("../../images/pahar.jpg")}  >
                <View style={styles.container}>
                    <View style={styles.content} >
                        <View style={{ flex: 1, }}>
                            <Animated.Image
                                resizeMode={"center"}
                                source={Logo}
                                style={[styles.AnimatedImage, {
                                    height: _logoSizeAnim,
                                    width: _logoSizeAnim,
                                    transform: [{ translateX: 0, }, { translateY: _logoTransformAnim }]
                                }]} />
                        </View>

                        <Animated.View style={{
                            alignItems: "center",
                            flex: 1,
                            opacity: _formContainerAnimOpacity,
                        }} >
                            <View style={[styles.TextInputView, styles.marginTop]} >
                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor="#fff"
                                    value={email}
                                    onChangeText={(email) => this.setState({ email })}
                                    style={[styles.TextInput, {}]} />
                            </View>
                            <View style={[styles.TextInputView, styles.marginTop]} >
                                <TextInput
                                    secureTextEntry={true}
                                    placeholder="Password"
                                    value={password}
                                    placeholderTextColor="#fff"
                                    onChangeText={(password) => this.setState({ password })}
                                    style={[styles.TextInput, {}]} />
                            </View>
                            <View style={styles.buttonView} >
                                {(this.state.isLoader) ?
                                    <ActivityIndicator size="large" color="#e91e8d" />
                                    :
                                    <TouchableOpacity
                                        onPress={this.SignIn.bind(this)}
                                        activeOpacity={.5} style={styles.button} >
                                        <Text style={styles.buttonText} >SIGN IN</Text>
                                    </TouchableOpacity>}
                            </View>
                            <View style={styles.ORcontainer} >
                                <View style={styles.ORLine} />
                                <Text style={styles.ORText} >Or</Text>
                                <View style={styles.ORLine}  />
                            </View>
                            <View style={styles.signButtonView} >
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate("SignUp")}
                                    activeOpacity={.5}
                                    style={styles.SignUpbutton} >
                                    <Text style={styles.SignIpText} >SIGN UP</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </View>
                </View>
            </ImageBackground>
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

