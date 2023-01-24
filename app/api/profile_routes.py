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
