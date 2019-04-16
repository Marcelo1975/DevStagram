import React, { Component } from 'react';
import { ScrollView, View, Text, Button, StyleSheet, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/AuthActions';
import { getUserInfo } from '../actions/ProfileActions';
import ExploreItem from '../components/explore/ExploreItem';

export class Profile extends Component {
	static navigationOptions = ({navigation}) => {
		return {
			title:navigation.getParam('name')
		};
	}

	constructor(props) {
		super(props);
		this.state = {
			id:this.props.navigation.getParam('id')
		};

		this.profileItemClick = this.profileItemClick.bind(this);
	}

	componentDidMount() {
		this.props.getUserInfo( this.state.id );
	}

	profileItemClick(idPhoto) {
		this.props.navigation.push('Photo', {
			id:idPhoto
		});
	}

	render() {

		let profileInfo = [];
		let profilePhotos = [];

		let uid = 0;
		if(this.state.id != null) {
			uid = this.state.id;
		}

		for(let i in this.props.data) {
			if(this.props.data[i].idProfile == uid) {
				profileInfo = this.props.data[i].data;
			}
		}

		for(let i in this.props.photos) {
			if(this.props.photos[i].idProfile == uid) {
				profilePhotos = this.props.photos[i].photos;
			}
		}

		return (
			<ScrollView style={styles.container}>
				<View style={styles.header}>
					<View style={styles.header1}>
						<View style={styles.avatarArea}>
							<Image source={{uri:profileInfo.avatar}} style={styles.avatar} />
						</View>
						<View style={styles.info}>
							<View style={styles.infoArea}>
								<View style={styles.infoItem}>
									<Text style={styles.infoItemNumber}>{profileInfo.photos_count}</Text>
									<Text style={styles.infoItemLegend}>posts</Text>
								</View>
								<View style={styles.infoItem}>
									<Text style={styles.infoItemNumber}>{profileInfo.followers}</Text>
									<Text style={styles.infoItemLegend}>seguidores</Text>
								</View>
								<View style={styles.infoItem}>
									<Text style={styles.infoItemNumber}>{profileInfo.following}</Text>
									<Text style={styles.infoItemLegend}>seguidos</Text>
								</View>
							</View>
							{this.state.id == null && 
								<View style={styles.editProfileArea}>
									<Button title="Editar perfil" onPress={()=>{}} />
								</View>
							}
						</View>
					</View>
					<View style={styles.header2}>
						<Text style={styles.username}>{profileInfo.name}</Text>
						<Text style={styles.email}>{profileInfo.email}</Text>
					</View>
				</View>
				<FlatList
					data={profilePhotos}
					numColumns={3}
					keyExtractor={(item)=>item.id}
					renderItem={({item})=><ExploreItem data={item} onClick={this.profileItemClick} />}
				/>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1
	},
	header:{
		backgroundColor:'#FFFFFF',
		height:200
	},
	header1:{
		height:120,
		flexDirection:'row'
	},
	header2:{
		height:80,
		justifyContent:'center',
		paddingLeft:10
	},
	avatarArea:{
		width:120,
		justifyContent:'center',
		alignItems:'center'
	},
	info:{
		flex:1,
		marginRight:10
	},
	avatar:{
		width:100,
		height:100,
		borderRadius:50
	},
	username:{
		fontSize:17,
		color:'#000000',
		fontWeight:'bold'
	},
	email:{
		fontSize:15
	},
	infoArea:{
		flex:1,
		flexDirection:'row'
	},
	editProfileArea:{
		flex:1
	},
	infoItem:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	infoItemNumber:{
		fontSize:17,
		color:'#000000',
		fontWeight:'bold'
	},
	infoItemLegend:{
		fontSize:15
	}
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status,
		data:state.profile.data,
		photos:state.profile.photos,
		is_me:state.profile.is_me,
		t:state.profile.t
	};
};

const ProfileConnect = connect(mapStateToProps, {checkLogin, getUserInfo})(Profile);
export default ProfileConnect;