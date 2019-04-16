import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableHighlight, Image } from 'react-native';

let squareWidth = Dimensions.get('window').width / 3;
let photoMargin = 5;

export default class ExploreItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};

		this.exploreItemClickEvent = this.exploreItemClickEvent.bind(this);
	}

	exploreItemClickEvent() {
		this.props.onClick( this.props.data.id );
	}

	render() {
		return (
			<View style={exploreStyle.square}>
				<TouchableHighlight underlayColor="#CCCCCC" onPress={this.exploreItemClickEvent} style={exploreStyle.square}>
					<Image source={{uri:this.props.data.url}} resizeMode="cover" style={exploreStyle.photoArea} />
				</TouchableHighlight>
			</View>
		);
	}

}

const exploreStyle = StyleSheet.create({
	square:{
		width:squareWidth,
		height:squareWidth
	},
	photoArea:{
		width:(squareWidth - (2 * photoMargin)),
		height:(squareWidth - (2 * photoMargin)),
		margin:photoMargin
	}
});