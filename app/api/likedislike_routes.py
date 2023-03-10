from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import LikeDislike, db
from app.forms import LikeDislikeForm

likedislike_routes = Blueprint('likesdislikes', __name__)

# Get all Like/Dislikes
@likedislike_routes.route('/')
def get_all_likedislikes():
    likedislikes = LikeDislike.query.all()
    return {likedislike.id: likedislike.to_dict() for likedislike in likedislikes}

# Get a Like/Dislike
@likedislike_routes.route('/<int:id>')
def get_likedislike(id):
    likedislike = LikeDislike.query.get(id)
    return likedislike.to_dict()

# Set a Like/Dislike whether it exists or not
@likedislike_routes.route('/<int:id>', methods=['POST', 'PUT'])
@login_required
def set_likeDislike(id):
    current_user_id = int(current_user.get_id())
    form = LikeDislikeForm()
    likeDislike = LikeDislike.query.get(id)
    if likeDislike:
        likeDislike.like = form.data['like']
        likeDislike.dislike = form.data['dislike']
        db.session.commit()
        return likeDislike.to_dict()
    else:
        react = LikeDislike(
        comment_id = id,
        user_id = current_user_id,
        like = form.data['like'],
        dislike = form.data['dislike']
    )
        return react.to_dict()

#Get Users Like/Dislike
@likedislike_routes.route('/users/<int:id>')
def get_users_likedislike(id):
    reactions = LikeDislike.query.filter(LikeDislike.user_id == id)

    return {reaction.comment_id: reaction.to_dict() for reaction in reactions}
