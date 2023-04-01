from flask import *
from mysql.connector import IntegrityError
from models.user_model import UserModel as model
from views.user_view import UserView as view
from utils.dbUtil import DBUtil

class UserController:
    def insertUser(request):
        conn = DBUtil.get_connect()
        cursor = DBUtil.get_cursor(conn)

        try:
            model.insertUser(cursor, request)
            conn.commit()
            return view.renderSuccess(), 200

        except ValueError as VErr:
            print(VErr)
            conn.rollback()
            return view.renderError("註冊失敗，重複的 Email 或其他原因"), 400

        except IntegrityError as IErr:
            print(IErr)
            conn.rollback()
            return view.renderError("註冊失敗，重複的 Email 或其他原因"), 400

        except Exception as e:
            print(e)
            conn.rollback()
            return view.renderError("伺服器內部錯誤"), 500

        finally:
            cursor.close()
            conn.close()


    def doUserAuth(request):

        match request.method:
            case "DELETE":
                return view.renderDeleteUser(), 200

            case "GET":
                conn = DBUtil.get_connect()
                cursor = DBUtil.get_cursor(conn)

                try:
                    result = model.getUserByEmail(cursor, request)
                    response = view.renderGetUserByEmail(result)

                except Exception as e:
                    print(e)
                    response = view.renderGetNoUser()

                finally:
                    cursor.close()
                    conn.close()
                    return response, 200

            case "PUT":
                conn = DBUtil.get_connect()
                cursor = DBUtil.get_cursor(conn)

                try:
                    result = model.getUserIdByEmailPassword(cursor, request)
                    return view.renderGetUserIdByEmailPassword(result), 200

                except ValueError as VErr:
                    print(VErr.args)
                    return view.renderError("登入失敗，帳號或密碼錯誤或其他原因"), 400

                except Exception as e:
                    print(e)
                    return view.renderError("伺服器內部錯誤"), 500

                finally:
                    cursor.close()
                    conn.close()


    def getUserInfo(request):
        conn = DBUtil.get_connect()
        cursor = DBUtil.get_cursor(conn)

        match request.method:
            
            case "GET":
                try:
                    result = model.getUserInfo(cursor, request)
                    return view.renderGetUserInfo(result), 200
                
                except Exception as e:
                    print(e)
                    return view.renderError("伺服器內部錯誤"), 500

                finally:
                    cursor.close()
                    conn.close()

            case "POST":
                try:
                    model.updateUserInfo(cursor, request)
                    conn.commit()
                    return view.renderSuccess(), 200

                except ValueError as VErr:
                    print(VErr)
                    conn.rollback()
                    return view.renderError("修改會員資料失敗，輸入錯誤資料或其他原因"), 400

                except Exception as e:
                    print(e)
                    conn.rollback()
                    return view.renderError("伺服器內部錯誤"), 500

                finally:
                    cursor.close()
                    conn.close()
