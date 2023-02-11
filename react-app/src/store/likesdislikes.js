const LOAD_REACTION = 'likedislike/LOAD_REACTION'
const ADD_REACTION = 'likedislike/ADD_REACTION'
const UPDATE_REACTION = 'likedislike/UPDATE_REACTION'
const DELETE_REACTION = 'likedislike/DELETE_REACTION'

export const loadReaction = (reaction) => {
    return {
        type: LOAD_REACTION,
        reaction
    }
}

export const addReaction = (reaction) => {
    return {
        type: ADD_REACTION,
        reaction
    }
}

export const updateReaction = (reaction) => {
    return {
        type: UPDATE_REACTION,
        reaction
    }
}

export const deleteReaction = (reaction) => {
    return {
        type: DELETE_REACTION,
        reaction
    }
}

export const getAllLikesDislikes = () => async (dispatch) => {
    const response = await fetch(`/api/likesdislikes/`)
    const reactionData = await response.json()
    dispatch(loadReaction(reactionData))
}

export const getPostLikesDislikes = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}/reactions`)
    const reactionData = await response.json()
    dispatch(loadReaction(reactionData))
}
export const getLikeDislike = (reactionId) => async (dispatch) => {
    const response = await fetch(`/api/likesdislikes/${reactionId}`)
    const reactionData = await response.json()
    dispatch(loadReaction({ [reactionData.id]: reactionData }))
}

export const postLikeDislike = (reactionData) => async (dispatch) => {
    const response = await fetch(`/api/likesdislikes/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reactionData)
    })

    if (response.ok) {
        const newReaction = await response.json()
        dispatch(addReaction(newReaction))
    }
}

export const updateLikeDislike = (reactionId, reactionData) => async (dispatch) => {
    const response = await fetch(`/api/likesdislikes/${reactionId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reactionData)
    })

    if (response.ok) {
        const updatedReaction = await response.json()
        dispatch(addReaction(updatedReaction))
    }
}

export const deleteLikeDislike = (reactionId) => async (dispatch) => {
    const response = await fetch(`/api/likesdislikes/${reactionId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        const reactionData = await response.json()
        dispatch(deleteReaction(reactionData))
    }
}

export default function likeDislikeReducer(state = {}, action) {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_REACTION:
            return { ...newState, ...action.reaction }
        case ADD_REACTION:
            return newState[action.reaction.id] = action.reaction
        case UPDATE_REACTION:
            return newState[action.reaction.id] = action.reaction
        case DELETE_REACTION:
            delete newState[action.reactionId]
        default:
            return state
    }
}
