
# Software engineering school application using Nodejs

Created Nodejs application that provide REST API for recieving USD to UAH rate and also implements sending of emails to all subscribers in database once a day using cron jobs. Architecure of application was separated to controllers, services and repositories and developed according to SOLID principles.

Repository includes evnironment file. It is bad practice for production, but in this repo its added only for successful run of the application.





## Technologies that was used

Nodejs, express, postgresql, sequelize, inversify.


## Application allow

- Get USD to UAH rate ([GET] /rate)

- Subscribe for daily mails with USD/UAH rates ([POST] /subscribe)

- Send mails to all subscribers with USD/UAH rate (using cron job)


## Start the project



```bash
  docker-compose -f docker-compose.dev.yml up --build
```
    