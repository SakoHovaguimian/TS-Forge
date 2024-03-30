# *Redis Command List*
#### Start Redis 
    brew services start redis
#### Stops Redis 
    brew services stop redis
#### Connect to Redis & Check URL 
    redis-cli
#### Get a ton of Redis info
    redis-cli INFO
#### Clears all keys 
    redis-cli FLUSHALL
#### Lists all keys 
    redis-cli KEYS "*"

## Docker
#### If you are accessing the redis commands through docker you need to do this: 
    docker exec -it { redis_container_name } redis-cli