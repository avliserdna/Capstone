from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import TeamSuggestion, db
from app.forms import TeamSuggestionForm

team_suggestion_routes = Blueprint('teamsuggestions', __name__)
#    current_user_id = int(current_user.get_id())
#     team_suggestions_data = request.json
@team_suggestion_routes.route('/')
def team_suggestions():

    team_suggestions = TeamSuggestion.query.all()
    return {team_suggestion.id: team_suggestion.to_dict() for team_suggestion in team_suggestions}

@team_suggestion_routes.route('/', methods=['POST'])
@login_required
def add_team_suggestion():
    map_id = request.json["map_id"]
    characters = request.json["character_ids"]
    # iterate through list of suggestions here NOT in the front end
    for api_id in characters:
        new_team_suggestion = TeamSuggestion( map_id = map_id, user_id = current_user.id, character_id = api_id)
        db.session.add(new_team_suggestion)

    db.session.commit()
    return new_team_suggestion.to_dict()

@team_suggestion_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_team_suggestion(id):
    form = TeamSuggestionForm()
    team_suggestion = TeamSuggestion.query.get(id)

    team_suggestion.user_id = form.data['user_id']
    team_suggestion.map_id = form.data['map_id']
    db.session.commit()

    return team_suggestion.to_dict()

@team_suggestion_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_team_suggestion(id):
    team_suggestion = TeamSuggestion.query.get(id)

    db.session.delete(team_suggestion)
    db.session.commit()

    return {"message": "deleted successfully"}
