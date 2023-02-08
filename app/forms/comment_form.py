from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Comment

def check_body(form, field):
    body=field.data
    print(body)
    if len(body) == 0:
        raise ValidationError('Body is required!')

class CommentForm(FlaskForm):
    body = StringField('body', validators=[DataRequired()])
