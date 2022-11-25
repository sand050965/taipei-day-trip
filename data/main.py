from sqlite3 import connect
import mysql.connector
import tool as module


dbconfig = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "trip"
}

connect_pool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name="mypool",
    pool_size=5,
    **dbconfig)

conn = connect_pool.get_connection()

if (conn.is_connected()):
    mycursor = conn.cursor()
    
try:
    module.insertAttraction(mycursor, conn)
    conn.commit()

except Exception as e:
    print(e)
    conn.rollback()

finally:
    mycursor.close()
    conn.close()