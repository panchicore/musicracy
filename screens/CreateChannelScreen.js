import React from 'react'
import {Button, StyleSheet, TextInput, KeyboardAvoidingView, Text} from 'react-native'
import {Constants} from 'expo'
import {connect} from 'react-redux'
import {createChannel} from '../redux/actions'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AFF9C9',
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

class CreateChannelScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Create a channel'
        }
    };

    state = {
        name: ''
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.channels.currentChannel) {
            this.props.navigation.navigate('Channel')
        }
    }



    handleCreateChannel = async () => {
        console.log("handleCreateChannel", this.state.name);
        this.props.createChannel({name: this.state.name, username: this.props.user.username});
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">

                <Text>{this.props.err}</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={(name) => { this.setState({name}) }}
                    autoCapitalize={'none'} autoCorrect={false}
                />

                <Button
                    title="Create"
                    onPress={this.handleCreateChannel}/>

            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = state => ({
    err: state.channels.err,
    channels: state.channels,
    user: state.user,
});

export default connect(mapStateToProps, {createChannel})(CreateChannelScreen)
