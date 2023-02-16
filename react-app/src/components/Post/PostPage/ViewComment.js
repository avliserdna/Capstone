import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getComment, getPostComments } from "../../../store/comment";
import { postComment } from "../../../store/comment";
import { removeComment } from "../../../store/comment";
// import { getCommentLikesDislikes } from "../../../store/likesdislikes";
// import { getUserLikesDislikes } from "../../../store/likesdislikes";
import Popup from 'reactjs-popup'
import EditCommentForm from "./EditComment";


const Comment = ({ commentId, reaction }) => {
    const dispatch = useDispatch()
    const comment = useSelector((store) => store.comment[commentId])
    const user = useSelector((store) => store.session.user)
    // const reactions = useSelector((store) => Object.values(store.reaction))
    const [like, setLike] = useState(reaction?.like)
    const [dislike, setDislike] = useState(reaction?.dislike)
    console.log(reaction, "reaction")
    // console.log(userReaction, "user REaction")
    useEffect(() => {
        // dispatch(getCommentLikesDislikes(comment?.id))
        if (reaction) {
            setLike(reaction.like)
            setDislike(reaction.dislike)
        }
    }, [dispatch, reaction])
    const handleDelete = (e, commentId) => {
        e.preventDefault()
        dispatch(removeComment(commentId))
    }
    console.log(like, "like")
    console.log(dislike, "dislike")
    return (<>
        <div class="comment">

            <h4>{comment?.username}</h4>
            <p>{comment?.body}</p>
            {/* <FontAwesomeIcon icon="fa-solid fa-thumbs-up" /> */}
            <div className="reaction-buttons">
                <span className="like-button"> {like ? <i class="fa-solid fa-thumbs-up"> </i> : <i class="fa-regular fa-thumbs-up"></i>}</span>
                <span className="dislike-button"> {dislike ? <i class="fa-solid fa-thumbs-down"></i> : <i class="fa-regular fa-thumbs-down"></i>}</span>
            </div>


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
