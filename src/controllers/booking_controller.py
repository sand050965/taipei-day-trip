from flask import *
from jwt import DecodeError, InvalidSignatureError
from mysql.connector import IntegrityError
from utils.dbUtil import DBUtil
from models.user_model import UserModel
from models.booking_model import BookingModel as model
from views.booking_view import BookingView as view

class BookingController:
    def getBooking(request):

        conn = DBUtil.get_connect()
        cursor = DBUtil.get_cursor(conn)

        try:
            UserModel.getUserByEmail(cursor, request)

            match request.method:

                case "POST":
                    model.insertBooking(cursor, request)
                    conn.commit()
                    result = model.getBookingId(cursor, request)
                    response = view.renderSuccessInsert(result)

                case "DELETE":
                    model.deleteBookingById(cursor, request)
                    conn.commit()
                    response = view.renderSuccess()

            return response, 200

        except InvalidSignatureError as ISErr:
            print(ISErr)
            conn.rollback()
            return view.renderError("未登入系統，拒絕存取"), 403

        except DecodeError as DErr:
            print(DErr)
            conn.rollback()
            return view.renderError("未登入系統，拒絕存取"), 403

        except ValueError as VErr:
            print(VErr.args)
            conn.rollback()
            if (len(VErr.args) == 0):
                return view.renderError("未登入系統，拒絕存取"), 403
            else:
                return view.renderError("建立失敗，輸入不正確或其他原因"), 400

        except IntegrityError as IErr:
            print(IErr)
            conn.rollback()
            return view.renderError("建立失敗，輸入不正確或其他原因"), 400

        except Exception as e:
            print(e)
            conn.rollback()
            return view.renderError("伺服器內部錯誤"), 500

        finally:
            cursor.close()
            conn.close()


    def getBookings(request):

        conn = DBUtil.get_connect()
        cursor = DBUtil.get_cursor(conn)

        try:
            UserModel.getUserByEmail(cursor, request)

            match request.method:

                case "GET":
                    result = model.getBookings(cursor, request)
                    response = view.renderGetBookings(result)

                case "DELETE":
                    result = model.deleteBookings(cursor, request)
                    conn.commit()
                    response = view.renderSuccess()

            return response, 200

        except InvalidSignatureError as ISErr:
            print(ISErr)
            return view.renderError("未登入系統，拒絕存取"), 403

        except DecodeError as DErr:
            print(DErr)
            return view.renderError("未登入系統，拒絕存取"), 403

        except ValueError as VErr:
            print(VErr.args)
            return view.renderError("未登入系統，拒絕存取"), 403

        finally:
            cursor.close()
            conn.close()


    def getBookingByBookingId(request, bookingId):

        conn = DBUtil.get_connect()
        cursor = DBUtil.get_cursor(conn)

        try:
            UserModel.getUserByEmail(cursor, request)
            result = model.getBooking(cursor, request, bookingId)
            return view.renderGetBookingByBookingId(result), 200

        except InvalidSignatureError as ISErr:
            print(ISErr)
            conn.rollback()
            return view.renderError("未登入系統，拒絕存取"), 403

        except DecodeError as DErr:
            print(DErr)
            conn.rollback()
            return view.renderError("未登入系統，拒絕存取"), 403

        except ValueError as VErr:
            print(VErr.args)
            conn.rollback()
            if (len(VErr.args) == 0):
                return view.renderError("未登入系統，拒絕存取"), 403
            else:
                return view.renderError("建立失敗，輸入不正確或其他原因"), 400

        except Exception as e:
            print(e)
            conn.rollback()
            return view.renderError("伺服器內部錯誤"), 500

        finally:
            cursor.close()
            conn.close()
