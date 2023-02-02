import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getSinglePost } from "../../../store/post";
import { getPostComments } from "../../../store/comment";
import { getCharacters } from "../../../store/character";
import { removePost } from "../../../store/post";
import { postComment } from "../../../store/comment";
import { removeComment } from "../../../store/comment";
import Popup from 'reactjs-popup'
import EditCommentForm from "./EditComment";

const PostView = () => {
    const dispatch = useDispatch()
    const { postId } = useParams()
    const history = useHistory()
    const [body, setBody] = useState("")
    const user = useSelector((store) => store.session.user)
    const post = useSelector((store) => store.post)
    const comments = useSelector((store) => Object.values(store.comment))
    useEffect(() => {
        dispatch(getSinglePost(postId))
        dispatch(getPostComments(postId))
        dispatch(getCharacters())
        if (user === undefined) {
            user = {}
        }
    }, [dispatch,])

    const deleteData = (e) => {
        e.preventDefault()
        dispatch(removePost(post?.id))
        alert("Delete successful!")
        history.push('/')
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

    const handleDelete = (e, commentId) => {
        e.preventDefault()
        dispatch(removeComment(commentId))
    }


    //     <Popup trigger={<button>Edit Comment</button>} position="right center" modal nested>
    //     {
    //         close => (
    //             <div className='modal'>
    //                 <EditCommentForm close={close} comment={comment} />
    //             </div>
    //         )
    //     }
    // </Popup>
    return (
        <>
            <div className="post-container">
                <h2>{post?.title}</h2>
                <div>
                    {
                        user?.id === post?.author_id || user?.admin ? (
                            <button onClick={() => {
                                history.push(`/posts/${postId}/edit`)
                            }}>Edit Post</button>) : null
                    }
                </div>
                <div>
                    {
                        user?.id === post?.author_id || user?.admin ? (
                            <button onClick={(e) => deleteData(e)}>Delete Post</button>
                        ) : null
                    }
                </div>
                <body dangerouslySetInnerHTML={{ __html: post?.body }} />
            </div>

            <div className="comment-container">

                <h3>Comments</h3>
                <div>
                    <input
                        className="comment-body"
                        required
                        name="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}></input>
                    <button
                        className="comment-submit"
                        type="submit"
                        onClick={(e) => handleSubmit(e)}>Post Comment</button>
                </div>
                {comments?.map((comment) => (
                    <>
                        <p>{comment?.body}</p>
                        <h4>{comment?.username}</h4>

                        {user?.id === comment?.user_id ? <Popup trigger={<button>Edit Comment</button>} position="right center" modal nested>
                            {
                                close => (
                                    <div className='modal'>
                                        <EditCommentForm close={close} comment={comment} />
                                    </div>
                                )
                            }
                        </Popup> : false}
                        {user?.id === comment?.user_id ? <button className="comment-delete"
                            onClick={(e) => handleDelete(e, comment?.id)}>Delete Button</button> : null}
                    </>
                ))}
            </div>
        </>
    )
}
export default PostView
