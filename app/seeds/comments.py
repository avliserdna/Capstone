from app.models import db, Comment, environment, SCHEMA

def seed_comments():
    comment1 = Comment(
        user_id = 2, post_id= 1, body="rocks"
    )
    comment2 = Comment(
        user_id = 3, post_id= 1, body="bruh, more ROCKS...."
    )

    comment3 = Comment(
        user_id = 4, post_id= 1, body="you like rocks?"
    )

    comment4 = Comment(
        user_id =3, post_id = 2, body="I need my mangoes"
    )

    comment5 = Comment(
        user_id=2, post_id =2, body="If you use Lappland, you can silence the explosions of the spiders"
    )

    comment6 = Comment(
        user_id=4, post_id=3, body="just use surtr"
    )


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
