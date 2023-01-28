from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import LikeDislike, db
from app.forms import LikeDislikeForm

likedislike_routes = Blueprint('likes_dislikes', __name__)

# Get all Like/Dislikes
@likedislike_routes.route('')
def get_all_likedislikes():
    likedislikes = LikeDislike.query.all()
    return {likedislike.id: likedislikes.to_dict() for likedislike in likedislikes}

# Get a Like/Dislike
@likedislike_routes.route('/<int:id>')
def get_likedislike(id):
    likedislike = LikeDislike.query.get(id)
    return likedislike.to_dict()

# Edit a Like/Dislike
@likedislike_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_likeDislike(id):
    form = LikeDislikeForm()
    likeDislike = LikeDislike.query.get(id)
    likeDislike.like = form.data['like']
    likeDislike.dislike = form.data['dislike']

    db.session.commit(likeDislike)
    return likeDislike.to_dict()
