from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)
    body = db.Column(db.String(255), nullable=False)

    comment_post = db.relationship('Post', back_populates='post_comments')
    comment_owner = db.relationship('User', back_populates='owner_comment')
    comment_response = db.relationship('Comment', back_populates='response_comment',  cascade='all, delete')
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'body': self.body
        }
