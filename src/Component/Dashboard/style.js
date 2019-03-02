import { Dimensions, StyleSheet } from "react-native"


const { width } = Dimensions.get("window")
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',

    },

    bottomContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
    },
    TouchableOpacity: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e91e8d",
        flexDirection: "row"
    },
    createText: {
        color: "#fff",
        marginLeft: 5, fontWeight: "300"
    },
    headerRightButonContainer: {
        marginRight: 10,
        // flexDirection: "row", width: 80,
        alignItems: "center",
        justifyContent: "space-around"
    },
    listContainer: {
        height: 70,
        width,
        borderBottomColor: "#9b9b9b",
        borderBottomWidth: 1,
        flexDirection: "row",
    },
    listContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
        flex: 1
    },
    listText: {
        color: "#3e3e3e",
        fontSize: 15
    }
});

