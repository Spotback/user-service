set -ex
# SET THE FOLLOWING VARIABLES
# docker hub username
USERNAME=spotback
# image name
IMAGE=user-service
# ensure we're up to date
git pull
# bump version
docker run --rm -v "$PWD":/app treeder/bump patch
version=`cat VERSION`
echo "version: $version"
json -I -f package.json -e "this.version='$version'"
# run build
./build.sh
# tag it
git add .
git commit -m "version $version"
git tag -a "$version" -m "version $version"
git push
git push --tags
docker tag $USERNAME/$IMAGE:$version
# push it
docker push $USERNAME/$IMAGE:latest
docker push $USERNAME/$IMAGE:$version