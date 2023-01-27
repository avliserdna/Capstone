from app.models import db, TeamSuggestion, environment, SCHEMA

def seed_team_suggestions():
    team_suggest1 = TeamSuggestion(
        user_id =3, map_id=1, character_id=7
    )

    team_suggest2 = TeamSuggestion(
        user_id =3, map_id=1, character_id=1
    )
    team_suggest3 = TeamSuggestion(
        user_id =3, map_id=1, character_id=2
    )
    team_suggest4 = TeamSuggestion(
        user_id =3, map_id=1, character_id=3
    )
    team_suggest5 = TeamSuggestion(
        user_id =3, map_id=1, character_id=4
    )
    team_suggest6 = TeamSuggestion(
        user_id =3, map_id=1, character_id=5
    )

    team_suggest7 = TeamSuggestion(
        user_id =3, map_id=1, character_id=6
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
        db.session.execute(f"TRUNCATE table {SCHEMA}.team_suggestions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM team_suggestions")

    db.session.commit()
