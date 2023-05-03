import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getSinglePost } from "../../../store/post";
import { getPostComments } from "../../../store/comment";
import { getCharacters } from "../../../store/character";
import { removePost } from "../../../store/post";
import { postComment } from "../../../store/comment";
import Pagination from "./Pagination";
// import { removeComment } from "../../../store/comment";
// import { getCommentLikesDislikes } from "../../../store/likesdislikes";
// import Popup from 'reactjs-popup'
// import EditCommentForm from "./EditComment";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getSinglePostedMap } from "../../../store/postedmaps";
import { getUserLikesDislikes } from "../../../store/likesdislikes";
import './index.css'
import Comment from "./ViewComment";
import CharacterSuggestion from "./CharacterSuggestion";
import { getUserSuggestion } from "../../../store/teamsuggestion";
import { getSingleMap } from "../../../store/map";
import { getMapSuggestions } from "../../../store/teamsuggestion";


const PostView = () => {
    const dispatch = useDispatch()
    const { postId } = useParams()
    const history = useHistory()
    const [body, setBody] = useState("")
    let user = useSelector((store) => store.session.user)
    const post = useSelector((store) => store.post[postId])
    const comments = useSelector((store) => Object.values(store.comment))
    const postComments = comments.filter((comment) => comment.post_id == postId)
    const reactions = useSelector((store) => store.reaction)
    // const userSuggestion = useSelector((store) => {
    //     Array(store.suggestion).filter(user_id === user.id)
    // }
    // )
    const postSuggestions = useSelector((store => store.suggestion))

    const postMap = useSelector((state) => state.postMap)
    // Pagination Stuff
    useEffect(() => {
        dispatch(getSinglePost(postId))
        dispatch(getPostComments(postId))
        dispatch(getCharacters())
        dispatch(getUserLikesDislikes(user?.id))
        dispatch(getSinglePostedMap(post?.author_id))
        if (user === undefined || user === null) {
            user = {}
        }
        dispatch(getMapSuggestions(postMap.map_id))
        dispatch(getSingleMap(postMap.map_id))

        // dispatch(ge)
    }, [dispatch])

    const deleteData = (e) => {
        e.preventDefault()
        dispatch(removePost(post?.id))
        alert("Delete successful!")
        history.push('/')
    }

    const hasCharacterSuggestion = () => {
        // return userSuggestion.filter((suggestion) => suggestion.map_id === postMap.map_id).length
        console.log(postSuggestions)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (user?.id) {
            const payload = {
                user_id: user?.id,
                body: body
            }

            const postedComment = dispatch(postComment(postId, payload))
            setBody("")
        }
    }

    return (
        <>

            <div className="post-container">
                <h1>{post?.title}</h1>
                <div className="post-edit-delete">
                    {
                        user?.id === post?.author_id || user?.admin ? (
                            <button className="post-button" onClick={() => {
                                history.push(`/posts/${postId}/edit`)
                            }}>Edit Post</button>) : null
                    }

                    {
                        user?.id === post?.author_id || user?.admin ? (
                            <button className="post-button" onClick={(e) => deleteData(e)}>Delete Post</button>
                        ) : null
                    }
                </div>


                <body dangerouslySetInnerHTML={{ __html: post?.body }} />
            </div>
            <div className="suggested-characters">
                <h1>Recommended Characters</h1>

            </div>
            {user ?
                hasCharacterSuggestion() ? <div>Has Characters!</div> :
                    < div className="character-suggestion">
                        <CharacterSuggestion mapId={postMap[post?.author_id]?.map_id} />
                    </div> :
                < div >
                    <h2>Wanna suggest a character? Sign up!</h2>
                </div>
            }


            <div className="comment-container">
                {user ? <form className="comment-form" onSubmit={handleSubmit}>
                    <h2>Comments</h2>

                    <input
                        className="comment-body"
                        required
                        type="textarea"
                        name="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}></input>
                    <button
                        className="comment-submit"
                        type="submit"
                    // onClick={(e) => handleSubmit(e)}
                    >Post Comment
                    </button>
                </form> : <h2 className="comment-link">Only <NavLink to='/login' exact={true} activeClassName='active'> logged in </NavLink> in users can post comments!</h2>}
                {postComments?.length > 0 ? postComments?.map((comment) => (
                    <Comment commentId={comment?.id} reaction={reactions[comment?.id]} />
                )) : <h2>No comments made for this post! Be the first one to comment.</h2>}
            </div>

        </>
    )
}
export default PostView
