from app.models import db, TeamSuggestion, environment, SCHEMA

def seed_team_suggestions():
    team_suggest1 = TeamSuggestion(
        user_id =3, map_id=1, characters_ids=['Surtr', 'Kroos', 'Myrtle', 'Bagpipe', 'Silverash', 'Specter', 'Elysium']
    )

    team_suggest2 = TeamSuggestion(
        user_id =3, map_id=1, characters_ids=['Ling', 'Skadi-Corrupting-Heart', 'Myrtle', 'Bagpipe', 'Noir-Corne', 'Yato', 'Elysium']
    )
    team_suggest3 = TeamSuggestion(
        user_id =3, map_id=1, characters_ids=['Nearl-Radiant-Knight', 'Kroos', 'Warfarin', 'Ptilopsis', 'Silverash', 'Specter', 'Elysium']
    )
    team_suggest4 = TeamSuggestion(
        user_id =3, map_id=1, characters_ids=['Saria', 'Nian', 'Hoshiguma', 'Blemishine', 'Horn', 'Gummy', 'Mudrock']
    )
    team_suggest5 = TeamSuggestion(
        user_id =3, map_id=1, characters_ids=['Specter-Unchained', 'Gladiia', 'Skadi', 'Andreana', 'Myrtle', 'Bagpipe', 'Elysium']
    )
    team_suggest6 = TeamSuggestion(
        user_id =3, map_id=1, characters_ids=['Phantom', 'Projekt-Red', 'Gavial', 'Jaye', 'Lee', 'Kafka', 'Bena']
    )

    team_suggest7 = TeamSuggestion(
        user_id =3, map_id=1, characters_ids=['Fang', 'Asbestos', 'Popukar', 'Suzuran', 'Mountain', 'Kazemaru', 'Spot']
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
