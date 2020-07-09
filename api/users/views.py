from flask import Blueprint

from ..app import app
from .models import User

bp_users = Blueprint('bp_users', __name__)
