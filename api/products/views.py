from flask import Blueprint

from ..app import app
from .models import Product

bp_products = Blueprint('bp_products', __name__)


@app.route('/products/')
def products():
    return {
        'products': Product.query.all()
    }
