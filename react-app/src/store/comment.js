const LOAD_COMMENT = 'comment/LOAD_COMMENT'
const ADD_COMMENT = 'comment/ADD_COMMENT'
const UPDATE_COMMENT = 'comment/EDIT_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'

export const loadComment = (comment) => {
    return {
        type: LOAD_COMMENT,
        comment
    }
}

export const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const editComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

export const deleteComment = (comment) => {
    return {
        type: DELETE_COMMENT,
        comment
    }
}

export const getAllComments = () => async (dispatch) => {
    const response = await fetch(`/api/comments/`)
    const commentData = await response.json();
    dispatch(loadComment(commentData))
}

export const getComment = (id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`)
    const commentData = await response.json();
    dispatch(loadComment(commentData))
}

export const postComment = (commentData) => async (dispatch) => {
    const response = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentData)
    })

    if (response.ok) {
        const commentData = await response.json()
        dispatch(addComment(commentData))
    }
}

export const updateComment = (commentId, commentData) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentData)
    })

    if (response.ok) {
        const commentData = await response.json()
        dispatch(editComment(commentData))
    }
}

export const removeComment = (commentId) => async (dispatch) => {
    const repsonse = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(removeComment(commentId))
    }
}

export default function commentReducer(state = {}, action) {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_COMMENT:
            return action.comment
        case ADD_COMMENT:
            return newState[action.comment.id] = action.comment
        case UPDATE_COMMENT:
            return newState[action.comment.id] = action.comment
        case DELETE_COMMENT:
            delete newState[action.commentid]
            return newState
        default:
            return state
    }
}
