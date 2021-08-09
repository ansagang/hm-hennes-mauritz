function AppReducer(state, action) {
    switch (action.type) {
        case "ADD_PROJECT_TO_FAVOURITES_LIST":
            return {
                ...state,
                favouritesList: [action.payload, ...state.favouritesList],
            }
        case "REMOVE_PROJECT_FROM_FAVOURITES_LIST":
            return{
                ...state,
                favouritesList: state.favouritesList.filter((project) => project.project_id !== action.payload),
            }
        default:
            return state;
    }
}

export default AppReducer;