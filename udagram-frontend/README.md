## Notes on some caveats

### The following error messages received. **Error: error:0308010C:digital envelope routines::unsupported**

`export NODE_OPTIONS=--openssl-legacy-provider # will allow older version of ssl`

### Regarding Dockerfile

The Docker image **beevelop/ionic** was only available for amd64 platform so I had issues on my local 
because the desired target platform was arm64. Added `--platform=linux/amd64` to the FROM directive.

Builded Docker image with the following command
`docker buildx build --platform linux/amd64,linux/arm64 . -t udagram-frontend`
