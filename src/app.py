from flask import *
from __init__ import create_app
from routes.pages_route import pages
from routes.attraction_route import attraction_api
from routes.category_route import category_api
from routes.user_route import user_api
from routes.booking_route import booking_api
from routes.order_route import order_api
from routes.s3_route import s3_api

app = create_app()

app.register_blueprint(pages)
app.register_blueprint(attraction_api)
app.register_blueprint(category_api)
app.register_blueprint(user_api)
app.register_blueprint(booking_api) 
app.register_blueprint(order_api)
app.register_blueprint(s3_api)

if __name__ == '__main__':
    app.run(port=3000, debug=True)
