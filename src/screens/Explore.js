import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/AuthActions';
import { getExploreItems, setExploreRefreshing } from '../actions/ExploreActions';
import ExploreItem from '../components/explore/ExploreItem';

export class Explore extends Component {
	static navigationOptions = {
		title:'Explorar'
	}

	constructor(props) {
		super(props);
		this.state = {};

		this.paginateExplore = this.paginateExplore.bind(this);
		this.exploreRefresh = this.exploreRefresh.bind(this);
		this.exploreItemClick = this.exploreItemClick.bind(this);
	}

	componentDidMount() {
		this.props.getExploreItems();
	}

	paginateExplore() {
		let excludes = [];
		for(let i in this.props.exploreItems) {
			excludes.push(this.props.exploreItems[i].id);
		}
		let excludeString = excludes.join(',');

		this.props.getExploreItems(excludeString);
	}

	exploreRefresh() {
		this.props.setExploreRefreshing(true);
		this.props.getExploreItems('', true);
	}

	exploreItemClick(idPhoto) {

		this.props.navigation.navigate('Photo', {
			id:idPhoto
		});

	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					style={styles.lista}
					numColumns={3}
					data={this.props.exploreItems}
					keyExtractor={(item)=>item.id}
					renderItem={({item})=><ExploreItem data={item} onClick={this.exploreItemClick} />}
					onEndReachedThreshold={0.5}
					onEndReached={this.paginateExplore}
					refreshing={this.props.exploreRefreshing}
					onRefresh={this.exploreRefresh}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1
	},
	lista:{
		width:'100%',
		height:'100%'
	}
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status,
		exploreItems:state.explore.exploreItems,
		exploreRefreshing:state.explore.exploreRefreshing
	};
};

const ExploreConnect = connect(mapStateToProps, {checkLogin, getExploreItems, setExploreRefreshing})(Explore);
export default ExploreConnect;