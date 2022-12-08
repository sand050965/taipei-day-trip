from flask import *
from routes.attraction import attraction_api
from data.database import Database
import uuid

def create_app():
    app = Flask(__name__)
    
    connect_pool = Database.get_db()
    
    app.config["COONECT_POOL"] = connect_pool
    app.config["JSON_AS_ASCII"] = False
    app.config["TEMPLATES_AUTO_RELOAD"] = True
    app.config["JSON_SORT_KEYS"] = False
    app.config['SECRET_KEY'] = uuid.uuid4().hex

    return app
