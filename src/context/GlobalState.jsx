import { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

const initialState = {
    favouritesList: localStorage.getItem('favouritesList') ? JSON.parse(localStorage.getItem('favouritesList')) : [],
}


export const GlobalContext = createContext(initialState)

export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    useEffect(() => {
        localStorage.setItem('favouritesList', JSON.stringify(state.favouritesList))
    }, [state])

    const addWebsiteToFavouritesList = (portfolioProject) => {
        dispatch({ type: "ADD_PROJECT_TO_FAVOURITES_LIST", payload: portfolioProject })
    }

    const removeWebsiteFromFavouritesList = (project_id) => {
        dispatch({ type: "REMOVE_PROJECT_FROM_FAVOURITES_LIST", payload: project_id })
    }

    return (
        <GlobalContext.Provider value={{ favouritesList: state.favouritesList, addWebsiteToFavouritesList, removeWebsiteFromFavouritesList, }}>
            {props.children}
        </GlobalContext.Provider>
    )
}       