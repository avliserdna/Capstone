from flask import Blueprint
from app.models import db, Character, environment, SCHEMA
import requests
import json

def get_character_data():
    req = requests.get('https://rhodesapi.cyclic.app/api/operator/')
    return json.loads(req.content)

def seed_characters():
    characters = get_character_data()
    for character in characters:
        def character_art_key(character):
            try:
                character["art"]["Base"]
                return character["art"]["Base"]
            except:
                return "image"
        ri_character = Character(api_id=character["_id"], description=character["description"], name=character["name"], rarity=character["rarity"], archetype=character["class"][0], icon=character_art_key(character))
        db.session.add(ri_character)
def undo_characters():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.characters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM characters")

    db.session.commit()
