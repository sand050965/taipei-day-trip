import uuid
from flask import *
from utils.dbUtil import DBUtil


def create_app():
    app = Flask(__name__, template_folder='./views/templates/',
                static_folder='./views/static/')

    connect_pool = DBUtil.get_db()

    app.config["COONECT_POOL"] = connect_pool
    app.config["JSON_AS_ASCII"] = False
    app.config["TEMPLATES_AUTO_RELOAD"] = True
    app.config["JSON_SORT_KEYS"] = False
    app.config['SECRET_KEY'] = uuid.uuid4().hex

    return app
