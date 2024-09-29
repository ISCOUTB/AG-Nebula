FROM python:3.12

RUN apt-get update && \
    apt-get install -yq tzdata && \
    ln -fs /usr/share/zoneinfo/America/Bogota /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

RUN mkdir /backend
WORKDIR /backend

COPY requirements.txt ./
RUN pip3 install -r requirements.txt

EXPOSE 8011

ENV FLASK_ENV=development
ENV FLASK_DEBUG=1

CMD ["flask", "run", "--host=0.0.0.0", "--port=8011", "--debug", "--reload"]