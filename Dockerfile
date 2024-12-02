FROM mcr.microsoft.com/devcontainers/base:ubuntu-20.04

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    nginx \
    curl \
    git \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

  COPY nginx.conf /etc/nginx/nginx.conf

  WORKDIR /workspace
  COPY ./src /workspace


  EXPOSE 80

  CMD ["nginx", "-g", "daemon off;"]
  