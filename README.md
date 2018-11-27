# Setting up the Development Environment

Pull the git repo.

```
git clone https://gitlab.com/Makita1/trufla.git
```

Build the docker image.

```
docker build . -t trufla:development
```

Run the image.

```
docker run --rm -p 5000:5000 -t trufla:development
```

With the image running, the site can be accessed via http://localhost:5000/. Let's make the files update in the container.

## Removing the Docker Image

First, make sure any containers running the image are dead.

```
docker ps
docker stop ID_OR_NAME
```

When all of these are dead, delete the image.

```
docker image rm ID_OR_NAME
```