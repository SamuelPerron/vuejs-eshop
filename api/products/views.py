from flask import Blueprint, request, abort

from ..app import app
from .models import Product

bp_products = Blueprint('bp_products', __name__)


@app.route('/products/', methods=['GET',])
def products():
    return {
        'products': [product.to_json() for product in Product.query.all()]
    }


@app.route('/product/<int:id>', methods=['GET', 'POST',])
def product(id):
    product = Product.query.filter_by(id=id).first()
    if request.method == 'POST':
        data = {}
        data.update(request.form)
        if data['name'] == '':
            abort(400, 'Fill required fields.')

        product.name = data['name']
        product.description = data['description']
        product.short_description = data['short_description']
        product.inventory = data['inventory']
        product.price = data['price']
        product.save()
        return {'result': 'OK'}
    else:
        return {
            'product': product.to_json()
        }


@app.route('/product/new/', methods=['POST',])
def new_product():
    data = {}
    data.update(request.form)
    if data['name'] == '':
        abort(400, 'Fill required fields.')
    Product(
        name=data['name'],
        description=data['description'],
        short_description=data['short_description'],
        price=data['price'],
        inventory=data['inventory'],
    )
    return {
        'result': 'OK',
        'product': Product.query.all()[-1].to_json()
    }
