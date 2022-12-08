from sqlite3 import connect
from mysql.connector import pooling


class Database:

    def get_db():
        db_config = {
            "host": "localhost",
            "user": "root",
            "password": "root1234",
            "database": "trip"
        }
        
        connect_pool = pooling.MySQLConnectionPool(
            pool_name="mypool",
            pool_size=5,
            **db_config
        )
        
        return connect_pool
