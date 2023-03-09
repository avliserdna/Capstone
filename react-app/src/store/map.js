const GET_MAP = 'map/GET_MAP'
const ADD_MAP = 'map/ADD_MAP'
const UPDATE_MAP = 'map/UPDATE_MAP'
const DELETE_MAP = 'map/DELETE_MAP'

export const getMap = (map) => {
    return {
        type: GET_MAP,
        map
    }
}

export const addMap = (map) => {
    return {
        type: ADD_MAP,
        map
    }
}

export const getAllMaps = () => async dispatch => {
    const response = await fetch(`/api/maps/`);
    const mapData = await response.json();
    dispatch(getMap(mapData))
}

export const getSingleMap = (mapId) => async (dispatch) => {
    const response = await fetch(`/api/maps/${mapId}`);
    const mapData = await response.json();
    dispatch(getMap({ [mapData.id]: mapData }))
}


export const addNewMap = (mapData) => async (dispatch) => {
    const response = await fetch(`/api/maps/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mapData)
        })

    if (response.ok) {
        const mapData = await response.json()
        dispatch(addMap(mapData))
    }
}


export default function mapReducer(state = {}, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_MAP:
            return { ...newState, ...action.map }
        case ADD_MAP:
            return newState[action.map.id] = action.map
        default:
            return state
    }
}
