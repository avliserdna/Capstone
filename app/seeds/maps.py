from app.models import db, Map, environment, SCHEMA

def seed_maps():
    ch1_7 = Map(name="1-7", description="A chapter 1 map, with 100% Orirock Cubes drop rate.", image="image")
    ch4_8 = Map(name='4-8', description='A chapter 4 map, with a rare drop rate for Manganese Ore.', image='image')
    ch9_1 = Map(name="9-1", description="A chapter 9 map, that's the beginning of the chapter 9 story.", image="image")

    db.session.add(ch1_7)
    db.session.add(ch4_8)
    db.session.add(ch9_1)
    db.session.commit()

def undo_maps():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.maps RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM maps")

    db.session.commit()
