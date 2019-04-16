import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet, Button, CameraRoll, ScrollView, Image, Platform, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/AuthActions';
import { setPhotoSelected } from '../actions/CameraActions';

export class DevCameraGallery extends Component {
	static navigationOptions = {
		title:'Galeria'
	}

	constructor(props) {
		super(props);
		this.state = {
			photos:[]
		};

		this.loadPhotos = this.loadPhotos.bind(this);
		this.selectPhoto = this.selectPhoto.bind(this);
		this.loadPhotos();
	}

	loadPhotos = async () => {
		if(await this.requestPermission()) {
			CameraRoll.getPhotos({
				first:20,
				assetType:'Photos'
			})
			.then((r)=>{
				this.setState({photos:r.edges});
			})
			.catch((e)=>{
				alert(e);
			});
		} else {
			this.props.navigation.back();
		}
	}

	requestPermission = async () => {
		if(Platform.OS == 'android') {
			try {
				const g = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
					{
						title:'Acessar a Galeria',
						message:'Este aplicativo precisa de sua permissão para acessar a galeria.'
					}
				);

				if(g == PermissionsAndroid.RESULTS.GRANTED) {
					return true;
				} else {
					return false;
				}
			}
			catch(e) {
				this.props.navigation.back();
			}

		} else {
			return true;
		}
	}

	selectPhoto(key) {
		if(this.state.photos[key]){
			let uri = this.state.photos[key].node.imege.uri;
			this.props.setPhotoSelected(uri);
			this.props.navigation.navigate('DevCameraEffects');
		}
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.photoArea}>
					{this.state.photos.map((obj, i)=>{
						return (
							<TouchableHighlight onPress={this.selectPhoto(i)}>
								<Image key={i} style={styles.img} source={{uri:obj.node.image.uri}} />
							</TouchableHighlight>
						)
					})}
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#000000'
	},
	photoArea:{
		flexDirection:'row',
		flexWrap:'wrap'
	},
	img:{
		width:100,
		height:100
	}
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status
	};
};

const DevCameraGalleryConnect = connect(mapStateToProps, {checkLogin, setPhotoSelected})(DevCameraGallery);
export default DevCameraGalleryConnect;