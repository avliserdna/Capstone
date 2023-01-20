from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Map

def check_name_len(form, field):
    name = field.data
    if len(name) > 10:
        raise ValidationError('Name is greater than 50 characters.')


class MapForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), check_name_len])
    description = StringField("description", validators=[DataRequired()])
    image = StringField("image")
