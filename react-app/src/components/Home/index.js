import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getPosts } from "../../store/post";
import { getAllLikesDislikes } from "../../store/likesdislikes";
import './index.css'

const AllPost = () => {
    const dispatch = useDispatch()
    const posts = useSelector((store) => {
        return Object.values(store.post)
    })

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    return (
        <>
            <img className="cc10" src="CC10Ashring.png" />
            <div className="home-body">

                <h1 className="header">Posts and Guides</h1>
                <div className="posts-container">
                    {posts?.map((post) => (
                        <>
                            <div className="post-holder">

                                <NavLink to={`/posts/${post?.id}`}>
                                    <h2 className="post-title">{post.title}</h2>
                                    <p>by {post?.username}</p>
                                </NavLink>
                                {/* <p>{post.body}</p> */}
                            </div>
                        </>
                    )

                    )}
                </div>
            </div>
        </>

    )
}
export default AllPost
