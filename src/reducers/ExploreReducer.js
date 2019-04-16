const initialState = {
	exploreItems:[],
	offset:0,
	exploreLoading:false,
	exploreRefreshing:false
};

const ExploreReducer = (state = initialState, action) => {

	if(action.type == 'clearExplore') {
		return { ...state, exploreItems:[]};
	}

	if(action.type == 'incrementExplore') {
		return { ...state, exploreItems:state.exploreItems.concat(action.payload.exploreItems)};
	}

	if(action.type == 'changeExploreLoadingStatus') {
		return { ...state, exploreLoading:action.payload.status };
	}

	if(action.type == 'changeExploreRefreshingStatus') {
		return { ...state, exploreRefreshing:action.payload.status };
	}

	return state;
}

export default ExploreReducer;