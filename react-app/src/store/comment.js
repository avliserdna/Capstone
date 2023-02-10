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

export const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

export const getPostComments = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/comments`)
    const commentData = await response.json();
    console.log(commentData, "<=== COMMENT DATA")
    dispatch(loadComment({ [commentData.id]: commentData }))
}

export const getComment = (id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`)
    const commentData = await response.json();
    dispatch(loadComment({ [commentData.id]: commentData }))
}

export const postComment = (postId, commentData) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/comments`, {
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
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(deleteComment(commentId))
    }
}

export default function commentReducer(state = {}, action) {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_COMMENT:
            return { ...newState, ...action.comment }
        case ADD_COMMENT:
            newState[action.comment.id] = action.comment
            return newState
        case UPDATE_COMMENT:
            newState[action.comment.id] = action.comment
            return newState
        case DELETE_COMMENT:
            delete newState[action.commentId]
            return newState
        default:
            return state
    }
}
