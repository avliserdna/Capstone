from flask_wtf import FlaskForm
from wtforms import BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import LikeDislike

class LikeDislikeForm(FlaskForm):
    like = BooleanField('like')
    dislike = BooleanField('dislike')
