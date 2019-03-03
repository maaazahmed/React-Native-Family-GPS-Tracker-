import { Dimensions, StyleSheet } from "react-native"


const { width } = Dimensions.get("window")
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',

    },

    bottomContainer: {
        height: 50,
        width
        
    },
    TouchableOpacity: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e91e8d",
        flexDirection: "row",
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
        height: 60,
        width,
        borderBottomColor: "#eff0f1",
        borderBottomWidth: 2,
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
    },
    FlatListView:{flex:1}

});

