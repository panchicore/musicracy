let Parse = require('parse/react-native');

const TAG = "[api]";

let ChannelObject = Parse.Object.extend("Channel");
let PlaylistItemObject = Parse.Object.extend("PlaylistItem");

export const createChannelApi = async (c) => {
    let channel = new ChannelObject();
    console.log(TAG, "saving", c);
    let newChannel = await channel.save(c);
    return {
        id: newChannel.id,
        name: newChannel.get("name"),
        number: newChannel.get("number"),
    };
};

export const enterChannelApi = async (number) => {

    const query = new Parse.Query(ChannelObject);
    query.equalTo("number", parseInt(number));
    const channel = await query.first();

    if(channel === undefined){
        throw new Error("Channel not found :(");
    }

    return {
        id: channel.id,
        name: channel.get("name"),
        number: channel.get("number"),
    };

};

export const sendVideoUrlApi = async (url, channelId, username) => {
    const res = await Parse.Cloud.run("sendVideo", {url, channelId, username}).catch(function(error) {
        throw new Error(error.message);
    });

    return {
        title: res.get("title"),
    }
};

export const getPlaylistItemsApi = async (channelId) => {

    // await new Promise(resolve => setTimeout(resolve, 2000));

    let channel = new ChannelObject();
    channel.id = channelId;

    let query = new Parse.Query(PlaylistItemObject);
    query.equalTo("channel", channel);

    const playlistItems = await query.find();

    return playlistItems.map(item => ({
        id: item.id,
        username: item.get("username"),
        title: item.get("title"),
        thumbnailUrl: item.get("thumbnailUrl"),
        sentUrl: item.get("sentUrl"),
        createdAt: item.createdAt
    }));

};

export const fetchRandomUser = async () => {
    // await new Promise(resolve => setTimeout(resolve, 5000));
    const response = await fetch('https://randomuser.me/api/?results=1&inc=login');
    const {results} = await response.json();
    return results[0];
};