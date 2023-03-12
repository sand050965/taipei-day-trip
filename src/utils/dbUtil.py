import os
from flask import current_app
from dotenv import load_dotenv
from sqlite3 import connect
from mysql.connector import pooling


class DBUtil:

    def get_db():
        load_dotenv()

        db_config = {
            "host": os.getenv("DB_HOST"),
            "user": os.getenv("DB_USER"),
            "password": os.getenv("DB_PASSWORD"),
            "database": os.getenv("DB_SCHEMA")
        }

        connect_pool = pooling.MySQLConnectionPool(
            pool_name="mypool",
            pool_size=5,
            **db_config
        )

        return connect_pool

    def get_connect():
        return current_app.config["COONECT_POOL"].get_connection()

    def get_cursor(conn):
        cursor = None
        if (conn.is_connected()):
            cursor = conn.cursor(dictionary=True)
        return cursor
