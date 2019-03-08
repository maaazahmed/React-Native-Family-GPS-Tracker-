import { StyleSheet, } from "react-native"




export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
    headerRightButonContainer: {
        marginRight: 10,
        alignItems: "center",
        justifyContent: "space-around"
    },
    markerContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    ImageBackground: {
        width: 50,
        height: 50,
        justifyContent: "center"
    },
    Image: {
        width: 30,
        marginBottom: 10,
        height: 30,
        borderRadius: 100, alignSelf: "center"
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        justifyContent: "center",
        alignItems: 'center',
    }
});



