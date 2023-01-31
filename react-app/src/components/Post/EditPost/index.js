import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { updatePost } from "../../../store/post";
import ReactQuill from 'react-quill'
import 'quill/dist/quill.snow.css'

const EditPost = () => {
    const { postId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user)
    const post = useSelector((state) => state.post[postId])
    const [title, setTitle] = useState(post?.tile)
    const [userId, setUserId] = useState(sessionUser?.id)
    const [body, setBody] = useState(post?.body)
    // const { quill, quillRef } = useQuill()
    // var quill = new Quill('#editor', {
    //     theme: 'snow'
    // });

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (sessionUser) {
            setUserId(sessionUser?.id)
            //user_id =: userId
            const payload = {
                title: title,
                body: body
            }
            const newPost = dispatch(updatePost(payload))

            if (newPost) {
                alert("Successfully created updated Post!")
                setTitle("")
                setBody("")
                history.push('/')
            }
        }
        else {
            window.confirm("Must be signed in to create a post!")
            history.push('/login')
        }


    }

    return (
        <>
            <div className="post-container">
                <h1>Write New Post</h1>
                <form className="post-form" onSubmit={handleSubmit}>
                    <label>Set Title: </label>
                    <input
                        className="post-title"
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <ReactQuill theme="snow" value={body} onChange={setBody} />

                    <button className="post-button" type="submit">
                        Create Post
                    </button>
                </form>

            </div>


        </>
    )
}

export default EditPost;
