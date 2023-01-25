from app.models import db, Character, environment, SCHEMA

def seed_characters():
    character1 = Character(
        name="Kroos", rarity=3, description="A 3-star Anti-Air Sniper unit.", archetype="Sniper", icon="KroosImage"
    )
    character2= Character(
        name="Myrtle", rarity=4, description="A 4-star Flagbearer Vanguard unit.", archetype="Vanguard", icon="MyrtleImage"
    )
    character3 = Character(
        name="Exusiai", rarity=6, description="A 6-star Anti-Air Sniper unit.", archetype="Sniper", icon="ExusiaiImage"
    )
    character4 = Character(
        name="Lappland", rarity=5, description="A 5-star Lord Guard unit.", archetype="Guard", icon="LapplandImage"
    )

    character5 = Character(
        name="Beagle", rarity=3, description="A 3-star Defender unit.", archetype="Defender", icon="BeagleImage"
    )

    character6 = Character(
        name="Perfumer", rarity=4, description="A 5-star AoE Medic unit.", archetype="Medic", icon="PerfumerImage"
    )
    character7= Character(
        name="Surtr", rarity=6, description="A 6-star Arts Guard unit.", archetype="Guard", icon="SurtrImage"
    )

    db.session.add(character1)
    db.session.add(character2)
    db.session.add(character3)
    db.session.add(character4)
    db.session.add(character5)
    db.session.add(character6)
    db.session.add(character7)

def undo_characters():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.characters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM characters")

    db.session.commit()
