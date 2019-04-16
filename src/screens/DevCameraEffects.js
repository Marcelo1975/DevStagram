import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/AuthActions';
import EffectItem from '../components/camera/EffectItem';

export class DevCameraEffects extends Component {
	static navigationOptions = ({navigation}) => {
		return {
			title:'Efeitos',
			headerRight:(
				<Button 
				title="Enviar" 
				onPress={navigation.getParam('sendPhoto')}
				style={styles.headerButton}
				/>
			),
			headerRightContainerStyle:{
				marginRight:10
			}
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			effects:[
				{title:'Normal', ref:'clear'},
				{title:'Brilhoso', ref:'bright'},
				{title:'Escuro', ref:'dark'},
				{title:'Azul', ref:'blue'},
				{title:'Amarelo', ref:'yellow'},
				{title:'Verde', ref:'green'},
				{title:'Branco', ref:'white'}
			],
			selectedEffect:'clear'
		};

		this.sendPhoto = this.sendPhoto.bind(this);
	}

	componentDidMount() {
		this.props.navigation.setParams({sendPhoto:this.sendPhoto});		
	}

	sendPhoto() {
		alert("ENVIANDO...");
	}

	render() {
		let deviceWidth = Dimensions.get('window').width;
		return (
			<View style={styles.container}>
				<View style={{overflow:'hidden', width:deviceWidth, height:deviceWidth}}>
					<Image style={styles.photoImage} source={{uri:this.props.photoSelected}} />
				</View>
				<View style={styles.effectsArea}>
					<ScrollView style={styles.effectsScroll} horizontal={true} bounces={true}>
						{this.state.effects.map((data) => {
							return (
								<EffectItem title={data.title} ref={data.ref} />
							);
						})}
					</ScrollView>
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
	photoImage:{
		flex:1
	},
	effectsArea:{
		flex:1
	},
	effectsScroll:{
		flex:1
	},
	headerButton:{
		
	}
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status,
		photoSelected:state.camera.photoSelected
	};
};

const DevCameraEffectsConnect = connect(mapStateToProps, {checkLogin})(DevCameraEffects);
export default DevCameraEffectsConnect;