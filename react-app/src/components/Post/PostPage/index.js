import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getSinglePost } from "../../../store/post";

const PostView = () => {
    const dispatch = useDispatch()
    const { postId } = useParams()
    const history = useHistory()
    const post = useSelector((store) => store.post)

    useEffect(() => {
        dispatch(getSinglePost(postId))
    }, [dispatch,])

    return (
        <>
            <div className="post-container">
                <h2>{post?.title}</h2>
                <body dangerouslySetInnerHTML={{ __html: post?.body }} />
            </div>
        </>
    )
}
export default PostView
