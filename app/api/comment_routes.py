from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Comment, db
from app.forms import CommentForm

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

@comment_routes.route('/<int:id>', method=["DELETE"])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)

    db.session.delete(comment)
    db.session.commit()
    return {"message": "deleted successfully"}
