import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {Constants} from 'expo'
import {connect} from "react-redux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

class ChannelDetailsScreen extends React.Component {

    static navigationOptions = {
        title: 'People'
    };

    render() {

        return (
            <View style={styles.container}>
                <Text>People!</Text>

            </View>
        )
    }
}


const mapStateToProps = state => ({
    channels: state.channels,
    user: state.user,
});

export default connect(mapStateToProps)(ChannelDetailsScreen)