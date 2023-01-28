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

export const deletePostedMap = (map) => {
    return {
        type: REMOVE_POSTED_MAP,
        postedMap
    }
}

export const getPostedMaps = () => async (dispatch) => {
    const repsonse = await fetch(`/api/postedmaps/`);
    const postedMapData = await repsonse.json();
    dispatch(getPostedMap(postedMapData))
}

export const getSinglePostedMap = (postedMapId) => async (dispatch) => {
    const response = await fetch(`/api/postdmaps/${postedMapId}`)
    const postedMapData = await response.json();
    dispatch(getPostedMap(postedMapData))
}

export const updatePostedMap = (postedMapId) => async (dispatch) => {
    const repsonse = await fetch()
}
