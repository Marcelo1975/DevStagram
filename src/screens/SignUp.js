import React, { Component } from 'react';
import { View, ImageBackground, TextInput, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { checkLogin, registerNewUser, changeName, changeEmail, changePassword } from '../actions/AuthActions';

export class SignUp extends Component {
	static navigationOptions = {
		title:'SignUp',
		header:null
	}

	constructor(props) {
		super(props);
		this.state = {};

		this.signInAction = this.signInAction.bind(this);
		this.registerAction = this.registerAction.bind(this);
		this.verifyStatus = this.verifyStatus.bind(this);
	}

	componentDidUpdate() {
		this.verifyStatus();
	}

	verifyStatus() {
		if(this.props.status === 1) {
			this.props.navigation.dispatch(StackActions.reset({
				index:0,
				actions:[
					NavigationActions.navigate({routeName:'Tabs'})
				]
			}));
		}
	}

	signInAction() {
		this.props.navigation.goBack();
	}

	registerAction() {
		this.props.registerNewUser(
			this.props.name,
			this.props.email,
			this.props.password
		);
	}

	render() {
		return (
			<ImageBackground source={require('../assets/bg.jpg')} style={styles.container}>
				<Text style={styles.logo}>Devstagram</Text>

				<TextInput value={this.props.name} onChangeText={this.props.changeName} style={styles.input} placeholder="Digite seu nome" placeholderTextColor="#FFFFFF" underlineColorAndroid="transparent" />
				<TextInput value={this.props.email} onChangeText={this.props.changeEmail} style={styles.input} placeholder="Digite seu e-mail" placeholderTextColor="#FFFFFF" underlineColorAndroid="transparent" />
				<TextInput value={this.props.password} onChangeText={this.props.changePassword} style={styles.input} placeholder="Digite sua senha" placeholderTextColor="#FFFFFF" secureTextEntry={true} underlineColorAndroid="transparent" />

				<TouchableHighlight onPress={this.registerAction} style={styles.actionButton} underlayColor="#307EAF">
					<Text style={styles.actionButtonText}>Fazer o cadastro</Text>
				</TouchableHighlight>

				<TouchableHighlight onPress={this.signInAction} style={styles.signButton} underlayColor="transparent">
					<Text style={styles.signButtonText}>Já tem cadastro? Clique aqui</Text>
				</TouchableHighlight>

			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		resizeMode:'contain'
	},
	logo:{
		fontSize:32,
		color:'#FFFFFF',
		marginBottom:30
	},
	input:{
		width:"90%",
		height:50,
		backgroundColor:'rgba(255, 255, 255, 0.15)',
		borderRadius:5,
		color:'#FFFFFF',
		fontSize:17,
		marginBottom:10
	},
	actionButton:{
		width:"90%",
		height:50,
		backgroundColor:'transparent',
		borderRadius:5,
		borderWidth:1,
		borderColor:'#FFFFFF',
		justifyContent:'center',
		alignItems:'center'
	},
	actionButtonText:{
		color:'#FFFFFF',
		fontSize:15
	},
	signButton:{
		width:"90%",
		height:50,
		backgroundColor:'transparent',
		justifyContent:'center',
		alignItems:'center',
		marginTop:40
	},
	signButtonText:{
		color:'#FFFFFF',
		fontSize:13
	}
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status,
		name:state.auth.name,
		email:state.auth.email,
		password:state.auth.password
	};
};

const SignUpConnect = connect(mapStateToProps, {checkLogin, registerNewUser, changeName, changeEmail, changePassword})(SignUp);
export default SignUpConnect;