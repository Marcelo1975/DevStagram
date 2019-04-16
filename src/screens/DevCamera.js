import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import { withNavigationFocus } from 'react-navigation';
import { checkLogin } from '../actions/AuthActions';
import { setPhotoSelected } from '../actions/CameraActions';
import CameraClose from '../components/camera/CameraClose';

export class DevCamera extends Component {
	static navigationOptions = ({navigation}) => ({
		title:'',
		headerLeft:<CameraClose nav={navigation} />
	})

	constructor(props) {
		super(props);
		this.state = {
			cameraType:'back',
			flashMode:'auto'
		};

		this.flashClick = this.flashClick.bind(this);
		this.flipClick = this.flipClick.bind(this);
		this.galleryClick = this.galleryClick.bind(this);
		this.takePhotoClick = this.takePhotoClick.bind(this);
		this.renderCamera = this.renderCamera.bind(this);
		this.getPhotoData = this.getPhotoData.bind(this);
	}

	flashClick() {
		let state = this.state;

		switch(state.flashMode) {
			case 'auto':
				state.flashMode = 'off';
				break;
			case 'off':
				state.flashMode = 'on';
				break;
			case 'on':
				state.flashMode = 'auto';
				break;
		}

		this.setState(state);
	}

	flipClick() {
		let state = this.state;

		if(state.cameraType == 'back') {
			state.cameraType = 'front';
		} else {
			state.cameraType = 'back';
		}

		this.setState(state);
	}

	galleryClick() {
		this.props.navigation.navigate('DevCameraGallery');
	}

	takePhotoClick() {
		if(this.camera) {
			this.camera.takePictureAsync({
				quality:0.8,
				base64:true
			})
			.then(this.getPhotoData);
		}
	}

	getPhotoData(data) {
		this.props.setPhotoSelected(data.uri);
		this.props.navigation.navigate('DevCameraEffects');
	}

	renderCamera() {
		const isFocused = this.props.navigation.isFocused();

		let cameraType = RNCamera.Constants.Type.back;
		if(this.state.cameraType == 'front') {
			cameraType = RNCamera.Constants.Type.front;
		}

		let flashMode = RNCamera.Constants.FlashMode.auto;
		if(this.state.flashMode == 'off') {
			flashMode = RNCamera.Constants.FlashMode.off;
		} else if(this.state.flashMode = 'on') {
			flashMode = RNCamera.Constants.FlashMode.on;
		}

		if(isFocused) {
			return (
				<RNCamera
					ref={ref => {
						this.camera = ref;
					}}
					style={{flex:1}}
					type={cameraType}
					flashMode={flashMode}
				/>
			);
		} else {
			return null;
		}
	}

	render() {
		let cameraWidth = Dimensions.get('window').width;

		let flashTypeImage = require('../assets/camera-flash-auto.png');
		if(this.state.flashMode == 'on') {
			flashTypeImage = require('../assets/camera-flash-on.png');
		} else if(this.state.flashMode == 'off') {
			flashTypeImage = require('../assets/camera-flash-off.png');
		}

		return (
			<View style={styles.container}>
				<View style={{overflow:'hidden', width:cameraWidth, height:cameraWidth, backgroundColor:'#333333'}}>
					{this.renderCamera()}
				</View>
				<View style={styles.controlArea}>
					<View style={styles.cameraControl}>
						<View style={styles.cameraControlArea}>
							<TouchableHighlight underlayColor={null} onPress={this.flashClick} style={styles.cameraControlTouch}>
								<Image source={flashTypeImage} style={styles.cameraControlIcon} />
							</TouchableHighlight>
						</View>
						<View style={styles.cameraControlArea}>
							<TouchableHighlight underlayColor={null} onPress={this.flipClick} style={styles.cameraControlTouch}>
								<Image source={require('../assets/camera-flip.png')} style={styles.cameraControlIcon} />
							</TouchableHighlight>
						</View>
					</View>
					<View style={styles.cameraTypeArea}>

						<TouchableHighlight underlayColor={null} onPress={this.takePhotoClick} style={styles.cameraTakePicture}>
							<View style={styles.cameraTakePicture2}></View>
						</TouchableHighlight>
						<View style={styles.cameraGalleryArea}>
							<TouchableHighlight underlayColor={null} onPress={this.galleryClick} style={styles.cameraControlTouch}>
								<Image source={require('../assets/camera-gallery.png')} style={styles.cameraControlIcon} />
							</TouchableHighlight>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#000000'
	},
	controlArea:{
		flex:1
	},
	cameraControl:{
		height:50,
		flexDirection:'row',
		marginTop:-50
	},
	cameraControlArea:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	cameraControlIcon:{
		width:32,
		height:32
	},
	cameraTypeArea:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	cameraTakePicture:{
		width:60,
		height:60,
		backgroundColor:'#999999',
		borderRadius:30,
		padding:7
	},
	cameraTakePicture2:{
		flex:1,
		borderRadius:30,
		backgroundColor:'#555555'
	},
	cameraGalleryArea:{
		width:50,
		height:50,
		position:'absolute',
		right:20,
		justifyContent:'center',
		alignItems:'center'
	},
	cameraControlTouch:{
		width:40,
		height:40,
		justifyContent:'center',
		alignItems:'center'
	}
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status
	};
};

const DevCameraConnect = connect(mapStateToProps, {checkLogin, setPhotoSelected})(DevCamera);
export default withNavigationFocus(DevCameraConnect);
//export default DevCameraConnect;