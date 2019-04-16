import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/AuthActions';

export class Preload extends Component {
	static navigationOptions = {
		title:'',
		header:null
	}

	constructor(props) {
		super(props);
		this.state = {};

		this.verifyStatus = this.verifyStatus.bind(this);
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Carregando...</Text>
			</View>
		);
	}

	verifyStatus() {
		switch(this.props.status) {
			case 1:

				this.props.navigation.dispatch(StackActions.reset({
					index:0,
					actions:[
						NavigationActions.navigate({routeName:'Tabs'})
					]
				}));

				break;
			case 2:

				this.props.navigation.dispatch(StackActions.reset({
					index:0,
					actions:[
						NavigationActions.navigate({routeName:'Login'})
					]
				}));

				break;
		}
	}

	componentDidMount() {
		this.props.checkLogin();
	}

	componentDidUpdate() {
		this.verifyStatus();
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	}
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status
	};
};

const PreloadConnect = connect(mapStateToProps, {checkLogin})(Preload);
export default PreloadConnect;