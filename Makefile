build:
	docker build -t hamband_volunteer_frontend .

deploy:
	docker stack deploy -c docker-compose.yml hamband_volunteer_frontend

rm:
	docker stack rm hamband_volunteer_frontend