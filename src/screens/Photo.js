import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/AuthActions';
import { getPhotoData } from '../actions/PhotoActions';
import { likePhoto } from '../actions/FeedActions';
import FeedItem from '../components/feed/FeedItem';

export class Photo extends Component {
	static navigationOptions = {
		title:'Foto'
	}

	constructor(props) {
		super(props);
		this.state = {
			id:this.props.navigation.getParam('id')
		};

		this.likeAction = this.likeAction.bind(this);
	}

	componentDidMount() {
		this.props.getPhotoData(this.state.id);
	}

	likeAction(id, is_liked) {
		alert( this.props.photoData.url );
		//this.props.likePhoto(id, is_liked);
	}

	render() {

		let photoInfo = [];

		for(let i in this.props.photoData) {
			if(this.props.photoData[i].idPhoto == this.state.id) {
				photoInfo = this.props.photoData[i].data;
			}
		}

		return (
			<ScrollView style={styles.container}>
				{typeof photoInfo.id == 'undefined' &&
					<Text>Carregando...</Text>
				}
				{typeof photoInfo.id != 'undefined' &&
					<FeedItem data={photoInfo} likeAction={this.likeAction} nav={this.props.navigation} />
				}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1
	}
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status,
		photoData:state.photo.data,
		t:state.photo.t
	};
};

const PhotoConnect = connect(mapStateToProps, { getPhotoData, likePhoto })(Photo);
export default PhotoConnect;