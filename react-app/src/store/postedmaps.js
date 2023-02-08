const GET_POSTED_MAP = 'postedmap/GET_POSTED_MAP'
const ADD_POSTED_MAP = 'postedmap/ADD_POSTED_MAP'
const UPDATE_POSTED_MAP = 'postedmap/UPDATE_POSTED_MAP'
const REMOVE_POSTED_MAP = 'postedmap/REMOVE_POSTED_MAP'

export const getPostedMap = (postedMap) => {
    return {
        type: GET_POSTED_MAP,
        postedMap
    }
}

export const addPostedMap = (postedMap) => {
    return {
        type: ADD_POSTED_MAP,
        postedMap
    }
}

export const editPostedMap = (postedMap) => {
    return {
        type: UPDATE_POSTED_MAP,
        postedMap
    }
}

export const deletePostedMap = (postMapId) => {
    return {
        type: REMOVE_POSTED_MAP,
        postMapId
    }
}

export const getPostedMaps = () => async (dispatch) => {
    const repsonse = await fetch(`/api/postedmaps/`);
    const postedMapData = await repsonse.json();
    dispatch(getPostedMap(postedMapData))
}

export const getSinglePostedMap = (postedMapId) => async (dispatch) => {
    const response = await fetch(`/api/postedmaps/${postedMapId}`)
    const postedMapData = await response.json();
    dispatch(getPostedMap({ [postedMapData.id]: postedMapData }))
}

export const createPostedMap = (postMapData) => async (dispatch) => {
    const response = await fetch(`/api/postedmaps/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "applicaiton/json"
            },
            body: JSON.stringify(postMapData)
        })

    if (response.ok) {
        const postMapData = await response.json();
        dispatch(addPostedMap(postMapData))
    }
}

export const updatePostedMap = (postedMapId, postMapData) => async (dispatch) => {
    const response = await fetch(`/api/postedmaps/${postedMapId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "applicaiton/json"
        },
        body: JSON.stringify(postMapData)
    })

    if (response.ok) {
        const updatedPostMapData = await response.json();
        dispatch(editPostedMap(updatedPostMapData))
    }
}

export const deletePostMapData = (postMapId) => async (dispatch) => {
    const response = await fetch(`/api/postedmaps/${postMapId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(deletePostMapData(postMapId))
    }
}

export default function postMapDataReducer(state = {}, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_POSTED_MAP:
            return { ...newState, ...action.postMap }
        case ADD_POSTED_MAP:
            return newState[action.postMap.id] = action.postMap
        case UPDATE_POSTED_MAP:
            return newState[action.postMap.id] = action.postMap
        case REMOVE_POSTED_MAP:
            delete newState[action.postMapId]
            return newState
        default:
            return state

    }
}
