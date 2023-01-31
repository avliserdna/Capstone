import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getSinglePost } from "../../../store/post";
import { getPostComments } from "../../../store/comment";

const PostView = () => {
    const dispatch = useDispatch()
    const { postId } = useParams()
    const history = useHistory()
    const post = useSelector((store) => store.post)
    const comments = useSelector((store) => Object.values(store.comment))
    useEffect(() => {
        dispatch(getSinglePost(postId))
        dispatch(getPostComments(postId))
    }, [dispatch,])

    return (
        <>
            <div className="post-container">
                <h2>{post?.title}</h2>
                <button>Edit Post</button>
                <button>Delete Post</button>
                <body dangerouslySetInnerHTML={{ __html: post?.body }} />
            </div>

            <div className="comment-container">
                {comments?.map((comment) => (
                    <>
                        <p>{comment?.body}</p>
                    </>
                ))}
            </div>
        </>
    )
}
export default PostView
