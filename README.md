<!--<p align="center"><a href="https://quanthub.discobroccoli.com" target="_blank"><img src="https://hilda-notes-service.s3.ca-central-1.amazonaws.com/2024/08/c1298bccd0106aae9565b01cd78889e6ea3446c5797845fe46c1a075df74c7eb.png" width="100%" alt="Quanthub Logo"></a></p>-->

<!--
<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>
-->

## About Qunthub

- A demo site is available on https://quanthub.discobroccoli.com.
- This is the final project of `WEBD-2013 Web Development 2` course of Red River College.

- Qunathub is a platform for individuals who are interested in quantitative trading and want to share their thoughts and experiences.

![image-20240814210639335](https://hilda-notes-service.s3.ca-central-1.amazonaws.com/2024/08/dafdb48b92d0cc768264a08809ec657f6b5cb33463a93a401b9f7b9c7c6de8d2.png)



## Actors

| Actor               | Search & View <u>Blogs / Announcements</u> | CUD <u>Blogs</u> | CUD <u>Announcements</u> | User Profile |
| ------------------- | ------------------------------------------ | ---------------- | ------------------------ | ------------ |
| **Guest**           | √                                          | ×                | ×                        | ×            |
| **Registered User** | √                                          | √                | ×                        | √            |
| **Admin User**      | √                                          | √                | √                        | √            |



## Features

### Searching

- All users and guests can **search** published blogs and announcements **with** none or multiple **conditions**:
  1. keyword (will be searched in `title` / `subtitle` / `content` / `author` / `tags`)
  2. categories
  3. tags
- All users and guests can **sort the searching result** in one of the following orders:
  1. Recommanded (Default)
  2. Published Date
  3. Updated Date

### Blogs / Announcements

- `Registered User` and `Admin User` can post their blogs after signing in.
- During the blogs creation stage, user can
  1. use the provided **rich text editor** to type in the blog content, or **insert images**. The editor also supports **markdown**.
  2. **select / create one category** this blog belongs to, **attach up to 10 new tags** to this article, and **upload one attachment file**.
  3. inspect the post via **preview** window.
  4. **save the not yet published blogs as a draft**, so the user can keep editing in a later point.
- The creation of Announcements is only available to `Admin users`

### Comments

- `Registered User` can
  1. leave comments with **Emoji**.
  2. Edit / Delete their own comments.
- `Admin users` can edit / delete all the comments exiting in the system.



## Technical Details

- Quanthub is a **monolith application** with a separate frontend and backend
- The Frontend is a **React** application, mainly uses **Typescript**, **TailwindCSS** and **Material UI**.
- The Backend is a **Laravel** application with **PHP 8.2**, and the main database is **MySQL**, the system also integrates with **Elasticsearch** and **Redis**. To inspect system data, a **[Kibana Dashboard](https://kibana.discobroccoli.com/app/discover)** is also available, you can choose `Articles` data view to inspect the blogs and drafts, or `Announcements` data view to inspect published announcements.
- The content (blogs, announcements & drafts) searching are managed by Elasticsearch, but they are persistent (archived) inside MySQL.
- The blog views data is stored in Redis, every visits to a specific blog will increase the viewing data of that blog by 1, this process is an atomic operation performed by a Lua script.
- The attachment file and images of the blogs / announcements are stored inside an **AWS S3 bucket**, MySQL only contains the links to those files.
- The Sign in / Sign up process is managed by **auth0**.



## Deployment

- The [demo site](https://quanthub.discobroccoli.com) and [Kibana Dashboard](https://kibana.discobroccoli.com/app/discover) are currently deployed on an **AWS EC2** instance with a **RDS instance (MySQL)** and an **ElastiCache instance (Redis)**. They will be moved to Alibaba Cloud in the future.

- A docker-compose file for deployment could look like:

  ```yaml
  services:
    mysql-db:
    # for security reasons, don't expose your database ports
      container_name: mysql-quanthub-prod
      image: mysql:8.2.0
      networks:
        - quanthub-prod-network
      volumes:
        - ./mysql/data:/var/lib/mysql
        - quanthub-mysql-conf:/etc/mysql
      environment:
        MYSQL_ROOT_PASSWORD: YOUR_PASSWORD
        MYSQL_DATABASE: quanthub
      healthcheck:
        test: [ "CMD-SHELL", "curl --silent localhost:3306 >/dev/null || exit 1" ]
        interval: 10s
        timeout: 10s
        retries: 3
  
    es01:
      container_name: es01-quanthub-prod
      image: elasticsearch:8.14.1
      environment:
        - discovery.type=single-node
        - bootstrap.memory_lock=false
        - xpack.security.enabled=false
        # enable SSL
        # - xpack.security.enabled=true
        # - xpack.security.transport.ssl.enabled=true
        # - xpack.security.transport.ssl.verification_mode=certificate
        # - xpack.security.transport.ssl.key=/path/to/your/certificate.key
        # - xpack.security.transport.ssl.certificate=/path/to/your/certificate.crt
        # - xpack.security.transport.ssl.certificate_authorities=/path/to/your/ca.crt
      ulimits:
        memlock:
          soft: -1
          hard: -1
      volumes:
        - ./elasticsearch/data:/usr/share/elasticsearch/data
      networks:
        - quanthub-prod-network
      healthcheck:
        test: [ "CMD-SHELL", "curl -I http://localhost:9200 || exit 1" ]
        interval: 10s
        timeout: 10s
        retries: 5
      command: >
        /bin/bash -c "
        /usr/local/bin/docker-entrypoint.sh eswrapper &
        while ! curl -s http://localhost:9200; do sleep 1; done;
        curl -X PUT 'http://localhost:9200/quanthub-articles' -H 'Content-Type: application/json' -d '{\"settings\": {\"number_of_shards\": 1, \"number_of_replicas\": 1}}';
        curl -X PUT 'http://localhost:9200/quanthub-announcements' -H 'Content-Type: application/json' -d '{\"settings\": {\"number_of_shards\": 1, \"number_of_replicas\": 1}}';
        wait"
  
    kibana:
      container_name: kibana-quanthub-prod
      image: kibana:8.14.1
      ports:
        - "5601:5601"
      volumes:
        - ./kibana/kibana.yml:/usr/share/kibana/config/kibana.yml
      healthcheck:
        test: [ "CMD-SHELL", "curl -I http://localhost:5601 || exit 1" ]
        interval: 10s
        timeout: 10s
        retries: 5
      depends_on:
        es01:
          condition: service_healthy
      networks:
        - quanthub-prod-network
  
    redis:
      container_name: redis-quanthub-prod
      image: redis:7.2.5
      volumes:
        - ./redis/data:/root/redis
        - quanthub-redis:/usr/local/etc/redis
      environment:
        - REDIS_PASSWORD=  # replace with your redis password
        - REDIS_DATABASES=16
      networks:
        - quanthub-prod-network
      healthcheck:
        test: [ 'CMD', 'redis-cli', 'ping' ]
        interval: 10s
        timeout: 5s
        retries: 3
      command: redis-server --requirepass # replace with your redis password
  
    quanthub-backend:
      container_name: quanthub-backend
      image: leopoldhsing2/quanthub-backend
      environment:
        - ELASTICSEARCH_HOST=es01-quanthub-prod:9200
        - DB_CONNECTION=mysql
        - DB_HOST=mysql-quanthub-prod
        - DB_PORT=3306
        - DB_DATABASE=quanthub
        - DB_USERNAME=  # replace with your mysql username
        - DB_PASSWORD=  # replace with your mysql password
        - REDIS_CLIENT=predis
        - REDIS_HOST=redis-quanthub-prod
        - REDIS_PASSWORD=  # replace with your redis password
        - REDIS_PORT=6379
        - REDIS_DB=0
        - REDIS_CACHE_DB=1
        - APP_NAME=QuantHub
        - APP_ENV=production
        - APP_KEY=base64:*************************REPLACE_WITH_YOUR_APP_KEY
        - APP_DEBUG=true
        - APP_TIMEZONE=UTC
        - APP_URL=http://localhost
      depends_on:
        es01:
          condition: service_healthy
        mysql-db:
          condition: service_healthy
      command: >
        /bin/sh -c "
        php artisan setup:elasticsearch &&
        php artisan migrate --force &&
        php artisan serve --host=0.0.0.0 --port=8000
        "
      networks:
        - quanthub-prod-network
    quanthub-frontend:
      container_name: quanthub-frontend
      image: leopoldhsing2/quanthub-frontend
      ports:
        - "5173:5173"
      environment:
        - VITE_AUTH0_DOMAIN=  # Replace with your auth0 domain
        - VITE_AUTH0_CLIENT_ID=   # This is your autho client id
        - VITE_AUTH0_CALLBACK_URL=  # The url auth0 will redirect to after sign in
        - VITE_AUTH0_AUDIENCE=  # the auth0 api you created for this project
        - VITE_BASE_URL=  # specify your backend address
        - VITE_AWS_ACCESSKEY_ID=  # Replace with your AWS Access key id.
        - VITE_AWS_SECRET_ACCESSKEY=  # Replace with your AWS Access key secret.
        - VITE_S3_BUCKET_NAME=  # Replace with your AWS S3 bucket name
        - VITE_S3_REGION=  # The AWS region your bucket is in
      depends_on:
        - quanthub-backend
      networks:
        - quanthub-prod-network
  
    nginx-proxy:
      image: nginx
      container_name: nginx-proxy
      ports:
        - "80:80"
        - "443:443"
      volumes:
        - ./nginx.conf:/etc/nginx/conf.d/default.conf
        - ./ssl:/etc/nginx/ssl
      depends_on:
        - quanthub-frontend
        - quanthub-backend
      networks:
        - quanthub-prod-network
  
  networks:
    quanthub-prod-network:
      driver: bridge
      name: quanthub-prod-network
  
  volumes:
    quanthub-mysql-conf:
      name: quanthub-mysql-conf
    quanthub-redis:
      name: quanthub-redis
  
  
  ```

  
