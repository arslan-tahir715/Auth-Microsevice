# Core-Auth 

The Service is an in-house authentication model based on the PropelAuth authentication `https://docs.propelauth.com/reference/backend-apis/api/`:

## Local Development

Start the server in developer's mode using:

`npm run start-dev`


## Routes

For creating a user:

`/api/fe/v1/signup`

For login using Email and Password:

`/api/fe/v1/login`

For Access token to be updated, the refresh_token route:

`/api/v1/refresh_token`