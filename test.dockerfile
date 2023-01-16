FROM mcr.microsoft.com/playwright:v1.29.2-focal

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install nodejs

RUN mkdir /app

WORKDIR /app
