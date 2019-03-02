import { StyleSheet, Dimensions, } from "react-native"


const { width } = Dimensions.get("window")
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2"
    },
    listContaineer: {
        width,
        height: 100,
        borderBottomColor: "#9b9b9b",
        borderBottomWidth: 1,
        flexDirection: "row",
    },
    listImgeView: {
        width: 100,
        height: 99,
        justifyContent: "center"
    },
    Image: {
        width: 90,
        height: 90,
        alignSelf: "center",
        borderRadius: width
    },
    nameEmail: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    nametext: {
        fontWeight: "500",
        color: "#3e3e3e", fontSize: 15
    },
    email: {
        color: "#3e3e3e",
    },
    nameEmailView: {
        justifyContent: "center",
        flex: 1,
    },
    IconContainer: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    }
})