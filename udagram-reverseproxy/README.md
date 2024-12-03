## Notes on caveats

During experimentation, reverse proxy was not connecting to upstream server. 
Realize that `localhost` did not resolve to the running backend services as 
expected. Leverage `host.docker.internal` in the `nginx.conf` to get around 
that for testing purposes. 