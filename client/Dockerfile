FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN sed -i 's/^\s*user/#user/' /etc/nginx/nginx.conf


RUN rm -f /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh

RUN touch /var/run/nginx.pid && \
    chown nginx:nginx /var/run/nginx.pid && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080 || exit 1

CMD ["nginx", "-g", "daemon off;"]