from .db import db, environment, SCHEMA, add_prefix_for_prod

class PostedMap(db.Model):
    __tablename__ = "postedmaps"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    map_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("maps.id")), nullable=False)

    map_poster = db.relationship('User', back_populates='poster_map')
    posted_map = db.relationship('Map', back_populates='map_posted')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'map_id': self.map_id
        }
