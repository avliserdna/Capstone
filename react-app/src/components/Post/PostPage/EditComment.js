import React, { useState } from "react";
import Popup from 'reactjs-popup'
import { useDispatch, useSelector } from "react-redux";
import { updateComment } from "../../../store/comment";

const EditCommentForm = ({ close, comment }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state?.session.user)
    const [body, setBody] = useState(comment?.body)

    const handleSubmit = async (e) => {
        if (user?.id === comment?.user_id || user?.admin) {
            const payload = {
                body: body
            }
            const editedComment = dispatch(updateComment(comment?.id, payload))

            if (editedComment) {
                close()
            }
        }


    }
    return (
        <div className='modal'>
            <div className='content'>
                <form className="edit-comment">
                    <h1>Edit Comment</h1>
                    <input
                        className="comment-body"
                        type="string"
                        required
                        name="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}>
                    </input>
                    <button
                        className="comment-button"
                        type="button"
                        onClick={(e) => handleSubmit(e)}>
                        Edit Comment
                    </button>
                </form>
            </div>
            <div>
                <button onClick={() => close()}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default EditCommentForm;
