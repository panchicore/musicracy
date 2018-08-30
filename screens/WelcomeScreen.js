import React from 'react'
import {StyleSheet, TextInput, Text, KeyboardAvoidingView} from 'react-native'
import {Button} from 'react-native-elements'
import {Constants} from 'expo'
import {updateUser, enterChannel} from "../redux/actions";
import {connect} from "react-redux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
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
    err: {
        color: 'red',
        fontSize:20
    },
    button: {
        borderRadius: 3,
        padding: 10,
        marginTop:10
    }

});

class WelcomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Welcome'
    };

    state = {
        number: '',
        err: '',
        isFetching: false
    };

    componentDidMount(){

        if (this.props.channels.currentChannel) {
            this.props.navigation.navigate('Channel');
        }
    }

    componentWillReceiveProps(nextProps) {
        this.state.err = nextProps.channels.err;
        this.state.isFetching = nextProps.channels.isFetching;

        if (nextProps.channels.currentChannel) {
            this.props.navigation.navigate('Channel');
        }
    }

    handleEnter = async () => {
        this.props.enterChannel(this.state.number);
    };

    handleNumberUpdate = number => {
        this.setState({err: undefined});
        this.setState({number});
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">

                <Text style={{fontSize: 16}}>Hi {this.props.user.username}!</Text>

                <Text style={{fontSize: 22}}>Welcome to Musicracy</Text>

                <Text style={styles.err}>{this.state.err}</Text>

                <TextInput
                    placeholder="Channel name"
                    style={styles.input}
                    onChangeText={this.handleNumberUpdate}
                    keyboardType="number-pad"
                />
                <Button
                    title="Enter"
                    onPress={this.handleEnter}
                    buttonStyle={styles.button}
                    loading={this.state.isFetching}
                />

                <Button title="Create a channel"
                        buttonStyle={styles.button}
                        onPress={() => {
                            this.props.navigation.navigate('CreateChannel')
                        }}
                />


            </KeyboardAvoidingView>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user,
    channels: state.channels,
});

export default connect(mapStateToProps, {updateUser, enterChannel})(WelcomeScreen)

