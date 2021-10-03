# Development
- Ensure node version 14.17.6 and npm version 6.14.15 are installed
- git clone https://github.com/LachlanNewman/imagetagger.git
- run npm i
- run npm dev

# Testing
- run npm test

# Production
Running this program on a cloud enviroment such as a AWS EC2 instance would be the most simple approach. After we setup a EC2 instance follow the following steps
- sudo apt-get update
- sudo apt-get install docker-ce docker-ce-cli containerd.io
- git clone https://github.com/LachlanNewman/imagetagger.git
- cd imagetagger
- docker build imagetagger
- docker run --name=imagetaggerBlue 3000:8000 \--mount source=image_tagger_images,target=/usr/app/dist/images imagetagger:latest 
- api request to {ec2-ip}:3000

## Deployment
Avoiding Down Time during deployments can be achieved using the Blue Green deployment model.
We can have a docker container that maps port 3000:8080 as the production enviroment
We can have a docker container that maps port 4000:8080 as the staging enviroment
If we use a api gateway such as nginx and have a staging url and production url we can test that the staging enviroment is working as expected.

/production {
    proxy_pass http://localhost:3000/
}

/staging {
    proxy_pass http://localhost:4000/
}

After we are sure the staging enviroment is working as expected we rotate the nginx config like so

/production {
    proxy_pass http://localhost:4000/
}

/staging {
    proxy_pass http://localhost:3000/
}

this would also give us immutable infrausture by rebuilding the stagin site each time a new deplymnet is made.

## Things To DO
- logging requests for each user 
- implement OAuth2 solution for Authentication
- docker compose file
- deploy mongoDB locally and and support in docker compose file
- use private key on repo to sign JWT tokens
- implement frontend interface
- create infrustructure as a code 