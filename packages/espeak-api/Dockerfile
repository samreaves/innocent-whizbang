# Begin with raw Linux distro
FROM mhart/alpine-node:6.2.0

# I am the wizard who conjured this machine
MAINTAINER Sam Reaves & Donald Gary

# On container start, build src directory inside
RUN mkdir /src

# Set src directory as default directory for start command
WORKDIR /src

# Add local current directory to container's src directory
ADD . /src

# Install dependencies
RUN npm install

# Open port 3000
EXPOSE 3000

# It's business time
CMD npm start
