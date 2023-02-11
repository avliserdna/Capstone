from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def email_has_chars(form, field):
    email = field.data
    if "@" not in email:
        raise ValidationError("Use a proper Email address.")

def matching_paswords(form, field):
    password = field.data

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, email_has_chars])
    password = PasswordField('password', validators=[DataRequired(), EqualTo('confirm_password', message="Passwords must match!")])
    confirm_password = PasswordField('confirm_pasword', validators=[DataRequired()])
    profile_pic = StringField('profile_pic', validators=[])
    author = BooleanField('author', validators=[])
    admin = BooleanField('admin', validators=[])
