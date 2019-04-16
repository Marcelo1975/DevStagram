const initialState = {
	data:[],
	t:0
};

const PhotoReducer = (state = initialState, action) => {

	if(action.type == 'setPhotoData') {

		let data = state.data;
		let found = false;

		for(let i in data) {
			if(data[i].idPhoto == action.payload.id) {
				data[i].data = action.payload.data;
				found = true;
			}
		}

		if(found == false) {
			data.push({idPhoto:action.payload.id, data:action.payload.data});
		}

		return { ...state, data:data, t:Math.random() };
	}

	return state;
}

export default PhotoReducer;