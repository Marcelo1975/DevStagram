import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import Explore from './Explore';
import Profile from './Profile';
import Photo from './Photo';

const StackExplore = createStackNavigator({
	Explore:{
		screen:Explore
	},
	Profile:{
		screen:Profile
	},
	Photo:{
		screen:Photo
	}
});

export default StackExplore;