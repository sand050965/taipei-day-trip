import os
import uuid
import boto3
from utils.requestUtil import RequestUtil
from utils.validatorUtil import ValidatorUtil


class S3Model:
    def uploadAvatar(request):
        uploaded_file = request.files["avatar"]
        file_name = uploaded_file.filename
        file_type = uploaded_file.filename.rsplit(".", 1)[1].lower()
        ValidatorUtil.validate_file(file_name, file_type)
        s3 = boto3.client(
            "s3",
            aws_access_key_id=os.getenv("AWS_BUCKET_ACCESS_KEY"),
            aws_secret_access_key=os.getenv("AWS_BUCKET_SECRET_KEY"),
        )
        new_filename = f"{uuid.uuid4().hex}.{file_type}"
        s3.upload_fileobj(
            uploaded_file, os.getenv("AWS_BUCKET_NAME"), f"avatars/{new_filename}"
        )
        return f"{os.getenv('AWS_BUCKET_URL')}{new_filename}"

    def deleteAvatar(request):
        data = RequestUtil.get_request_data(request)
        filename = data["filename"].replace(os.getenv("AWS_BUCKET_URL_PREFIX"), "")
        s3 = boto3.client(
            "s3",
            aws_access_key_id=os.getenv("AWS_BUCKET_ACCESS_KEY"),
            aws_secret_access_key=os.getenv("AWS_BUCKET_SECRET_KEY"),
        )
        s3.delete_object(Bucket=os.getenv("AWS_BUCKET_NAME"), Key=filename)
