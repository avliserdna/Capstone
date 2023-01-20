from flask import Blueprint, jsonify, session, request
from app.models import Post, db
from app.forms import PostForm

auth_routes = Blueprint('posts', __name_)
