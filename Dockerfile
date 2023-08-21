FROM node:18-alpine3.14

# Set env
ENV CHROME_BIN="/usr/bin/chromium-browser"
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

# Install Chromium
RUN set -x && apk update && apk upgrade && apk add --no-cache udev ttf-opensans ttf-freefont chromium

# Install other Fonts
RUN apk add wqy-zenhei --no-cache --repository http://nl.alpinelinux.org/alpine/edge/testing --allow-untrusted

# Create app directory in container
RUN mkdir -p /app

# Set /app directory as default working directory
WORKDIR /app

# Only copy package.json initially so that `RUN yarn` layer is recreated only
# if there are changes in package.json
ADD package.json yarn.lock /app/

# --pure-lockfile: Don’t generate a yarn.lock lockfile
RUN yarn --pure-lockfile

# Copy all file from current dir to /app in container
COPY . /app/

# Expose port
EXPOSE 9090

# Start service
CMD [ "yarn", "start" ]

