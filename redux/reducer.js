import {combineReducers} from 'redux'

import {CHANNEL_CREATE_FULFILLED, CHANNEL_CREATE_REJECTED,
        CHANNEL_ENTER_SENT, CHANNEL_ENTER_FULFILLED, CHANNEL_ENTER_REJECTED,
        CHANNEL_EXIT_FULFILLED,
        PLAYLIST_SEND_VIDEO_FULFILLED, PLAYLIST_SEND_VIDEO_REJECTED, PLAYLIST_SEND_VIDEO_SENT,
        PLAYLIST_ITEMS_FETCH, PLAYLIST_ITEMS_RECEIVED,
        USER_UPDATE} from './actions'

const TAG = "[reducer]";

const merge = (prev, next) => Object.assign({}, prev, next);
const reset = (prev, next) => next;

const userReducer = (state = {}, action) => {

    switch (action.type) {
        case USER_UPDATE:
            return merge(state, action.payload);
        default:
            return state;
    }
};

const channelReducer = (state = {}, action) => {

    switch (action.type) {
        case CHANNEL_CREATE_FULFILLED:
            console.log(TAG, CHANNEL_CREATE_FULFILLED, action.payload);
            return merge(state, {currentChannel: action.payload});
        case CHANNEL_CREATE_REJECTED:
            console.log(TAG, CHANNEL_CREATE_REJECTED, action.payload);
            return merge(state, {err: action.payload});
        case CHANNEL_ENTER_SENT:
            return merge(state, {currentChannel: undefined, err: undefined, isFetching: true});
        case CHANNEL_ENTER_FULFILLED:
            console.log(TAG, CHANNEL_ENTER_FULFILLED, action.payload);
            return merge(state, {currentChannel: action.payload, isFetching: false});
        case CHANNEL_ENTER_REJECTED:
            console.log(TAG, CHANNEL_ENTER_REJECTED, action.payload);
            return merge(state, {err: action.payload, isFetching: false});
        case CHANNEL_EXIT_FULFILLED:
            console.log(TAG, CHANNEL_EXIT_FULFILLED, action.payload);
            return merge(state, {currentChannel: undefined});

        default:
            return state;
    }
};

const defaultPlaylistState = {
    items: [],
    newItem: undefined,
    newItemError: undefined,
};

const playlistReducer = (state = defaultPlaylistState, action) => {
    switch (action.type) {
        case PLAYLIST_ITEMS_FETCH:
            console.log(TAG, PLAYLIST_ITEMS_FETCH, action.payload);
            return merge(state, {items: defaultPlaylistState.items});
        case PLAYLIST_ITEMS_RECEIVED:
            console.log(TAG, PLAYLIST_ITEMS_RECEIVED, action.payload);
            return merge(state, {items: action.payload});

        case PLAYLIST_SEND_VIDEO_SENT:
            console.log(TAG, PLAYLIST_SEND_VIDEO_SENT, action.payload);
            return merge(state, {newItemError: defaultPlaylistState.newItem});
        case PLAYLIST_SEND_VIDEO_FULFILLED:
            console.log(TAG, PLAYLIST_SEND_VIDEO_FULFILLED, action.payload);
            return merge(state, {newItem: action.payload});
        case PLAYLIST_SEND_VIDEO_REJECTED:
            console.log(TAG, PLAYLIST_SEND_VIDEO_REJECTED, action.payload);
            return merge(state, {newItemError: action.payload});

        case CHANNEL_EXIT_FULFILLED:
            console.log(TAG, CHANNEL_EXIT_FULFILLED, action.payload);
            return reset(state, defaultPlaylistState);

        default:
            return state;
    }
};

const reducer = combineReducers({
    user: userReducer,
    channels: channelReducer,
    playlist: playlistReducer,
});

export default reducer;


