import { AsyncStorage } from 'react-native';
import DevstagramAPI from '../DevstagramAPI';
import { logout } from './AuthActions';

export const getPhotoData = (id) => {
	return (dispatch) => {

		dispatch({
			type:'setPhotoData',
			payload:{
				data:[],
				id:id
			}
		});

		AsyncStorage.getItem('jwt')
		.then((data)=>{
			if(data != null && data != '') {

				let endpoint = 'photos/'+id;

				DevstagramAPI.req({
					endpoint:endpoint,
					method:'GET',
					data:{jwt:data},
					success:(json)=>{
						if(json.logged === true) {

							dispatch({
								type:'setPhotoData',
								payload:{
									data:json.data,
									id:id
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







