import React, { useState } from "react";
import Popup from 'reactjs-popup'
import { useDispatch, useSelector } from "react-redux";
import { updateComment } from "../../../store/comment";
import './EditComment.css'
import { compose } from "redux";

const EditCommentForm = ({ close, comment }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state?.session.user)
    const [body, setBody] = useState(comment?.body)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (user?.id === comment?.user_id || user?.admin) {

            if (body) {
                const payload = {
                    body: body
                }
                const editedComment = dispatch(updateComment(comment?.id, payload))

                if (editedComment) {
                    close()
                }
            }
            else {
                // alert("Body must not be blank!")
            }
        }



    }

    const handleClose = async (e) => {
        e.preventDefault()
        close()
    }
    return (
        <div className='modal'>
            <button className="edit-close" onClick={(e) => handleClose(e)}>X</button>
            <div className='content'>
                <form className="edit-comment" onSubmit={handleSubmit}>
                    <h1 className="edit-text">Edit Comment</h1>
                    <input
                        className="comment-body"
                        type="string"
                        required
                        name="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}>
                    </input>
                    <button
                        className="comment-submit"
                        type="button"
                        onClick={handleSubmit}
                    // onClick={(e) => handleSubmit(e)}
                    >
                        Edit Comment
                    </button>
                </form>
            </div>
            {/* <div>
                <button onClick={() => close()}>
                    Close
                </button>
            </div> */}
        </div>
    )
}

export default EditCommentForm;
