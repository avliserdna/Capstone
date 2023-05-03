from app.models import db, TeamSuggestion, environment, SCHEMA

def seed_team_suggestions():
    team_suggest1 = TeamSuggestion(
        user_id =3, map_id=1, character_id=7
    )

    team_suggest2 = TeamSuggestion(
        user_id =3, map_id=1, character_id="Pallas"
    )
    team_suggest3 = TeamSuggestion(
        user_id =3, map_id=1, character_id="Adnachiel"
    )
    team_suggest4 = TeamSuggestion(
        user_id =3, map_id=1, character_id="Hung"
    )
    team_suggest5 = TeamSuggestion(
        user_id =3, map_id=1, character_id="Exusiai"
    )
    team_suggest6 = TeamSuggestion(
        user_id =3, map_id=1, character_id="Ifrit"
    )

    team_suggest7 = TeamSuggestion(
        user_id =3, map_id=1, character_id="Goldenglow"
    )

    db.session.add(team_suggest1)
    db.session.add(team_suggest2)
    db.session.add(team_suggest3)
    db.session.add(team_suggest4)
    db.session.add(team_suggest5)
    db.session.add(team_suggest6)
    db.session.add(team_suggest7)
    db.session.commit()

def undo_team_suggestions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.teamsuggestions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM teamsuggestions")

    db.session.commit()
