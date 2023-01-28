from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import PostedMap

class PostedMapForm(FlaskForm):
    user_id = IntegerField('user_id',validators=[DataRequired()])
    map_id = IntegerField('map_id', validators=[DataRequired()])
