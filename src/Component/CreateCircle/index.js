import React, { Component } from "react"
import { View, Text, TouchableOpacity, TextInput, Dimensions } from "react-native"
import styles from "./style"


class CreataCircle extends Component {
    static navigationOptions = {
        title: "Create Circle",
        headerStyle: { backgroundColor: '#e91e8d' },
        headerTitleStyle: { color: '#fff', fontSize: 14 },
        headerTintColor: '#ffffff',
    }
    render() {
        return (
            <View style={styles.container} >
                <View style={styles.content} >
                    <View style={styles.TextInputContainer} >
                        <Text style={styles.titleText} >Enter your circle name</Text>
                        <View style={styles.TextInputView}>
                            <TextInput
                                placeholder="Enter circle name"
                                placeholderTextColor={"#9b9b9b"}
                                style={styles.TextInput} />
                        </View>
                    </View>
                    <View style={styles.buttonContainer} >
                        <TouchableOpacity
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



export default CreataCircle
