FROM python:3.10-bullseye

WORKDIR /app

ADD . /app

RUN apt-get update

RUN apt-get install ffmpeg libsm6 libxext6  -y

RUN apt-get update && apt-get install libgl1

RUN pip3 install --upgrade pip

RUN pip3 install -r requirements.txt

CMD ["uwsgi", "wsgi.ini"]