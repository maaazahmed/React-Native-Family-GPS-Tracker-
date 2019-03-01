import { StyleSheet, Dimensions  } from "react-native"

const { width, height } = Dimensions.get("window")
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2"
    },
    content: {
        height: height / 3,
        width,
        justifyContent: "center",
    },
    TextInputContainer: {
        flex: 1,
        justifyContent: "flex-end"
    },
    titleText: {
        textAlign: "center",
        fontWeight: "500",
        color: "#3e3e3e"
    },
    TextInputView: {
        width: width / 1.5,
        alignSelf: "center",
        marginTop: 10
    },
    TextInput: {
        color: "#e91e8d",
        textAlign: "center",
        borderBottomColor: "#e91e8d",
        borderBottomWidth: 1.5
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center"
    },
    TouchableOpacity: {
        height: 40,
        width: width / 4,
        backgroundColor: "#e91e8d",
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 4,
    },
    createText: {
        textAlign: "center",
        color: "#fff"
    }
})


export default styles