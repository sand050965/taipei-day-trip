from flask import *
from jwt import InvalidSignatureError
from mysql.connector import IntegrityError
from utils.dbUtil import DBUtil
from models.order_model import OrderModel as model
from views.order_view import OrderView as view

class OrderController:
    
    def doOrders(request):
        conn = DBUtil.get_connect()
        cursor = DBUtil.get_cursor(conn)

        match request.method:
            case "GET":    
                try:
                    result = model.getAllOrders(cursor, request)
                    return view.renderAllOrders(result), 200

                except Exception as e:
                    print(e)
                    return view.renderError("未登入系統，拒絕存取"), 403

                finally:
                    cursor.close()
                    conn.close()
                    
            case "POST":    
                try:
                    result = model.insertOrder(cursor, request)
                    conn.commit()
                    return view.renderNewOrder(result), 200

                except InvalidSignatureError as ISErr:
                    print(ISErr.args)
                    conn.rollback()
                    return view.renderError("未登入系統，拒絕存取"), 403
                
                except ValueError as VErr:
                    print(VErr.args)
                    conn.rollback()
                    return view.renderError("訂單建立失敗，輸入不正確或其他原因"), 400

                except IntegrityError as IErr:
                    print(IErr)
                    conn.rollback()
                    return view.renderError("訂單建立失敗，輸入不正確或其他原因"), 400

                except Exception as e:
                    print(e)
                    conn.rollback()
                    return view.renderError("伺服器內部錯誤"), 500

                finally:
                    cursor.close()
                    conn.close()


    def getOrder(orderNumber):
        conn = DBUtil.get_connect()
        cursor = DBUtil.get_cursor(conn)

        try:
            order = model.getOrderByOrderId(cursor, orderNumber)
            return view.renderGetOrderByOrderId(order), 200
        
        except Exception as e:
            print(e)
            return view.renderError("未登入系統，拒絕存取"), 403

        finally:
            cursor.close()
            conn.close()
