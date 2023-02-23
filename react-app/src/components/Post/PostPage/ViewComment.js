import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getComment, getPostComments } from "../../../store/comment";
import { postComment } from "../../../store/comment";
import { removeComment } from "../../../store/comment";
import { postLikeDislike, updateLikeDislike } from "../../../store/likesdislikes";
// import { getCommentLikesDislikes } from "../../../store/likesdislikes";
// import { getUserLikesDislikes } from "../../../store/likesdislikes";
import Popup from 'reactjs-popup'
import EditCommentForm from "./EditComment";


const Comment = ({ commentId, reaction }) => {
    const dispatch = useDispatch()
    const comment = useSelector((store) => store.comment[commentId])
    const user = useSelector((store) => store.session.user)
    // const reactions = useSelector((store) => Object.values(store.reaction))
    const [like, setLike] = useState(reaction?.like || false)
    const [dislike, setDislike] = useState(reaction?.dislike || false)
    // console.log(userReaction, "user REaction")
    useEffect(() => {
        // dispatch(getCommentLikesDislikes(comment?.id))
        if (reaction) {
            setLike(reaction.like)
            setDislike(reaction.dislike)
        }

    }, [dispatch, reaction])

    useEffect(() => {

        if (reaction) {
            reaction.like ? console.log("liked!") : console.log("not liked!")
            reaction.dislike ? console.log("disliked!") : console.log("not disliked")
        }
    }, [like, dislike])
    const handleDelete = (e, commentId) => {
        e.preventDefault()
        dispatch(removeComment(commentId))
    }


    const handleLike = () => {
        const payload = {
            user_id: user.id,
            comment_id: commentId,
            like: like,
            dislike: dislike
        }
        if (like) {
            setLike(false)
            payload.like = false
        }
        else {
            setLike(true)
            payload.like = true
            if (dislike) {
                setDislike(false)
                payload.dislike = false
            }
        }

        if (reaction) {
            dispatch(updateLikeDislike(commentId, payload))
        }
        else {
            dispatch(postLikeDislike(commentId, payload))
        }
        // return payload
    }

    const handleDislike = () => {
        const payload = {
            user_id: user.id,
            comment_id: commentId,
            like: like,
            dislike: dislike
        }
        if (dislike) {
            setDislike(false)
            payload.dislike = false
        }
        else {
            setDislike(true)
            payload.dislike = true
            if (like) {
                setLike(false)
                payload.like = false
            }
        }

        if (reaction) {
            dispatch(updateLikeDislike(reaction.id, payload))
        }
        else {
            dispatch(postLikeDislike(commentId, payload))
        }
    }

    // (e) => {
    //     if (reaction) {
    //         if (reaction.like) {
    //             console.log("has been liked!")
    //             setLike(false)
    //             // return handleSubmit(e)
    //         }
    //         else {
    //             console.log("has not been liked!")
    //             setLike(true)
    //             setDislike(false)
    //             // return handleSubmit(e)
    //         }
    //     }
    //     else {
    //         setLike(true)
    //         // return handleSubmit(e)
    //     }
    //     // reaction ? setLike(false) : setLike(true)

    // }
    return (<>
        <div class="comment">

            <h4>{comment?.username}</h4>
            <p>{comment?.body}</p>
            {/* <FontAwesomeIcon icon="fa-solid fa-thumbs-up" /> */}
            {user ? <div className="reaction-buttons">
                <span name="like" onClick={handleLike} className="like-button"> {like ? <i class="fa-solid fa-thumbs-up"> </i> : <i class="fa-regular fa-thumbs-up"></i>}</span>
                <span name="dislike" onClick={handleDislike} className="dislike-button"> {dislike ? <i class="fa-solid fa-thumbs-down"></i> : <i class="fa-regular fa-thumbs-down"></i>}</span>
            </div> : null}


            {user?.id === comment?.user_id ? <Popup trigger={<button className="comment-submit">Edit Comment</button>} position="right center" modal nested>
                {
                    close => (
                        <div className='modal'>
                            <EditCommentForm close={close} comment={comment} />
                        </div>
                    )
                }
            </Popup> : false}
            {user?.id === comment?.user_id ? <button className="comment-submit"
                onClick={(e) => handleDelete(e, comment?.id)}>Delete Comment</button> : null}
        </div>
    </>)
}
export default Comment
