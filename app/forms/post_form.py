from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Post

def check_title_len(form, field):
    title = field.data
    if len(title) > 50:
        raise ValidationError('Title is greater than 50 characters.')

class PostForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), check_title_len])
    body = StringField('body', validators=[DataRequired()])
