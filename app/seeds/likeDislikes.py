from app.models import db, LikeDislike, environment, SCHEMA

def seed_like_dislikes():
    react1 = LikeDislike(
        user_id=3, comment_id=1, like=True, dislike=False
    )
    react2 = LikeDislike(
        user_id=3, comment_id=3, like=True, dislike=False
    )
    react3 = LikeDislike(
        user_id=3, comment_id=5, like=True, dislike=False
    )
    react4 = LikeDislike(
        user_id=3, comment_id=5, like=False, dislike=False
    )
    react5 = LikeDislike(
        user_id=2, comment_id=5,like=False,dislike=False
    )
    react6 = LikeDislike(
        user_id=2, comment_id=4, like=True,dislike=False
    )

    db.session.add(react1)
    db.session.add(react2)
    db.session.add(react3)
    db.session.add(react4)
    db.session.add(react5)
    db.session.add(react6)
    db.session.commit()

def undo_like_dislikes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likesdislikes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likesdislikes")

    db.session.commit()
