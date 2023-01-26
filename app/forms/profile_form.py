from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Profile

def check_user_len(form, field):
    username = field.data
    if len(username) > 20:
        raise ValidationError('Username is greater than 20 characters.')

class ProfileForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    about_me = StringField('about_me')
