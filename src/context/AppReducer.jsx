function AppReducer(state, action) {
    switch (action.type) {
        case "ADD_CARD_TO_FAVOURITES_LIST":
            return {
                ...state,
                favouritesList: [action.payload, ...state.favouritesList],
            }
        case "REMOVE_CARD_FROM_FAVOURITES_LIST":
            return{
                ...state,
                favouritesList: state.favouritesList.filter((product) => product.defaultArticle.code !== action.payload),
            }
        default:
            return state;
    }
}

export default AppReducer;