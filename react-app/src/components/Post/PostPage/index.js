import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getSinglePost } from "../../../store/post";
import { getPostComments } from "../../../store/comment";
import { getCharacters } from "../../../store/character";
import { deletePost } from "../../../store/post";

const PostView = () => {
    const dispatch = useDispatch()
    const { postId } = useParams()
    const history = useHistory()
    const user = useSelector((store) => store.session.user)
    const post = useSelector((store) => store.post)
    const comments = useSelector((store) => Object.values(store.comment))
    useEffect(() => {
        dispatch(getSinglePost(postId))
        dispatch(getPostComments(postId))
        dispatch(getCharacters())
    }, [dispatch,])

    const deleteData = (e) => {
        dispatch(deletePost(post?.id))
        alert("Delete successful!")
        history.push('/')
    }

    return (
        <>
            <div className="post-container">
                <h2>{post?.title}</h2>
                {
                    user?.id === post?.author_id || user?.admin ? (
                        <button onClick={() => {
                            history.push(`/posts/${postId}/edit`)
                        }}>Edit Post</button>) : null
                }
                {
                    user?.id === post?.author.id || user?.admin ? (
                        <button onClick={(e) => deleteData(e)}>Delete Post</button>
                    ) : null
                }
                <body dangerouslySetInnerHTML={{ __html: post?.body }} />
            </div>

            <div className="comment-container">
                <h3>Comments</h3>
                {comments?.map((comment) => (
                    <>
                        <p>{comment?.body}</p>
                        <h4>{comment?.username}</h4>
                    </>
                ))}
            </div>
        </>
    )
}
export default PostView
