from .db import db, environment, SCHEMA, add_prefix_for_prod

class Profile(db.Model):
    __tablename__ = 'profiles'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    character_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("characters.id")), nullable=False)
    username = db.Column(db.String(20), nullable=False)
    about_me = db.Column(db.String(255), nullable=False)

    profile_user = db.relationship('User', back_populates='user_profile')
    profile_character = db.relationship('character', back_populates='character_profile')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'character_id': self.character_id,
            'username': self.username,
            'about_me': self.about_me
        }
