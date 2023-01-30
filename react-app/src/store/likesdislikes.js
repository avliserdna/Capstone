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
    const response = await fetch(`/api/likes_dislikes`)
}
