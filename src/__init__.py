import os
from flask import *
from flask_cors import CORS
from utils.dbUtil import DBUtil

def create_app():
    app = Flask(__name__, template_folder='./public/templates/',
                static_folder='./public/static/')
    
    CORS(app)

    connect_pool = DBUtil.get_db()

    app.config["COONECT_POOL"] = connect_pool
    app.config["JSON_AS_ASCII"] = False
    app.config["TEMPLATES_AUTO_RELOAD"] = True
    app.config["JSON_SORT_KEYS"] = False
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")

    return app
