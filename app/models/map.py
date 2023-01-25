from .db import db, environment, SCHEMA, add_prefix_for_prod

class Map(db.Model):
    __tablename__= 'maps'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), nullable=True)

    map_team = db.relationship('TeamSuggestion', back_populates='team_map', cascade='all, delete')
    map_posted = db.relationship('PostedMap', back_populates='posted_map')
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image': self.image
        }
