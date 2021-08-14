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

    const addCardToFavouritesList = (product) => {
        dispatch({ type: "ADD_CARD_TO_FAVOURITES_LIST", payload: product })
    }

    const removeCardFromFavouritesList = (card_code) => {
        dispatch({ type: "REMOVE_CARD_FROM_FAVOURITES_LIST", payload: card_code })
    }

    return (
        <GlobalContext.Provider value={{ favouritesList: state.favouritesList, addCardToFavouritesList, removeCardFromFavouritesList, }}>
            {props.children}
        </GlobalContext.Provider>
    )
}       