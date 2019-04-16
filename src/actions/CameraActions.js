import { AsyncStorage } from 'react-native';
import DevstagramAPI from '../DevstagramAPI';
import { logout } from './AuthActions';

export const setPhotoSelected = (uri) => {
	return {
		type:'changePhotoSelected',
		payload:{
			uri:uri
		}
	};
};

/*
export const getExploreItems = (excludes = '', isRefresh = false) => {
	return (dispatch) => {

		if(excludes == '' && isRefresh == false) {
			dispatch({
				type:'changeExploreLoadingStatus',
				payload:{
					status:true
				}
			});
		}

		AsyncStorage.getItem('jwt')
		.then((data)=>{
			if(data != null && data != '') {

				DevstagramAPI.req({
					endpoint:'photos/random',
					method:'GET',
					data:{jwt:data, excludes},
					success:(json)=>{
						if(json.logged === true) {

							dispatch({
								type:'changeExploreLoadingStatus',
								payload:{
									status:false
								}
							});

							dispatch({
								type:'changeExploreRefreshingStatus',
								payload:{
									status:false
								}
							});

							if(isRefresh) {
								dispatch({
									type:'clearExplore'
								});
							}

							dispatch({
								type:'incrementExplore',
								payload:{
									exploreItems:json.data
								}
							});

						} else {
							dispatch(logout());
						}
					},
					error:(error)=>{
						alert(error);
					}
				});

			} else {
				dispatch(logout());
			}
		})
		.catch(()=>{
			dispatch(logout());
		});		

	};
	
};
*/
