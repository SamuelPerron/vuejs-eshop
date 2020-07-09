from .app import app

from .users.models import User
from .products.models import Product

from .users.views import bp_users
from .products.views import bp_products


app.register_blueprint(bp_users)
app.register_blueprint(bp_products)
