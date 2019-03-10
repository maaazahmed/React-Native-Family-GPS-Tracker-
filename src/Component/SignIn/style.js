import { StyleSheet, } from "react-native"



const styles = StyleSheet.create({
    ImageBackground: {
        flex: 1,
        justifyContent: "center"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "rgba(233, 30, 141, .6)"
    },
    content: {
        flex: 1,
        justifyContent: "flex-end",
    },
    AnimatedImage: {
        alignSelf: "center",
        position: "absolute",
        zIndex: 1,
    },
    TextInputView: {
        height: 50,
        width: "85%"
    },
    TextInput: {
        color: "#fff",
        flex: 1,
        fontSize: 12,
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        padding: 3

    },
    buttonView: {
        height: 45,
        width: "85%",
        marginTop: 20,
        justifyContent: "center",
        // marginBottom:5
    },
    button: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2
    },
    buttonText: {
        color: "#e91e8d",
        fontSize: 12,
    },
    marginTop: {
        marginTop: 20
    },
    signButtonView: {
        height: 45,
        width: "85%",
        // marginTop: 20,
        justifyContent: "center",
        // marginBottom:5
    },
    SignUpbutton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        borderColor: "#fff",
        borderWidth: 1,
    },
    SignIpText: {
        fontSize: 12,
        color: "#fff"
    },
    ORcontainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: "70%", alignItems: "center",
        marginTop: 10,
        marginBottom: 10
    },
    ORLine: {
        height: .5,
        flex: 1,
        backgroundColor: "#fff"
    },
    ORText:{ width: 50,
         textAlign: "center", 
         color: "#fff" }
});

export default styles