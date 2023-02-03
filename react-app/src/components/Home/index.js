import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getPosts } from "../../store/post";
import { getAllLikesDislikes } from "../../store/likesdislikes";

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
            <h1>Apple Pie's Posts</h1>
            <div className="posts-container">
                {posts?.map((post) => (
                    <>
                        <div className="post-holder">

                            <NavLink to={`/posts/${post?.id}`}>
                                <h2>{post.title}</h2>
                            </NavLink>
                            {/* <p>{post.body}</p> */}
                        </div>
                    </>
                )

                )}
            </div>
        </>
    )
}
export default AllPost
