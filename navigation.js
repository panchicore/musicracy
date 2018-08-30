import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from "react-navigation";
import ChannelPlaylistScreen from "./screens/ChannelPlaylistScreen";
import ChannelPeopleScreen from "./screens/ChannelPeopleScreen";
import ChannelDetailsScreen from "./screens/ChannelDetailsScreen";
import CreateChannelScreen from "./screens/CreateChannelScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

const ChannelTabs = createBottomTabNavigator({
    ChannelPlaylistScreen: ChannelPlaylistScreen,
    ChannelPeopleScreen: ChannelPeopleScreen,
    ChannelDetailsScreen: ChannelDetailsScreen,
}, {
    navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) => {
            const {routeName} = navigation.state;
            let iconName;
            if (routeName === 'ChannelPlaylistScreen') {
                iconName = `ios-list${focused ? '' : '-outline'}`;
            } else if (routeName === 'ChannelPeopleScreen') {
                iconName = `ios-people${focused ? '' : '-outline'}`;
            } else if (routeName === 'ChannelDetailsScreen') {
                iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            }
            return <Ionicons name={iconName} size={30} color={tintColor}/>;
        }
    }),
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
    },
});


export const AppNavigator = createSwitchNavigator({
    Welcome: WelcomeScreen,
    CreateChannel: CreateChannelScreen,
    Channel: ChannelTabs,
}, {
    initialRouteName: 'Welcome'
});