import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Constants} from 'expo'
import {connect} from "react-redux";
import {Button} from 'react-native-elements'
import {exitChannel} from "../redux/actions"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 0,
        minWidth: 100,
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        width: 300,
        fontSize: 30,
        textAlign: 'center'
    },
});

class ChannelDetailsScreen extends React.Component {

    static navigationOptions = {
        title: 'Settings'
    };

    handleExit = () => {
        this.props.exitChannel(this.props.channels.currentChannel);
        this.props.navigation.navigate('Welcome');
    };

    render() {

        return (
            <View style={styles.container}>
                <Button onPress={this.handleExit} title="Exit" />
            </View>
        )
    }
}


const mapStateToProps = state => ({
    channels: state.channels,
    user: state.user,
});

export default connect(mapStateToProps, {exitChannel})(ChannelDetailsScreen)