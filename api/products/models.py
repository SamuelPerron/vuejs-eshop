import datetime
from flask import url_for

from ..app import db


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.Text())
    short_description = db.Column(db.Text())
    image = db.Column(db.String(120))
    price = db.Column(db.Float())
    inventory = db.Column(db.Integer())
    create_date = db.Column(db.String(40))
    update_date = db.Column(db.String(40))

    def __init__(self, name, description, short_description, price, inventory, image):
        self.name = name
        self.description = description
        self.short_description = short_description
        self.price = price
        self.inventory = inventory
        self.image = image
        self.save()

    def __repr__(self):
        return f'<Product {self.name}>'

    def to_json(self):
        to_return = {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'short_description': self.short_description,
            'price': self.price,
            'inventory': self.inventory,
            'image': self.image,
        }
        return to_return

    def save(self):
        try:
            self.price = float(self.price)
        except:
            self.price = None
        try:
            self.inventory = int(self.inventory)
        except:
            self.inventory = None
        self.update_date = str(datetime.datetime.now())
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
