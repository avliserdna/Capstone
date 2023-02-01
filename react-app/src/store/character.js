const LOAD_CHARACTER = "characters/LOAD_CHARACTER"
const ADD_CHARACTER = "characters/ADD_CHARACTER"
const UPDATE_CHARACTER = "characters/UPDATE_CHARACTER"
const REMOVE_CHARACTER = "characters/REMOVE_CHARACTER"

export const loadCharacter = (character) => {
    return {
        type: LOAD_CHARACTER,
        character
    }
}

export const addCharacter = (character) => {
    return {
        type: ADD_CHARACTER,
        character
    }
}

export const updateCharacter = (character) => {
    return {
        type: UPDATE_CHARACTER,
        character
    }
}

export const removeCharacter = (character) => {
    return {
        type: REMOVE_CHARACTER,
        character
    }
}

export const getCharacters = () => async (dispatch) => {
    const response = await fetch(`/api/characters`)
    const characterData = await response.json();
    dispatch(loadCharacter(characterData))
}

export const getCharacter = () => async (dispatch) => {
    const response = await fetch(`/api/characters`)
    const characterData = await response.json();
    dispatch(loadCharacter(characterData))
}

export default function characterReducer(state = {}, action) {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_CHARACTER:
            return action.character
        default:
            return state
    }
}
