from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Comment, db, LikeDislike
from app.forms import CommentForm, LikeDislikeForm

comment_routes = Blueprint('comments', __name__)

# Edit Comment
@comment_routes.route('/<int:id>', method=["PUT"])
@login_required
def update_comment(id):
    form = CommentForm()
    comment = Comment.query.get(id)
    comment.body = form.data['body']

    db.session.commit(comment)
    return comment.to_dict()

# Delete comment
@comment_routes.route('/<int:id>', method=["DELETE"])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)

    db.session.delete(comment)
    db.session.commit()
    return {"message": "deleted successfully"}

#First Time Reaction for Like-Dislike
@comment_routes.routes('/<int:id>', method=['POST'])
@login_required
def react_comment(id):
    current_user_id = int(current_user.get_id())
    form = LikeDislikeForm()

    react = LikeDislike(
        comment_id = id,
        user_id = current_user_id,
        like = form.data['like'],
        dislike = form.data['dislike']
    )
    # paranoid function
    db.session.add(react)
    db.session.commit()
    return react.to_dict()
