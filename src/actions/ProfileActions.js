import { AsyncStorage } from 'react-native';
import DevstagramAPI from '../DevstagramAPI';
import { logout } from './AuthActions';

export const getUserInfo = (id = '') => {
	return (dispatch) => {

		dispatch({
			type:'setUserData',
			payload:{
				data:[],
				id:id
			}
		});

		dispatch({
			type:'setUserPhotos',
			payload:{
				photos:[],
				id:id
			}
		});

		AsyncStorage.getItem('jwt')
		.then((data)=>{
			if(data != null && data != '') {

				let endpoint = 'users/'+id;

				DevstagramAPI.req({
					endpoint:endpoint,
					method:'GET',
					data:{jwt:data, show_photos:1},
					success:(json)=>{
						if(json.logged === true) {

							dispatch({
								type:'setUserData',
								payload:{
									data:json.data,
									id:id
								}
							});

							dispatch({
								type:'setUserPhotos',
								payload:{
									photos:json.photos,
									id:id
								}
							});

							dispatch({
								type:'setIsMe',
								payload:{
									status:json.is_me
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







