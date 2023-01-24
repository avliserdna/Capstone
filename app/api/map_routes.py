from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Map, db
from app.forms import MapForm

map_routes = Blueprint('maps', __name__)

# Get All Maps
@map_routes.route('/', __name__)
def get_all_maps():
    maps = Map.query.all()
    return {map.id: map.to_dict() for map in maps}

# Get a Map
@map_routes.route('/<int:id>')
def get_a_map(id):
    map = Map.query.get(id)

    return map.to_dict()

# Post a Map
@map_routes.route('/', method=['POST'])
@login_required
def create_a_map():
    map_data = request.json

    new_map = Map(**map_data, user_id=current_user.id)

    db.session.add(new_map)
    db.session.commit()

    return new_map.to_dict()

# Edit a Map
@map_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_map(id):
    form = MapForm()
    map = Map.query.get(id)

    map.name = form.data['name']
    map.description = form.description['description']
    map.image = form.data['image']

    db.session.commit()

    return map.to_dict()

@map_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_map(id):
    map = Map.query.get(id)

    db.session.delete(map)
    db.session.commit()

    return {"message": "deleted successfully"}
