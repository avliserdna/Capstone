from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Post, Comment, db
from app.forms import PostForm, CommentForm

post_routes = Blueprint('posts', __name__)

# Get All Posts
@post_routes.route('/',methods=["GET"])
def get_all_posts():
    posts = Post.query.all()
    return {post.id: post.to_dict() for post in posts}

# Get A Post
@post_routes.route('/<int:id>')
def get_a_post(id):
    post = Post.query.get(id)

    return post.to_dict()

# Create Post
@post_routes.route('/', methods=["POST"])
@login_required
def create_post():
    post_data = request.json
    new_post = Post(**post_data, author_id=current_user.id)

    db.session.add(new_post)
    db.session.commit()

    return new_post.to_dict()

# Edit Post
@post_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_post(id):
    form = PostForm()
    post = Post.query.get(id)

    post.title = form.data['title']
    post.body = form.data['body']

    db.session.commit()

    return post.to_dict()

# Delete Post
@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)

    db.session.delete(post)
    db.session.commit()

    return {"message": "deleted successfully"}

# Get all post's comments
@post_routes.route('/<int:id>/comments')
def get_post_comments(id):
    comments = Comment.query.filter(Comment.post_id == id).all()

    return {comment.id: comment.to_dict() for comment in comments}

# Post a comment
@post_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def create_comment(id):
    current_user_id = int(current_user.get_id())
    form = CommentForm()
    comment = Comment(
        user_id = current_user_id,
        post_id = id,
        body = form.data['body']
    )

    db.session.add(comment)
    db.session.commit()
    return comment.to_dict_basic()
