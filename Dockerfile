FROM node:20.7.0-alpine as stage1
CMD ["cls"]
WORKDIR /java_exam_react_app
COPY package.json ./
# RUN npm install -g npm@10.1.0
RUN npm install

FROM node:20.7.0-alpine as stage2
WORKDIR /java_exam_react_app
COPY . .
COPY --from=stage1 /java_exam_react_app/node_modules ./node_modules
RUN npm run build

FROM node:20.7.0-alpine as final
WORKDIR /java_exam_react_app
ENV NODE_EVN production
COPY --from=stage2 /java_exam_react_app ./

EXPOSE 3000
CMD ["npm", "start"]