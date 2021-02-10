FROM node:12
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g @angular/cli@8.3.26
COPY . .

RUN npm install
EXPOSE 4200
CMD ["ng","serve", "--host", "0.0.0.0"]
