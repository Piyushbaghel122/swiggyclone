FROM node:18-alpine as frontend

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

FROM python:3.9-slim-bookworm as backend

WORKDIR /app

COPY requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r requirements.txt


COPY --from=frontend /app/dist /app/public

CMD ["python", "app.py"]
