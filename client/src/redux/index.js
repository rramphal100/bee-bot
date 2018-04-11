import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export const search = pokemon => {
    return dispatch => {
        dispatch({
            type: "LOADING"
        });
        setTimeout(function(){
            axios.get(`http://cors.vschool.io?url=https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(response => {
                dispatch({
                    type: "SEARCH",
                    pokemon: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: "ERROR",
                    error: error.response.statusText
                });
            });
        }, 1000)
    }
}

export const addPokemon = () => {
    return dispatch => {
        dispatch({
            type: "ADD_POKEMON",
        });
    }
}

export const removePokemon = id => {
    return dispatch => {
        dispatch({
            type: "REMOVE_POKEMON",
            id
        });
    }
}

export const addPokemontoPotential = () => {
    return dispatch => {
        dispatch({
            type: "ADD_POKEMON_POTENTIAL",
        });
    }
}

export const removePokemonfromPotential = id => {
    return dispatch => {
        dispatch({
            type: "REMOVE_POKEMON_POTENTIAL",
            id
        });
    }
}

export const addToSlot1 = (id, list) => {
    return dispatch => {
        dispatch({
            type: "ADD_TO_SLOT_1",
            id,
            list
        });
    }
}

export const addToSlot2 = (id, list) => {
    return dispatch => {
        dispatch({
            type: "ADD_TO_SLOT_2",
            id,
            list
        });
    }
}

export const removeSlot1 = () => {
    return dispatch => {
        dispatch({
            type: "REMOVE_SLOT_1",
        });
    }
}

export const removeSlot2 = () => {
    return dispatch => {
        dispatch({
            type: "REMOVE_SLOT_2",
        });
    }
}

export const clearSearch = () => {
    return dispatch => {
        dispatch({
            type: "CLEAR_SEARCH",
        });
    }
}

const initialState = {
    searchResult: {},
    chosen: [],
    potentials: [],
    slot1: {},
    slot2: {},
    loading: false,
    error: ""
};

export const reducer = (prevState = initialState, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...prevState,
                loading: true
            };
        case "ERROR":
            return {
                ...prevState,
                loading: false,
                error: action.error
            };
        case "ADD_POKEMON":
            return {
                ...prevState,
                chosen: [prevState.searchResult, ...prevState.chosen]
            }
        case "REMOVE_POKEMON":
            const chosen = prevState.chosen.slice();
            const chosenIndex = chosen.findIndex(elem => elem._id = action.id);
            chosen.splice(chosenIndex, 1);
            return {
                ...prevState,
                chosen
            }
        case "ADD_POKEMON_POTENTIAL":
            return {
                ...prevState,
                potentials: [prevState.searchResult, ...prevState.potentials]
            }
        case "REMOVE_POKEMON_POTENTIAL":
            const potentials = prevState.potentials.slice();
            const potentialIndex = potentials.findIndex(elem => elem._id = action.id);
            potentials.splice(potentialIndex, 1);
            return {
                ...prevState,
                potentials
            }
        case "SEARCH":
            return {
                ...prevState,
                searchResult: action.pokemon,
                loading: false,
                error: ""
            };
        case "ADD_TO_SLOT_1":
            let slot1;
            if (action.list === "chosen") {
                const chosen1 = prevState.chosen.slice();
                slot1 = chosen1.find(elem => elem.id === action.id);
            } else {
                const potentials1 = prevState.potentials.slice();
                slot1 = potentials1.find(elem => elem.id === action.id);
            }
            return {
                ...prevState,
                slot1
            };
        case "ADD_TO_SLOT_2":
            let slot2;
            if (action.list === "chosen") {
                const chosen2 = prevState.chosen.slice();
                slot2 = chosen2.find(elem => elem.id === action.id);
            } else {
                const potentials2 = prevState.potentials.slice();
                slot2 = potentials2.find(elem => elem.id === action.id);
            }
            return {
                ...prevState,
                slot2
            };
        case "REMOVE_SLOT_1":
            return {
                ...prevState,
                slot1: {}
            };
        case "REMOVE_SLOT_2":
            return {
                ...prevState,
                slot2: {}
            };
        case "CLEAR_SEARCH":
            return {
                ...prevState,
                searchResult: {}
            };
        default:
            return prevState
    }
}

export default createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);
