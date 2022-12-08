from flask import *
from __init__ import create_app
from views.pages import pages
from routes.attraction import attraction_api
from routes.category import category_api
from routes.user import user_api
# from routes.booking import booking_api
# from routes.order import order_api

app = create_app()

app.register_blueprint(pages)
app.register_blueprint(attraction_api)
app.register_blueprint(category_api)
app.register_blueprint(user_api)
# app.register_blueprint(booking_api)
# app.register_blueprint(order_api)

app.run(host="0.0.0.0", port=3000)
