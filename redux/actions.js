import {createChannelApi, fetchRandomUser, enterChannelApi, getPlaylistItemsApi, sendVideoUrlApi} from '../api'

const TAG = "[actions]";
export const USER_UPDATE = "USER_UPDATE";
export const CHANNEL_ENTER_SENT = "CHANNEL_ENTER_SENT";
export const CHANNEL_ENTER_FULFILLED = "CHANNEL_ENTER_FULFILLED";
export const CHANNEL_ENTER_REJECTED = "CHANNEL_ENTER_REJECTED";
export const CHANNEL_EXIT_FULFILLED = "CHANNEL_EXIT_FULFILLED";

export const PLAYLIST_ITEMS_FETCH = "PLAYLIST_ITEMS_FETCH";
export const PLAYLIST_ITEMS_RECEIVED = "PLAYLIST_ITEMS_RECEIVED";
export const PLAYLIST_ITEMS_REJECTED = "PLAYLIST_ITEMS_REJECTED";

export const PLAYLIST_SEND_VIDEO_SENT = "PLAYLIST_SEND_VIDEO_SENT";
export const PLAYLIST_SEND_VIDEO_FULFILLED = "PLAYLIST_SEND_VIDEO_FULFILLED";
export const PLAYLIST_SEND_VIDEO_REJECTED = "PLAYLIST_SEND_VIDEO_REJECTED";

export const CHANNEL_CREATE_SENT = "CHANNEL_CREATE_SENT";
export const CHANNEL_CREATE_FULFILLED = "CHANNEL_CREATE_FULFILLED";
export const CHANNEL_CREATE_REJECTED = "CHANNEL_CREATE_REJECTED";


export const updateUser = () => async dispatch => {
    const user = await fetchRandomUser();
    console.log(TAG, user);
    dispatch({type: USER_UPDATE, payload: {username: user.login.username}})
};

export const createChannel = (channel) => async dispatch => {

    console.log(TAG, "dispatching", CHANNEL_CREATE_SENT, channel);
    dispatch({type: CHANNEL_CREATE_SENT});
    try {
        const newChannel = await createChannelApi(channel);
        console.log(TAG, "dispatching", CHANNEL_CREATE_FULFILLED, newChannel);
        dispatch({type: CHANNEL_CREATE_FULFILLED, payload: newChannel});
    } catch (e) {
        console.log(TAG, "dispatching", CHANNEL_CREATE_REJECTED, e);
        dispatch({type: CHANNEL_CREATE_REJECTED, payload: e.message});
    }
};

export const enterChannel = (number) => async dispatch => {
    console.log(TAG, "dispatching", CHANNEL_ENTER_SENT, number);
    dispatch({type: CHANNEL_ENTER_SENT});
    try{
        const channel = await enterChannelApi(number);
        console.log(TAG, "dispatching", CHANNEL_ENTER_FULFILLED, channel);
        dispatch({type: CHANNEL_ENTER_FULFILLED, payload: channel})
    }catch (e) {
        console.log(TAG, "dispatching", CHANNEL_ENTER_REJECTED, e.message);
        dispatch({type: CHANNEL_ENTER_REJECTED, payload: e.message})
    }
};

export const getPlaylistItems = (channelId) => async dispatch => {
    console.log(TAG, "displatching", PLAYLIST_ITEMS_FETCH, channelId);
    dispatch({type: PLAYLIST_ITEMS_FETCH});
    try {
        const playlistItems = await getPlaylistItemsApi(channelId);
        console.log(TAG, "dispatching", PLAYLIST_ITEMS_RECEIVED, playlistItems);
        dispatch({type: PLAYLIST_ITEMS_RECEIVED, payload: playlistItems});
    }catch (e) {
        console.log(TAG, "dispatching", PLAYLIST_ITEMS_REJECTED, e);
        dispatch({type: PLAYLIST_ITEMS_REJECTED, payload: e.message});
    }
};


export const sendVideoUrl = (url, channelId, username) => async dispatch => {
    console.log(TAG, "displatching", PLAYLIST_SEND_VIDEO_SENT, url, channelId, username);
    dispatch({type: PLAYLIST_SEND_VIDEO_SENT});
    try {
        const playlistItem = await sendVideoUrlApi(url, channelId, username);
        console.log(TAG, "dispatching", PLAYLIST_SEND_VIDEO_FULFILLED, playlistItem);
        dispatch({type: PLAYLIST_SEND_VIDEO_FULFILLED, payload: playlistItem});
    }catch (e) {
        console.log(TAG, "dispatching", PLAYLIST_SEND_VIDEO_REJECTED, e.message);
        dispatch({type: PLAYLIST_SEND_VIDEO_REJECTED, payload: e.message});
    }
};




export const exitChannel = (channel) => async dispatch => {
    dispatch({type: CHANNEL_EXIT_FULFILLED, payload: channel});
};