from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import PostedMap, db
from app.forms import PostedMapForm

posted_map_routes = Blueprint('posted_maps', __name__)

@posted_map_routes.route('/', methods=['GET'])
def get_posted_maps():
    posted_maps = PostedMap.query.all()
    return {posted_map.id: posted_map.to_dict() for posted_map in posted_maps}

@posted_map_routes.route('/', methods=['POST'])
@login_required
def create_posted_map():
    posted_map_data = request.json

    new_posted_map = PostedMap(**posted_map_data, user_id=current_user.id)

    db.session.add(new_posted_map)
    db.session.commit()

    return new_posted_map.to_dict()

@posted_map_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_posted_map(id):
    form = PostedMapForm()
    posted_map = PostedMap.query.get(id)

    posted_map.user_id = form.data['user_id']
    posted_map.map_id = form.data['map_id']

    db.session.commit()

    return posted_map.to_dict()

@posted_map_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_posted_map(id):
    posted_map = PostedMap.query.get(id)

    db.session.delete(posted_map)
    db.session.commit()
    return {"message": "deleted successfully"}
