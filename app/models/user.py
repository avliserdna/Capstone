from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String(255), nullable=True)
    author = db.Column(db.Boolean, nullable=False)
    admin = db.Column(db.Boolean, nullable=True)

    authorship = db.relationship('Post', back_populates='post_author', cascade='all, delete')
    owner_comment = db.relationship('Comment', back_populates='comment_owner', cascade='all, delete')
    response_user = db.relationship('LikeDislike', back_populates='user_response', cascade='all, delete')
    user_team = db.relationship('TeamSuggestion', back_populates='team_user', cascade='all, delete')
    user_profile = db.relationship('Profile', back_populates='profile_user', cascade='all, delete')
    poster_map = db.relationship('PostedMap', back_populates='map_poster', cascade='all,delete')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_pic' : self.profile_pic,
            'author': self.author,
            'admin': self.admin
        }
