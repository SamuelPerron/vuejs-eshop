from ..app import db

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.Text())
    short_description = db.Column(db.Text())
    price = db.Column(db.Float())
    inventory = db.Column(db.Integer())

    def __repr__(self):
        return f'<Product {self.name}>'
