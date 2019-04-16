import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Image } from 'react-native';

export class CameraClose extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}
	this.closeAction = this.closeAction.bind(this);
	
	closeAction() {
		this.props.nav.navigate('Home');
	}

	render() {
		return (
			<TouchableHighlight onPress={this.closeAction} style={styles.container}>
				<Image source={../../assets/cancel.png} style={styles.closeImg} />
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		width:50,
		alignItems:'center'
	},
	closeImg:{
		width:24,
		height:24
	}
});