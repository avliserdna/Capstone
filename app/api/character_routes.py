from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Character, db
# from app.forms import CharacterForm

character_routes = Blueprint('characters', __name__)

#Get a Character
@character_routes.route('/<int:id>')
def get_character(id):
    character = Character.query.get(id)
    return character.to_dict()

#Get All characters

@character_routes.route('')
def get_all_characters():
    characters = Character.query.all()
    return {character.id: character.to_dict() for character in characters}
