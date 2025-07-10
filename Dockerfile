FROM node:20

# 앱 디렉토리 설정
WORKDIR /app

# 먼저 example/package.json과 package-lock.json만 복사 (캐시 최적화)
COPY package*.json ./

# 의존성 설치
RUN npm install

# 전체 앱 소스 복사
COPY / .

# 앱 빌드
RUN npm run build

# 포트 노출
EXPOSE 3000

# Next.js 앱 실행
CMD ["npm", "start"]
