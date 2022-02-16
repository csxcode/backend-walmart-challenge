docker-build:
	sudo docker-compose up -d --no-deps --build

import-data:
	sudo docker exec walmart-database bash -c '/database/import.sh localhost'

docker-down:
	sudo docker rm -f walmart-database
	sudo docker rm -f walmart-api
