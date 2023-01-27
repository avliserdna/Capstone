from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_pic='image', author=True, admin=False)
    kyostinv = User(
        username='kyostinv', email='kyostinv@arknights.io', password='guardknights', profile_pic = 'image', author= True, admin=False)
    zigor = User(
        username='Zigor', email='Zigor@arknights.io', password='password', profile_pic='image', author=True)
    frostbyte6 = User(
        username='Frostbyte6', email='Frostbyte6@arknights.io', password='surtrqueen', profile_pic='image', author=True, admin= True)
    db.session.add(demo)
    db.session.add(kyostinv)
    db.session.add(zigor)
    db.session.add(frostbyte6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
