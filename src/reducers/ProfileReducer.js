const initialState = {
	data:[],
	photos:[],
	is_me:false,
	t:0
};

const ProfileReducer = (state = initialState, action) => {

	if(action.type == 'setUserData') {
		let data = state.data;
		let found = false;
		let uid = action.payload.id;

		if(uid == null) {
			uid = 0;
		}

		for(let i in data) {
			if(data[i].idProfile == uid) {
				data[i].data = action.payload.data;
				found = true;
			}
		}

		if(found == false) {
			data.push({idProfile:uid, data:action.payload.data});
		}

		return { ...state, data:data, t:Math.random() };
	}

	if(action.type == 'setUserPhotos') {
		let photos = state.photos;
		let found = false;
		let uid = action.payload.id;

		if(uid == null) {
			uid = 0;
		}

		for(let i in photos) {
			if(photos[i].idProfile == uid) {
				photos[i].photos = action.payload.photos;
				found = true;
			}
		}

		if(found == false) {
			photos.push({idProfile:uid, photos:action.payload.photos});
		}

		return { ...state, photos:photos, t:Math.random() };

		//return { ...state, photos:action.payload.photos };
	}

	if(action.type == 'setIsMe') {
		return { ...state, is_me:action.payload.status };
	}

	return state;
}

export default ProfileReducer;