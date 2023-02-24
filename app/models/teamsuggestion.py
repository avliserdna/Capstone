from .db import db, environment, SCHEMA, add_prefix_for_prod

class TeamSuggestion(db.Model):
    __tablename__ = 'teamsuggestions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    map_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("maps.id")), nullable=False)
    character_id = db.Column(db.String, db.ForeignKey(add_prefix_for_prod("characters.api_id")), nullable=False)

    team_user = db.relationship('User', back_populates='user_team')
    team_map = db.relationship('Map', back_populates='map_team')
    team_characters = db.relationship('Character', back_populates='character_team')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'map_id': self.map_id,
            'character_id': self.character_id
        }
