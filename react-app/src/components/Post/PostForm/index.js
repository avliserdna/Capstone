import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { createPost } from "../../../store/post";
import ReactQuill from 'react-quill'
import 'quill/dist/quill.snow.css'
import './index.css'

const PostForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user)
    const [title, setTitle] = useState("")
    const [userId, setUserId] = useState(sessionUser.id)
    const [body, setBody] = useState("")
    // const { quill, quillRef } = useQuill()
    // var quill = new Quill('#editor', {
    //     theme: 'snow'
    // });

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (sessionUser) {
            setUserId(sessionUser?.id)
            console.log("success")
            //user_id =: userId
            const payload = {
                title: title,
                body: body
            }
            console.log(userId)
            console.log(body)
            const newPost = dispatch(createPost(payload))

            if (newPost) {
                alert("Successfully created new Post!")
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
                        className="post-title-form"
                        type="text"
                        required
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <ReactQuill theme="snow" className="post-body" value={body} onChange={setBody} required />

                    <button className="post-button" type="submit">
                        Create Post
                    </button>
                </form>

            </div>


        </>
    )
}

export default PostForm;
