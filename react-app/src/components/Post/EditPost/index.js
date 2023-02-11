import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { editPost, getSinglePost } from "../../../store/post";
import ReactQuill from 'react-quill'
import 'quill/dist/quill.snow.css'
import './EditPost.css'

const EditPost = () => {
    const { postId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user)
    const post = useSelector((state) => state.post[postId])
    const [title, setTitle] = useState(post.title)
    const [userId, setUserId] = useState(sessionUser?.id)
    const [body, setBody] = useState(post.body)

    useEffect(() => {
        if (!sessionUser) {
            history.push('/')
        }

        dispatch(getSinglePost(postId))
    }, [dispatch])



    const handleSubmit = async (e) => {
        e.preventDefault()
        if (sessionUser?.id === post?.author_id || sessionUser.admin) {
            const payload = {
                title: title,
                body: body
            }
            const updatedPost = dispatch(editPost(postId, payload))

            if (updatedPost) {
                alert("Successfully updated Post!")
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
                <h1>Update Your Post</h1>
                <form className="post-form" onSubmit={handleSubmit}>
                    <label className="post-label">Set Title: </label>
                    <input
                        className="post-title-form"
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <ReactQuill className="edit-post-body" theme="snow" value={body} onChange={setBody} />

                    <button className="post-button" type="submit">
                        Update Post
                    </button>
                </form>

            </div>


        </>
    )
}

export default EditPost;
