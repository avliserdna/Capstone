from flask import Blueprint
from app.models import db, Character, environment, SCHEMA
import requests
import json

def get_character_data():
    req = requests.get('https://rhodesapi.cyclic.app/api/operator/')
    return json.loads(req.content)
# rhodes_api_routes = Blueprint('https://rhodesapi.cyclic.app/api/operator/', __name__)

# @rhodes_api_routes.route('/')


def seed_characters():
    characters = get_character_data()
    for character in characters:
        # character_icon = lambda character: character["art"]["Base"] if character["art"]["Base"] else "fill image here"
        def character_art_key(character):
            try:
                character["art"]["Base"]
                return character["art"]["Base"]
            except:
                return "image"
        ri_character = Character(api_id=character["_id"], name=character["name"], rarity=character["rarity"], archetype=character["tags"][1], icon=character_art_key(character))
        db.session.add(ri_character)
    # character1 = Character(
    #     name="Kroos", rarity=3, description="A 3-star Anti-Air Sniper unit.", archetype="Sniper", icon="KroosImage"
    # )
    # character2= Character(
    #     name="Myrtle", rarity=4, description="A 4-star Flagbearer Vanguard unit.", archetype="Vanguard", icon="MyrtleImage"
    # )
    # character3 = Character(
    #     name="Exusiai", rarity=6, description="A 6-star Anti-Air Sniper unit.", archetype="Sniper", icon="ExusiaiImage"
    # )
    # character4 = Character(
    #     name="Lappland", rarity=5, description="A 5-star Lord Guard unit.", archetype="Guard", icon="LapplandImage"
    # )

    # character5 = Character(
    #     name="Beagle", rarity=3, description="A 3-star Defender unit.", archetype="Defender", icon="BeagleImage"
    # )

    # character6 = Character(
    #     name="Perfumer", rarity=4, description="A 5-star AoE Medic unit.", archetype="Medic", icon="PerfumerImage"
    # )
    # character7= Character(
    #     name="Surtr", rarity=6, description="A 6-star Arts Guard unit.", archetype="Guard", icon="SurtrImage"
    # )

    # db.session.add(character1)
    # db.session.add(character2)
    # db.session.add(character3)
    # db.session.add(character4)
    # db.session.add(character5)
    # db.session.add(character6)
    # db.session.add(character7)

def undo_characters():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.characters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM characters")

    db.session.commit()
