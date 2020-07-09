import datetime
from flask import url_for

from ..app import db


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.Text())
    short_description = db.Column(db.Text())
    image = db.Column(db.String(120))
    banner = db.Column(db.String(120))
    cutout = db.Column(db.String(120))
    base_price = db.Column(db.Float())
    inventory = db.Column(db.Integer())
    create_date = db.Column(db.String(40))
    update_date = db.Column(db.String(40))

    def __init__(self, name, description, short_description, base_price, image, banner, cutout):
        self.name = name
        self.description = description
        self.short_description = short_description
        self.base_price = base_price
        self.image = image
        self.banner = banner
        self.cutout = cutout
        self.create_date = str(datetime.datetime.now())
        self.save()

    def __repr__(self):
        return f'<Product {self.name}>'

    def to_json(self):
        to_return = {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'short_description': self.short_description,
            'base_price': self.base_price,
            'inventory': self.inventory,
            'image': self.image,
            'banner': self.banner,
            'cutout': self.cutout,
            'variants': [variant.to_json() for variant in self.variants],
        }
        return to_return

    def save(self):
        try:
            self.base_price = float(self.base_price)
        except:
            self.base_price = None
        self.update_date = str(datetime.datetime.now())
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class Variant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    price_modificator = db.Column(db.Float())
    inventory = db.Column(db.Integer())
    create_date = db.Column(db.String(40))
    update_date = db.Column(db.String(40))

    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=True)
    product = db.relationship('Product', backref=db.backref('variants', lazy=True))

    def __init__(self, name, price_modificator, inventory, product_id):
        self.name = name
        self.price_modificator = float(price_modificator)
        self.inventory = int(inventory)
        self.product_id = int(product_id)
        self.create_date = str(datetime.datetime.now())
        self.save()

    def __repr__(self):
        return f'<{app.config["VARIANT_NAME"]} {self.name}>'

    def to_json(self):
        to_return = {
            'id': self.id,
            'name': self.name,
            'price_modificator': self.price_modificator,
            'inventory': self.inventory,
        }
        return to_return

    def save(self):
        self.update_date = str(datetime.datetime.now())
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
