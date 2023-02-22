const LOAD_REACTION = 'likedislike/LOAD_REACTION'
const ADD_REACTION = 'likedislike/ADD_REACTION'
const UPDATE_REACTION = 'likedislike/UPDATE_REACTION'
const DELETE_REACTION = 'likedislike/DELETE_REACTION'
const EMPTY_REACTION = 'likedislike/EMPTY_REACTION'

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

export const emptyReaction = () => {
    return {
        type: EMPTY_REACTION,
        reaction: {}
    }
}

export const getAllLikesDislikes = () => async (dispatch) => {
    const response = await fetch(`/api/likesdislikes/`)
    const reactionData = await response.json()
    dispatch(loadReaction(reactionData))
}
// Only need Logged in users Reactions/ Likes and Dislikes
export const getUserLikesDislikes = (userId) => async (dispatch) => {
    const response = await fetch(`/api/likesdislikes/users/${userId}`)
    const reactionData = await response.json()
    dispatch(loadReaction(reactionData))
}

export const getCommentLikesDislikes = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}/reactions`)
    const reactionData = await response.json()
    dispatch(loadReaction(reactionData))
}
export const getLikeDislike = (reactionId) => async (dispatch) => {
    const response = await fetch(`/api/likesdislikes/${reactionId}`)
    const reactionData = await response.json()
    dispatch(loadReaction({ [reactionData.comment_id]: reactionData }))
}

export const postLikeDislike = (commentId, reactionData) => async (dispatch) => {
    const response = await fetch(`/api/likesdislikes/${commentId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reactionData)
    })
    console.log(response)
    if (response.ok) {
        const newReaction = await response.json()
        dispatch(addReaction(newReaction))
    }
}

export const updateLikeDislike = (commentId, reactionData) => async (dispatch) => {
    const response = await fetch(`/api/likesdislikes/${commentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reactionData)
    })
    console.log(response)

    if (response.ok) {
        const updatedReaction = await response.json()
        dispatch(updateReaction(updatedReaction))
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
            newState[action.reaction.comment_id] = action.reaction
            return newState
        case UPDATE_REACTION:
            newState[action.reaction.comment_id] = action.reaction
            return newState
        case DELETE_REACTION:
            delete newState[action.reactionId]
        case EMPTY_REACTION:
            return {}
        default:
            return state
    }
}
