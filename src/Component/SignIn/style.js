import { StyleSheet } from "react-native"



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    TextInputView: {
        height: 50,
        width: "95%"
    },
    TextInput: {
        flex: 1,
        fontSize: 13,
        borderColor: "#e91e8d",
        borderWidth: 1,
        borderRadius: 3,
        padding: 5

    },
    buttonView: {
        height: 50,
        width: "95%", marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        height: 50,
        width: "50%",
        backgroundColor: "#e91e8d",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3
    },
    buttonText: {
        color: "#fff"
    },
    marginTop: {
        marginTop: 20
    }
});

export default styles