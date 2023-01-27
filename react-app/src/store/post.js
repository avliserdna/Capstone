const GET_POST = "post/GET_POST";
const ADD_POST = "post/ADD_POST";
const UPDATE_POST = "post/UPDATE_POST";
const REMOVE_POST = "post/REMOVE_POST";

export const getPost = (post) => {
    return {
        type: GET_POST,
        post
    }
}

export const addPost = (post) => {
    return {
        type: ADD_POST,
        post
    }
}

export const deletePost = (post) => {
    return {
        type: REMOVE_POST,
        post
    }
}

export const updatePost = (post) => {
    return {
        type: UPDATE_POST,
        post
    }
}

export const getPosts = () => async (dispatch) => {
    const response = await fetch(`/api/posts/`)
    const postData = await response.json();
    dispatch(getPost(postData))
}

export const createPost = (postData) => async (dispatch) => {
    const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });

    if (response.ok) {
        const post = await response.json();
        dispatch(addPost(post))
    }
}

export const getSinglePost = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`)
    const postData = await response.json();
    dispatch(getPost(postData))
}

export const editPost = (id, postData) => async (dispatch) => {
    const response = await fetch(`/api/posts${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });

    if (response.ok) {
        const post = await response.json();
        dispatch(updatePost(post))
    }
}

export const removePost = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deletePost(id))
    }
}

export default function postReducer(state = {}, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_POST:
            return action.biz
        case ADD_POST:
            newState[action.post.id] = action.post;
            return newState
        case UPDATE_POST:
            newState[action.post.id] = action.post;
            return newState
        case REMOVE_POST:
            delete newState[action.post.id]
            return newState
        default:
            return state
    }
}
