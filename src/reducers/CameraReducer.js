const initialState = {
	photoSelected:null
};

const CameraReducer = (state = initialState, action) => {
	/*
	if(action.type == 'clearExplore') {
		return { ...state, exploreItems:[]};
	}
	*/

	if(action.type == 'changePhotoSelected') {
		return {...state, photoSelected:action.payload.uri};
	}

	return state;
}

export default CameraReducer;