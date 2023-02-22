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
    console.log(reaction, "reaction")
    console.log(like, "like")
    console.log(dislike, "dislike")
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
            handleSubmit()
        }
    }, [like, dislike])
    const handleDelete = (e, commentId) => {
        e.preventDefault()
        dispatch(removeComment(commentId))
    }


    const handleSubmit = () => {
        const payload = {
            user_id: user.id,
            comment_id: commentId,
            like: like,
            dislike: dislike
        }

        if (reaction) {
            console.log("You already reacted!")
            dispatch(updateLikeDislike(reaction.id, payload))
        }
        else {
            console.log("you did NOT react yet")
            dispatch(postLikeDislike(commentId, payload))
        }
    }
    return (<>
        <div class="comment">

            <h4>{comment?.username}</h4>
            <p>{comment?.body}</p>
            {/* <FontAwesomeIcon icon="fa-solid fa-thumbs-up" /> */}
            {user ? <div className="reaction-buttons">
                <span name="like" onClick={(e) => {
                    if (reaction) {
                        if (reaction.like) {
                            console.log("has been liked!")
                            setLike((e) => false)
                            // return handleSubmit(e)
                        }
                        else {
                            console.log("has not been liked!")
                            setLike(((e) => true))
                            setDislike(((e) => false))
                            // return handleSubmit(e)
                        }
                    }
                    else {
                        setLike(((prev) => true))
                        // return handleSubmit(e)
                    }
                    // reaction ? setLike(false) : setLike(true)

                }} className="like-button"> {like ? <i class="fa-solid fa-thumbs-up"> </i> : <i class="fa-regular fa-thumbs-up"></i>}</span>
                <span name="dislike" onClick={(e) => {
                    if (reaction) {
                        if (reaction.dislike) {
                            setDislike(false)
                            // return handleSubmit(e)
                        }
                        else {
                            setDislike(true)
                            setLike(false)
                            // return handleSubmit(e)
                        }
                    }
                    else {
                        setDislike(true)
                        // return handleSubmit(e)
                    }
                    return handleSubmit(e)
                }} className="dislike-button"> {dislike ? <i class="fa-solid fa-thumbs-down"></i> : <i class="fa-regular fa-thumbs-down"></i>}</span>
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
