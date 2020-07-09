import os
from flask import Blueprint, request, abort, send_from_directory

from ..app import app
from .models import Product

bp_products = Blueprint('bp_products', __name__)


def find_or_create_dir(path):
    directory = os.path.dirname(path)
    if not os.path.exists(directory):
        os.makedirs(directory)


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
        product.base_price = data['base_price']

        # Refactor this
        path = f"{app.config['IMAGE_UPLOADS']}/products/{product.id}/"
        find_or_create_dir(path)
        try:
            image = request.files['image']
            image.save(os.path.join(path, image.filename))
            product.image = f'{path}{image.filename}'
        except KeyError:
            if data['del_image'] == 'true':
                product.image = None

        try:
            banner = request.files['banner']
            banner.save(os.path.join(path, banner.filename))
            product.banner = f'{path}{banner.filename}'
        except KeyError:
            if data['del_banner'] == 'true':
                product.banner = None

        try:
            cutout = request.files['cutout']
            cutout.save(os.path.join(path, cutout.filename))
            product.cutout = f'{path}{cutout.filename}'
        except KeyError:
            if data['del_cutout'] == 'true':
                product.cutout = None

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
        base_price=data['base_price'],
        image=None,
        banner=None,
        cutout=None,
    )

    product = Product.query.all()[-1]
    path = f"{app.config['IMAGE_UPLOADS']}/products/{product.id}/"
    find_or_create_dir(path)
    try:
        image = request.files['image']
        image.save(os.path.join(path, image.filename))
        product.image = f'{path}{image.filename}'
    except KeyError:
        pass

    try:
        banner = request.files['banner']
        banner.save(os.path.join(path, banner.filename))
        product.banner = f'{path}{banner.filename}'
    except KeyError:
        pass

    try:
        cutout = request.files['cutout']
        cutout.save(os.path.join(path, cutout.filename))
        product.cutout = f'{path}{cutout.filename}'
    except KeyError:
        pass

    product.save()
    return {
        'result': 'OK',
        'product': Product.query.all()[-1].to_json()
    }


@app.route('/product/delete/', methods=['POST',])
def delete_product():
    data = {}
    data.update(request.form)
    product = Product.query.filter_by(id=data['id']).first()
    product.delete()
    return {
        'result': 'OK',
    }


@app.route(f"/{app.config['IMAGE_UPLOADS']}/<string:model>/<int:id>/<string:filename>/")
def uploads(model, id, filename):
    return send_from_directory(f"{app.config['IMAGE_UPLOADS']}/{model}/{id}/", filename)
