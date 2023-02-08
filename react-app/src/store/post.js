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

export const deletePost = (postId) => {
    return {
        type: REMOVE_POST,
        postId
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
    console.log(postData)
    return dispatch(getPost(postData))
}

export const createPost = (postData) => async (dispatch) => {
    const response = await fetch("/api/posts/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });

    if (response.ok) {
        const post = await response.json();
        return dispatch(addPost(post))
    }
}

export const getSinglePost = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`)
    const postData = await response.json();
    console.log(postData, "single new post")
    return dispatch(getPost({ [postData.id]: postData }))
}

export const editPost = (id, postData) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });

    if (response.ok) {
        const post = await response.json();
        return dispatch(updatePost(post))
    }
}

export const removePost = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        return dispatch(deletePost(id))
    }
}

export default function postReducer(state = {}, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_POST:
            return {
                ...newState, ...action.post
            }
        case ADD_POST:
            newState[action.post.id] = action.post;
            return newState
        case UPDATE_POST:
            newState[action.post.id] = action.post;
            return newState
        case REMOVE_POST:
            delete newState[action.postId]
            return newState
        default:
            return state
    }
}
