FROM ubuntu:latest
RUN apt-get update -y

# Install node/npm/python
RUN apt-get install -y nodejs npm curl sudo
RUN apt-get install -y python-pip python-dev build-essential

# Get latest Node 6.x
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

COPY . /app
WORKDIR /app

# Install necessary deps
RUN npm install --unsafe-perm -g webpack
RUN npm install -g yarn
RUN yarn install
#RUN npm rebuild node-sass -f
RUN webpack
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["python", "app.py"]
