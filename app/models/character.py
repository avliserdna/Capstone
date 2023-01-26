from .db import db, environment, SCHEMA, add_prefix_for_prod

class Character(db.Model):
    __tablename__ = 'characters'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(255), nullable=False)
    rarity = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    archetype = db.Column(db.String(255), nullable=False)
    icon = db.Column(db.String(255), nullable=False)

    character_team = db.relationship('TeamSuggestion', back_populates="team_characters", cascade='all, delete')
    character_profile = db.relationship('Profile', back_populates="profile_character") # Ask Alex/Bill/Zaviar if character needs CASCADE DELETE ALL here

    def to_dict(self):
        return {
            'id': self.id,
            'rarity': self.rarity,
            'description': self.description,
            'archetype': self.archetype,
            'icon': self.icon
        }
