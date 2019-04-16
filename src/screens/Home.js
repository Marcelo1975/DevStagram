import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import Feed from './Feed';
import Profile from './Profile';
import Photo from './Photo';

const Home = createStackNavigator({
	Feed:{
		screen:Feed
	},
	Profile:{
		screen:Profile
	},
	Photo:{
		screen:Photo
	}
}, {
	defaultNavigationOptions:{
		headerStyle:{
			backgroundColor:'#4da2d8'
		},
		headerTitleStyle:{
			color:'#FFFFFF',
			flex:1,
			textAlign:'center'
		}
	}
});

export default Home;