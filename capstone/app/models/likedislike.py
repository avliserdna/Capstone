from .db import db, environment, SCHEMA, add_prefix_for_prod

class LikeDislike(db.Model):
    __tablename__ = "likes_dislikes"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("comments.id")), nullable=False)
    like = db.Column(db.Boolean, nullable=True)
    dislike = db.Column(db.Boolean, nullable=False)

    user_response = db.relationship('User', back_populates='response_user')
    response_comment = db.relationship('Comment', back_populates='comment_response')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'comment_id': self.comment_id,
            'like': self.like,
            'dislike': self.dislike
        }
