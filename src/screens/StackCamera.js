import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import DevCamera from './DevCamera';
import DevCameraEffects from './DevCameraEffects';
import DevCameraGallery from './DevCameraGallery';

const StackCamera = createStackNavigator({
	DevCamera:{
		screen:DevCamera
	},
	DevCameraEffects:{
		screen:DevCameraEffects
	},
	DevCameraGallery:{
		screen:DevCameraGallery
	}
}, {
	defaultNavigationOptions:{
		headerStyle:{
			backgroundColor:'#000000'
		},
		headerTintColor:'#FFFFFF'
	}
});

export default StackCamera;