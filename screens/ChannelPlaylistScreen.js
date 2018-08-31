import React from 'react'
import {StyleSheet, View, Text, FlatList, Image, Clipboard, AppState} from 'react-native'
import {connect} from "react-redux";
import {Input, SearchBar} from 'react-native-elements'
import {Constants} from 'expo'
import {getPlaylistItems, sendVideoUrl} from '../redux/actions'
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Constants.statusBarHeight,
    },
    successMessage: {
        padding: 10,
        backgroundColor: '#AFF9C9',
        alignItems: 'center',
        textAlign: 'center'
    },
    errorMessage: {
        padding: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        textAlign: 'center'
    },
    playlistItem: {
        flex: 1
    },
    playlistItemBackgroundWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
    },
    playlistItemBackgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    playlistItemContentWrapper: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    playlistItemLeft: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playlistItemMiddle: {
        width: '80%'
    },
    playlistItemRight: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playlistItemMiddleTitle: {
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 30,
        paddingBottom: 10,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 1)',
         textShadowOffset: {width: 1, height: 1},
         textShadowRadius: 2
    },
    playlistItemMiddleUsername: {
        color: '#fff',
        fontSize: 10,
        textAlign: 'center',
        paddingBottom: 20
    },

});

class VoteIcon extends React.Component {
    state = {
        voteUpIconName: 'thumbs-o-up',
        voteUpActiveIconName: 'thumbs-up',
        voteDownIconName: 'thumbs-o-down',
        voteDownActiveIconName: 'thumbs-down',
        currentIcon: 'bicycle'
    };

    handleVote = () => {
        if(this.state.currentIcon === 'thumbs-o-up'){
            this.setState({currentIcon: 'thumbs-up'});
        }else if(this.state.currentIcon === 'thumbs-up'){
            this.setState({currentIcon: 'thumbs-o-up'});
        }else if(this.state.currentIcon === 'thumbs-o-down'){
            this.setState({currentIcon: 'thumbs-down'});
        }else if(this.state.currentIcon === 'thumbs-down') {
            this.setState({currentIcon: 'thumbs-o-down'});
        }
    };

    componentDidMount() {

        if(this.props.type === 'up'){
            if (this.props.item.votersUp.includes(this.props.item.username)) {
                this.setState({currentIcon: 'thumbs-up'});
            } else {
                this.setState({currentIcon: 'thumbs-o-up'});
            }
        }else{
            if (this.props.item.votersDown.includes(this.props.item.username)) {
                this.setState({currentIcon: 'thumbs-down'});
            } else {
                this.setState({currentIcon: 'thumbs-o-down'});
            }
        }



    }

    render(){
        return <Icon name={this.state.currentIcon} size={30} color="#fff" onPress={this.handleVote} />
    }
}

class ChannelPlaylistScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Playlist',
    });

    state = {
        playlist: {
            items: [],
            newItem: undefined,
            newItemError: undefined,
        },
        searchBarText: '',
        showSendVideoLoadingIcon: false,
        showPlaylistLoading: true,
    };

    _handleAppStateChange = (nextAppState) => {
        console.log("this.state.appState ------->", nextAppState);
    };

    componentDidMount() {
        this.props.getPlaylistItems(this.props.channels.currentChannel.id);
        console.log("state ------->", this.state);
    }

    componentWillReceiveProps(nextProps) {
        console.log("props ------>", this.props);
        console.log("nextProps ------>", nextProps);
        console.log("old state ------->", this.state);

        if (nextProps.playlist) {

            this.setState({showSendVideoLoadingIcon: false, searchBarText: ''});

            if (this.props.playlist.newItem !== nextProps.playlist.newItem) {
                this.props.getPlaylistItems(this.props.channels.currentChannel.id);
            }

            this.setState({playlist: nextProps.playlist});
            console.log("new state ------->", this.state);
        }
    }

    handleOnTextChangeSearchBar = (searchBarText) => {
        this.setState({
            searchBarText: searchBarText
        })
    };

    handleOnBlurSearchBar = () => {
        console.log(this.state.searchBarText);
        if (this.state.searchBarText.length > 1) {
            this.setState({showSendVideoLoadingIcon: true});
            this.props.sendVideoUrl(this.state.searchBarText, this.props.channels.currentChannel.id, this.props.user.username);
        }
    };

    handleOnFocusSearchBar =  async () => {
        const clipboardContent = await Clipboard.getString();
        console.log("clipboardContent--->", clipboardContent);
          if(clipboardContent.length > 10 && clipboardContent.includes("https://")){
              this.setState({searchBarText: clipboardContent});
          }
    };

    handleMessageDismiss = () => {
        const playlist = {items: this.state.playlist.items, newItem: null, newItemError: null};
        this.setState({playlist: playlist});
    };

    render() {

        const showEmptyPlaylist = this.state.playlist.items.length === 0;

        return (

            <View style={styles.container}>

                <SearchBar value={this.state.searchBarText} placeholder="Add youtube link" platform="android"
                           onChangeText={this.handleOnTextChangeSearchBar}
                           onBlur={this.handleOnBlurSearchBar}
                           showLoadingIcon={this.state.showSendVideoLoadingIcon}
                           containerStyle={{borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
                           onFocus={this.handleOnFocusSearchBar}
                />

                {this.state.playlist.newItem &&
                <View>
                    <Text onPress={this.handleMessageDismiss} style={styles.successMessage}>{this.state.playlist.newItem.title} added.</Text>
                </View>
                }

                {this.state.playlist.newItemError &&
                <View>
                    <Text onPress={this.handleMessageDismiss} style={styles.errorMessage}>{this.state.playlist.newItemError}</Text>
                </View>
                }

                {this.state.playlist.items &&
                    <FlatList
                        data={this.state.playlist.items}
                        renderItem={({item}) =>
                            <View style={styles.playlistItem}>
                                <View style={styles.playlistItemBackgroundWrapper}>
                                    <Image opacity={0.3} style={styles.playlistItemBackgroundImage} source={{uri: item.thumbnailUrl}}/>
                                </View>
                                <View style={styles.playlistItemContentWrapper}>
                                    <View opacity={0.3} style={styles.playlistItemLeft}>
                                        <VoteIcon type={'down'} item={item} />
                                    </View>
                                    <View style={styles.playlistItemMiddle}>
                                        <Text numberOfLines={3} style={styles.playlistItemMiddleTitle}>
                                            {item.title}
                                        </Text>
                                        <Text style={styles.playlistItemMiddleUsername}>{item.username}</Text>
                                    </View>
                                    <View opacity={0.3} style={styles.playlistItemRight}>
                                        <VoteIcon type={'up'} item={item} />
                                    </View>
                                </View>
                            </View>
                        }
                        keyExtractor={(item) => item.id}
                    />
                }

                {/*{this.state.showPlaylistLoading && <Text>Loading...</Text>}*/}
                {/*{showEmptyPlaylist && <Text>Hi {this.props.user.username}, there is not music here, start adding!</Text>}*/}

            </View>
        )
    }
}

const mapStateToProps = state => ({
    channels: state.channels,
    user: state.user,
    playlist: state.playlist
});

export default connect(mapStateToProps, {getPlaylistItems, sendVideoUrl})(ChannelPlaylistScreen)