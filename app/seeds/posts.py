from app.models import db, Post, environment, SCHEMA

def seed_posts():
    ch1_7 = Post(
        author_id = 2, title = "1-7", body ="LOREM IPSUM"
    )
    ch4_8 = Post (
        author_id = 3, title = "4-8", body ="LOREM IPSUM"
    )
    ch9_1 = Post(
        author_id = 4, title = "9-1", body = "LOREM IPSUM"
        )

    db.session.add(ch1_7)
    db.session.add(ch4_8)
    db.session.add(ch9_1)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
