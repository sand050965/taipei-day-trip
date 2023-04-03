import re
import time
import datetime
from jwt import InvalidSignatureError

class ValidatorUtil:
    
    def validate_page(page):
        if not re.match(r'^\d+$', page):
            raise ValueError("頁碼輸入有誤")


    def validate_attractionId(attractionId):
        if not re.match(r'^[+]?[1-9][0-9]*$', attractionId):
            raise ValueError("景點id輸入有誤")


    def validate_attraction(attraction):
        if (attraction == None):
            raise ValueError


    def validate_user(user):
        if (user == None):
            raise ValueError


    def validate_token(token):
        if (token == None):
            raise InvalidSignatureError


    def validate_tokenUserId(user_id, token_UserId):
        if (user_id != token_UserId):
            raise InvalidSignatureError
    
    
    def validate_bookingId(bookingId):
        if not re.match(r'^[+]?[1-9][0-9]*$', bookingId):
            raise ValueError("預定id輸入有誤")
    
    
    def validate_booking_date_time(booking_date, booking_time):
        current_datetime = datetime.datetime.now()
        today = datetime.datetime.strptime(current_datetime.strftime('%Y-%m-%d'), '%Y-%m-%d')
        booking_date = datetime.datetime.strptime(booking_date, '%Y-%m-%d')
        current_hour = time.localtime()[3]
        if (booking_date < today):
            raise ValueError("預定日期不可早於當天日期")
        elif (booking_date == today):
            if ("morning".__eq__(booking_time) and current_hour >= 16):
                raise ValueError("現在時間不可晚於上半天行程結束時間")
            elif ("afternoon".__eq__(booking_time) and current_hour >= 21):
                raise ValueError("預定時間不可晚於下半天行程結束時間")
                

    def validate_name(name, isUserAuth):
        if (name == ""):
            if (isUserAuth):
                raise ValueError
            raise ValueError("姓名輸入有誤")


    def validate_email(email, isUserAuth):
        if (email == "" or not re.match(r'^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$', email)):
            if (isUserAuth):
                raise ValueError
            raise ValueError("email輸入有誤")


    def validate_password(password):
        if (password == "" or not re.match(r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$', password)):
            raise ValueError("密碼輸入有誤")


    def validate_sex(sex):
        if (sex not in {"0", "1", "2"}):
            raise ValueError("性別資料有誤")
        
        
    def validate_phone(phone):
        if (phone == "" or not re.match(r'^09\d{8}$', phone)):
            raise ValueError("手機號碼輸入有誤")


    def validate_date(date):
        if (date == "" or not re.match(r'^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$', date)):
            raise ValueError("日期有誤")


    def validate_birthday(birthday):
        current_datetime = datetime.datetime.now()
        today = datetime.datetime.strptime(current_datetime.strftime('%Y-%m-%d'), '%Y-%m-%d')
        birthday = datetime.datetime.strptime(birthday, '%Y-%m-%d')
        if (birthday > today):
            raise ValueError("生日不可晚於當天日期")


    def validate_time(time):
        if (time == ""):
            raise ValueError("時間有誤")


    def validate_price(price):
        if (price != 2000 and price != 2500):
            raise ValueError("價格有誤")


    def validate_orderNumber(orderNumber):
        if (orderNumber == ""):
            raise ValueError("訂單編號有誤")
    
    
    def validate_file(file_name, file_type):
        allowed_files = {"png", "jpg", "jpeg"}
        if not ("." in file_name and file_type in allowed_files):
           raise ValueError("檔案格式有誤")
