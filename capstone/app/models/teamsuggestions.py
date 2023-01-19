from .db import db, environment, SCHEMA, add_prefix_for_prod

class TeamSuggestions(db.Model):
    __tablename__ = 'team_suggestions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
