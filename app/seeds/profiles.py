from app.models import db, Profile, environment, SCHEMA

def seed_profiles():
    profile1 = Profile(
        user_id=3, character_id=7, username="Zigor", about_me="Arknights on main."
    )

    db.session.add(profile1)
    db.session.commit()

def undo_profiles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.profiles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM profiles")

    db.session.commit()
