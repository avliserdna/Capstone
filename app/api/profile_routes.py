from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Profile, db
from app.forms import ProfileForm

profile_routes = Blueprint('profiles', __name__)

#Get All Profiles
@profile_routes.route('/')
def get_all_profiles():
    profiles = Profile.query.all()
    return {profile.id: profile.to_dict() for profile in profiles}

# Get a Profile
@profile_routes.route('/<int:id>')
def get_a_profile(id):
    profile = Profile.query.get(id)

    return profile.to_dict()

# Create a Profile
@profile_routes.route('/', methods=['POST'])
def create_profile():
    profile_data = request.json

    new_profile = Profile(**profile_data, user_id = current_user.id)

    db.session.add(new_profile)
    db.session.commit()

    return new_profile.to_dict()

# Edit a Profile
@profile_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_profile(id):
    form = ProfileForm()
    profile = Profile.query.get(id)

    profile.username = form.data['username']
    profile.about_me = form.data['about_me']

    db.session.commit()

    return profile.to_dict()

# Delete a Profile
@profile_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_profile(id):
    profile = Profile.query.get(id)

    db.session.delete(profile)
    db.session.commit()

    return {"message": "deleted successfully"}
