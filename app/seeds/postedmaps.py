from app.models import db, PostedMap, environment, SCHEMA

def seed_posted_maps():
    post_ch1_7 = PostedMap(
        user_id=2, map_id=1
    )

    post_ch4_8 = PostedMap(
        user_id=3, map_id=2
    )

    post_ch9_1 = PostedMap(
        user_id=4, map_id=3
    )

    db.session.add(post_ch1_7)
    db.session.add(post_ch4_8)
    db.session.add(post_ch9_1)
    db.session.commit()

def undo_posted_maps():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.postedmaps RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM postedmaps")

    db.session.commit()
