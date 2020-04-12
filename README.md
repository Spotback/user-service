# Spotback User-Service backend

This is a **Node.js** & **Express** app made with **Typescript** and will handle CRUD functions.

* [create function](endpoints/create.md)
* [read function](endpoints/read.md)
* [update function](endpoints/update.md)
* [delete function](endpoints/delete.md)
    

## Deploying and Running

To run/deploy this example you will need to install [Node.js](https://nodejs.org/en/)
After you are done here are the necessary commands.

```sh
$ serverless deploy -v
```

## OR

```sh
$
$ sls deploy -v
```
## Invoke locally

```sh
$ serverless invoke local --function create --data '{ "body": "{\r\n    \"car\": {\r\n      \"carType\": \"sedan\",\r\n      \"color\": \"test\",\r\n      \"make\": \"test\",\r\n      \"model\": \"test\",\r\n      \"year\": \"1234\"\r\n    },\r\n    \"email\": \"dylancorbus@outlook.com\",\r\n    \"firstName\": \"Dylan\",\r\n    \"lastName\": \"Corbus\",\r\n    \"password\": \"Phone1\",\r\n    \"phone\": \"4087227387\",\r\n    \"pushToken\": \"fJBKNfNJ5BI:APA91bGSxW6yFS9YEvTyYcQVkXThQ8fWp6SZvS5d9Z5aLW0-IiGnkXPPdBm7y_oToCoZ3c0m486d8HHDxztI5aAzHq0GCxe50F0gCs5YJLY8g7SnJ73jYUTEF_5QzgTvbZKVycCRdCxM\",\r\n    \"stripeToken\": \"pm_1FZqMcFBWZTvTTeaR1Z6pPHY\"\r\n  }", "resource": "/users", "path": "/users/createAccount", "httpMethod": "POST", "queryStringParameters": {}, "pathParameters": {}, "stageVariables": { "baz": "qux" }, "headers": { "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8", "Accept-Encoding": "gzip, deflate, sdch", "Accept-Language": "en-US,en;q=0.8", "Cache-Control": "max-age=0", "CloudFront-Forwarded-Proto": "https", "CloudFront-Is-Desktop-Viewer": "true", "CloudFront-Is-Mobile-Viewer": "false", "CloudFront-Is-SmartTV-Viewer": "false", "CloudFront-Is-Tablet-Viewer": "false", "CloudFront-Viewer-Country": "US", "Host": "1234567890.execute-api.{dns_suffix}", "Upgrade-Insecure-Requests": "1", "User-Agent": "Custom User Agent String", "Via": "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)", "X-Amz-Cf-Id": "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==", "X-Forwarded-For": "127.0.0.1, 127.0.0.2", "spotback-correlation-id": "1234", "X-Forwarded-Port": "443", "X-Forwarded-Proto": "https" }, "requestContext": { "accountId": "123456789012", "resourceId": "123456", "stage": "prod", "requestId": "c6af9ac6-7b61-11e6-9a41-93e8deadbeef", "identity": { "cognitoIdentityPoolId": null, "accountId": null, "cognitoIdentityId": null, "caller": null, "apiKey": null, "sourceIp": "127.0.0.1", "cognitoAuthenticationType": null, "cognitoAuthenticationProvider": null, "userArn": null, "userAgent": "Custom User Agent String", "user": null }, "resourcePath": "/{proxy+}", "httpMethod": "POST", "apiId": "1234567890" } }'

$ serverless invoke local --function create --data '{ "body": "", "resource": "/users", "path": "/users/referralCode", "httpMethod": "GET", "queryStringParameters": {}, "pathParameters": {}, "stageVariables": { "baz": "qux" }, "headers": { "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8", "Accept-Encoding": "gzip, deflate, sdch", "Accept-Language": "en-US,en;q=0.8", "Cache-Control": "max-age=0", "CloudFront-Forwarded-Proto": "https", "CloudFront-Is-Desktop-Viewer": "true", "CloudFront-Is-Mobile-Viewer": "false", "CloudFront-Is-SmartTV-Viewer": "false", "CloudFront-Is-Tablet-Viewer": "false", "CloudFront-Viewer-Country": "US", "Host": "1234567890.execute-api.{dns_suffix}", "Upgrade-Insecure-Requests": "1", "User-Agent": "Custom User Agent String", "Via": "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)", "X-Amz-Cf-Id": "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==", "X-Forwarded-For": "127.0.0.1, 127.0.0.2", "spotback-correlation-id": "1234", "Bearer": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdXNoVG9rZW4iOiJmSkJLTmZOSjVCSTpBUEE5MWJHU3hXNnlGUzlZRXZUeVljUVZrWFRoUThmV3A2U1p2UzVkOVo1YUxXMC1JaUdua1hQUGRCbTd5X29Ub0NvWjNjMG00ODZkOEhIRHh6dEk1YUF6SHEwR0N4ZTUwRjBnQ3M1WUpMWThnN1NuSjczallVVEVGXzVRemdUdmJaS1Z5Y0NSZEN4TSIsImxhc3ROYW1lIjoiVXNlciIsImZyZWVTcG90cyI6MSwiZW1haWwiOiJzcG90YmFja3RlYW1AZ21haWwuY29tIiwiY3JlYXRlZF90aW1lIjoxNTczMzc2Njg3NTM1LCJ2ZXJpZmllZCI6ZmFsc2UsImZpcnN0TmFtZSI6IlRlc3QiLCJwYXNzd29yZCI6InNoYTEkNWJlNTFiMjMkMSQ2MTBkNjY5NzhkYjU0ZjBiNWE3ZWQ3MmE3YTQxYmMzNWQ5NWUwMzg4IiwiYmFsYW5jZSI6MCwiY2FyIjp7Im1vZGVsIjoiY2l2aWMiLCJjYXJUeXBlIjoiY291cGUiLCJjb2xvciI6InJlZCIsIm1ha2UiOiJob25kYSIsInllYXIiOiIxOTk1In0sInN0cmlwZVRva2VuIjoicG1fMUZacU1jRkJXWlR2VFRlYVIxWjZwUEhZIiwicGhvbmUiOiIxNDA4NzIyNzM4NyIsInJlZmVycmFscyI6W10sImlhdCI6MTU3MzQxMTQ5NSwiZXhwIjoxNTc2MDM5NDk1LCJhdWQiOiJodHRwczovL3d3dy5zcG90YmFjay5pbyIsImlzcyI6InNwb3RiYWNrLmlvIn0.hwHgfJfdC5_Zl5-QypG4VI580Zh_5I5AkLvXypXafYp1PLS9q4ru9B0bvsNR-5H8i-4P6MJZ2Jf4w_Fw_X3RVntaQT-sZ4FVCGzWWNvI-eAabvRUzCFjmvB56dil0GT5OuQcgZFBRza5FRHwPVPE4RnsJ-7odbVkjJVUsi1FaEelStp1jIdW7ALz8lHdAyM0czT6I_7KMWR7Fca2Rh3jMeQKeix3nolE0Y-knykXsky8VMS2aJwDhF-3sl-4cS6mJkHpw245bN_6nNpz25cBx_-10Knt2xs1Nc7cHS8grugmJY2uRUkHyXcWXhX6yGgE6edzWE1QLCDhsmK708l1hw", "X-Forwarded-Port": "443", "X-Forwarded-Proto": "https" }, "requestContext": { "accountId": "123456789012", "resourceId": "123456", "stage": "prod", "requestId": "c6af9ac6-7b61-11e6-9a41-93e8deadbeef", "identity": { "cognitoIdentityPoolId": null, "accountId": null, "cognitoIdentityId": null, "caller": null, "apiKey": null, "sourceIp": "127.0.0.1", "cognitoAuthenticationType": null, "cognitoAuthenticationProvider": null, "userArn": null, "userAgent": "Custom User Agent String", "user": null }, "resourcePath": "/{proxy+}", "httpMethod": "POST", "apiId": "1234567890" } }'

$ serverless invoke local --function read --data '{ "body": "{ \"email\" : \"spotbackteam@gmail.com\", \"password\" : \"Test\"}", "resource": "/users", "path": "/users/readAccount", "httpMethod": "POST", "queryStringParameters": {}, "pathParameters": { "api_version": "123" }, "stageVariables": { "baz": "qux" }, "headers": { "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8", "Accept-Encoding": "gzip, deflate, sdch", "Accept-Language": "en-US,en;q=0.8", "Cache-Control": "max-age=0", "CloudFront-Forwarded-Proto": "https", "CloudFront-Is-Desktop-Viewer": "true", "CloudFront-Is-Mobile-Viewer": "false", "CloudFront-Is-SmartTV-Viewer": "false", "CloudFront-Is-Tablet-Viewer": "false", "CloudFront-Viewer-Country": "US", "Host": "1234567890.execute-api.{dns_suffix}", "Upgrade-Insecure-Requests": "1", "User-Agent": "Custom User Agent String", "Via": "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)", "X-Amz-Cf-Id": "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==", "X-Forwarded-For": "127.0.0.1, 127.0.0.2", "spotback-correlation-id": "1234", "X-Forwarded-Port": "443", "X-Forwarded-Proto": "https" }, "requestContext": { "accountId": "123456789012", "resourceId": "123456", "stage": "prod", "requestId": "c6af9ac6-7b61-11e6-9a41-93e8deadbeef", "identity": { "cognitoIdentityPoolId": null, "accountId": null, "cognitoIdentityId": null, "caller": null, "apiKey": null, "sourceIp": "127.0.0.1", "cognitoAuthenticationType": null, "cognitoAuthenticationProvider": null, "userArn": null, "userAgent": "Custom User Agent String", "user": null }, "resourcePath": "/{proxy+}", "httpMethod": "POST", "apiId": "1234567890" } }'

$ serverless invoke local --function read --data '{ "body": "", "resource": "/users", "path": "/users/readAccount", "httpMethod": "GET", "queryStringParameters": {}, "pathParameters": { "api_version": "123" }, "stageVariables": { "baz": "qux" }, "headers": { "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8", "Accept-Encoding": "gzip, deflate, sdch", "Accept-Language": "en-US,en;q=0.8", "Cache-Control": "max-age=0", "CloudFront-Forwarded-Proto": "https", "CloudFront-Is-Desktop-Viewer": "true", "CloudFront-Is-Mobile-Viewer": "false", "CloudFront-Is-SmartTV-Viewer": "false", "CloudFront-Is-Tablet-Viewer": "false", "CloudFront-Viewer-Country": "US", "Host": "1234567890.execute-api.{dns_suffix}", "Upgrade-Insecure-Requests": "1", "User-Agent": "Custom User Agent String", "Via": "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)", "X-Amz-Cf-Id": "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==", "X-Forwarded-For": "127.0.0.1, 127.0.0.2", "spotback-correlation-id": "1234", "Bearer": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6InNoYTEkZWYxMTUwZDMkMSQzYzNmYzVlMGJjNTQzOGYyZDRiMzk3YTliNTI0ZWQ5NGZiOTAzNTUzIiwiYmFsYW5jZSI6MCwiY2FyIjp7Im1vZGVsIjoidGVzdCIsImNhclR5cGUiOiJzZWRhbiIsImNvbG9yIjoidGVzdCIsInllYXIiOiIxMjM0IiwibWFrZSI6InRlc3QifSwicHVzaFRva2VuIjoiZDlpSGFvU1ROQUE6QVBBOTFiR2I4S05MUGg0R2U3dXJLUDRkVno1TGVBNWtYWFpvb2tVZnZkQmppLUdQUk1FZGFDdS1rOGtwSFBtc3ZuMjFENnB2YldiMElMdldDUUxoeGtqcFRuMFM4SDdBVTJ4M0hvZkJsSWI0eS1SX1Y5YnRsNWl5VXp3NDhQU1pzOFlVUEpXa2FMajUiLCJsYXN0TmFtZSI6IlNva29sIiwiZnJlZVNwb3RzIjowLCJlbWFpbCI6ImhpZGFuNDQ2QGdtYWlsLmNvbSIsImNyZWF0ZWRfdGltZSI6MTU3MzYxODgxNTI5MywicGhvbmUiOiI0MDg5OTk2NjMzIiwidmVyaWZpZWQiOmZhbHNlLCJmaXJzdE5hbWUiOiJEbWl0cnkiLCJyZWZlcnJhbHMiOltdLCJpYXQiOjE1NzM2MTkxNDQsImV4cCI6MTU3NjI0NzE0NCwiYXVkIjoiaHR0cHM6Ly93d3cuc3BvdGJhY2suaW8iLCJpc3MiOiJzcG90YmFjay5pbyJ9.gVrzbTcRDoRQx0S3Dl7GbGQlXdf_YQ8UrsDtZkJDu-lT6ZpRDfdqqMx7P7I7RU85J56IfvSKn-tReUy7rAgNaP91cTxPxFGn-_5HNqBmzRAWebgRppSiLs4iTJ6RcGYW4G4BHuRi50WjPjdwrIm2eR8VZya_F5zRNdUC_RpYHDdck_OGIy47BjmHzp8I1SZrVX_7dlrpzGmeZ2afUgw9xOi6MdiiYLvW7hJkT8tO0Tjvm0B9R_5mY8A5P3pn3vxFqQWvq9i8oiAMZV9b6pjc-Mk6fOpj6LYb-PUFOb-2k4Cv_wkeeY4Wyyhy5XcZRTZ8qKFp5EnpFhRdOnYqCtuMIg", "X-Forwarded-Port": "443", "X-Forwarded-Proto": "https" }, "requestContext": { "accountId": "123456789012", "resourceId": "123456", "stage": "prod", "requestId": "c6af9ac6-7b61-11e6-9a41-93e8deadbeef", "identity": { "cognitoIdentityPoolId": null, "accountId": null, "cognitoIdentityId": null, "caller": null, "apiKey": null, "sourceIp": "127.0.0.1", "cognitoAuthenticationType": null, "cognitoAuthenticationProvider": null, "userArn": null, "userAgent": "Custom User Agent String", "user": null }, "resourcePath": "/{proxy+}", "httpMethod": "POST", "apiId": "1234567890" } }'

$ serverless invoke local --function update --data '{ "body": "{\r\n    \"car\": {\r\n      \"carType\": \"sedan\",\r\n      \"color\": \"orange\",\r\n      \"make\": \"BMW\",\r\n      \"model\": \"M3\",\r\n      \"year\": \"1997\"\r\n    },\r\n  \"password\": \"Phone2\",  \"phone\": \"1234\"\r\n}", "resource": "/users", "path": "/users/updateAccount", "httpMethod": "POST", "queryStringParameters": {}, "pathParameters": { "api_version": "123" }, "stageVariables": { "baz": "qux" }, "headers": { "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8", "Accept-Encoding": "gzip, deflate, sdch", "Accept-Language": "en-US,en;q=0.8", "Cache-Control": "max-age=0", "CloudFront-Forwarded-Proto": "https", "CloudFront-Is-Desktop-Viewer": "true", "CloudFront-Is-Mobile-Viewer": "false", "CloudFront-Is-SmartTV-Viewer": "false", "CloudFront-Is-Tablet-Viewer": "false", "CloudFront-Viewer-Country": "US", "Host": "1234567890.execute-api.{dns_suffix}", "Upgrade-Insecure-Requests": "1", "User-Agent": "Custom User Agent String", "Via": "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)", "X-Amz-Cf-Id": "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==", "X-Forwarded-For": "127.0.0.1, 127.0.0.2", "spotback-correlation-id": "1234", "Bearer": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdXNoVG9rZW4iOiJmSkJLTmZOSjVCSTpBUEE5MWJHU3hXNnlGUzlZRXZUeVljUVZrWFRoUThmV3A2U1p2UzVkOVo1YUxXMC1JaUdua1hQUGRCbTd5X29Ub0NvWjNjMG00ODZkOEhIRHh6dEk1YUF6SHEwR0N4ZTUwRjBnQ3M1WUpMWThnN1NuSjczallVVEVGXzVRemdUdmJaS1Z5Y0NSZEN4TSIsImxhc3ROYW1lIjoiVXNlciIsImZyZWVTcG90cyI6MSwiZW1haWwiOiJzcG90YmFja3RlYW1AZ21haWwuY29tIiwiY3JlYXRlZF90aW1lIjoxNTczMzc2Njg3NTM1LCJ2ZXJpZmllZCI6ZmFsc2UsImZpcnN0TmFtZSI6IlRlc3QiLCJwYXNzd29yZCI6InNoYTEkNWJlNTFiMjMkMSQ2MTBkNjY5NzhkYjU0ZjBiNWE3ZWQ3MmE3YTQxYmMzNWQ5NWUwMzg4IiwiYmFsYW5jZSI6MCwiY2FyIjp7Im1vZGVsIjoiY2l2aWMiLCJjYXJUeXBlIjoiY291cGUiLCJjb2xvciI6InJlZCIsIm1ha2UiOiJob25kYSIsInllYXIiOiIxOTk1In0sInN0cmlwZVRva2VuIjoicG1fMUZacU1jRkJXWlR2VFRlYVIxWjZwUEhZIiwicGhvbmUiOiIxNDA4NzIyNzM4NyIsInJlZmVycmFscyI6W10sImlhdCI6MTU3MzQxMTQ5NSwiZXhwIjoxNTc2MDM5NDk1LCJhdWQiOiJodHRwczovL3d3dy5zcG90YmFjay5pbyIsImlzcyI6InNwb3RiYWNrLmlvIn0.hwHgfJfdC5_Zl5-QypG4VI580Zh_5I5AkLvXypXafYp1PLS9q4ru9B0bvsNR-5H8i-4P6MJZ2Jf4w_Fw_X3RVntaQT-sZ4FVCGzWWNvI-eAabvRUzCFjmvB56dil0GT5OuQcgZFBRza5FRHwPVPE4RnsJ-7odbVkjJVUsi1FaEelStp1jIdW7ALz8lHdAyM0czT6I_7KMWR7Fca2Rh3jMeQKeix3nolE0Y-knykXsky8VMS2aJwDhF-3sl-4cS6mJkHpw245bN_6nNpz25cBx_-10Knt2xs1Nc7cHS8grugmJY2uRUkHyXcWXhX6yGgE6edzWE1QLCDhsmK708l1hw", "X-Forwarded-Port": "443", "X-Forwarded-Proto": "https" }, "requestContext": { "accountId": "123456789012", "resourceId": "123456", "stage": "prod", "requestId": "c6af9ac6-7b61-11e6-9a41-93e8deadbeef", "identity": { "cognitoIdentityPoolId": null, "accountId": null, "cognitoIdentityId": null, "caller": null, "apiKey": null, "sourceIp": "127.0.0.1", "cognitoAuthenticationType": null, "cognitoAuthenticationProvider": null, "userArn": null, "userAgent": "Custom User Agent String", "user": null }, "resourcePath": "/{proxy+}", "httpMethod": "POST", "apiId": "1234567890" } }'

$ serverless invoke local --function update --data '{ "body": "", "resource": "/users", "path": "/users/validateAccount", "httpMethod": "GET", "queryStringParameters": { "email": "dylancorbus@outlook.com" }, "pathParameters": { "api_version": "123" }, "stageVariables": { "baz": "qux" }, "headers": { "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8", "Accept-Encoding": "gzip, deflate, sdch", "Accept-Language": "en-US,en;q=0.8", "Cache-Control": "max-age=0", "CloudFront-Forwarded-Proto": "https", "CloudFront-Is-Desktop-Viewer": "true", "CloudFront-Is-Mobile-Viewer": "false", "CloudFront-Is-SmartTV-Viewer": "false", "CloudFront-Is-Tablet-Viewer": "false", "CloudFront-Viewer-Country": "US", "Host": "1234567890.execute-api.{dns_suffix}", "Upgrade-Insecure-Requests": "1", "User-Agent": "Custom User Agent String", "Via": "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)", "X-Amz-Cf-Id": "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==", "X-Forwarded-For": "127.0.0.1, 127.0.0.2", "spotback-correlation-id": "1234", "X-Forwarded-Port": "443", "X-Forwarded-Proto": "https" }, "requestContext": { "accountId": "123456789012", "resourceId": "123456", "stage": "prod", "requestId": "c6af9ac6-7b61-11e6-9a41-93e8deadbeef", "identity": { "cognitoIdentityPoolId": null, "accountId": null, "cognitoIdentityId": null, "caller": null, "apiKey": null, "sourceIp": "127.0.0.1", "cognitoAuthenticationType": null, "cognitoAuthenticationProvider": null, "userArn": null, "userAgent": "Custom User Agent String", "user": null }, "resourcePath": "/{proxy+}", "httpMethod": "POST", "apiId": "1234567890" } }'

$ serverless invoke local --function delete --data '{ "body": "", "resource": "/users", "path": "/users/deleteAccount", "httpMethod": "GET", "queryStringParameters": {}, "pathParameters": { "api_version": "123" }, "stageVariables": { "baz": "qux" }, "headers": { "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8", "Accept-Encoding": "gzip, deflate, sdch", "Accept-Language": "en-US,en;q=0.8", "Cache-Control": "max-age=0", "CloudFront-Forwarded-Proto": "https", "CloudFront-Is-Desktop-Viewer": "true", "CloudFront-Is-Mobile-Viewer": "false", "CloudFront-Is-SmartTV-Viewer": "false", "CloudFront-Is-Tablet-Viewer": "false", "CloudFront-Viewer-Country": "US", "Host": "1234567890.execute-api.{dns_suffix}", "Upgrade-Insecure-Requests": "1", "User-Agent": "Custom User Agent String", "Via": "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)", "X-Amz-Cf-Id": "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==", "X-Forwarded-For": "127.0.0.1, 127.0.0.2", "spotback-correlation-id": "1234", "Bearer": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdXNoVG9rZW4iOiJmSkJLTmZOSjVCSTpBUEE5MWJHU3hXNnlGUzlZRXZUeVljUVZrWFRoUThmV3A2U1p2UzVkOVo1YUxXMC1JaUdua1hQUGRCbTd5X29Ub0NvWjNjMG00ODZkOEhIRHh6dEk1YUF6SHEwR0N4ZTUwRjBnQ3M1WUpMWThnN1NuSjczallVVEVGXzVRemdUdmJaS1Z5Y0NSZEN4TSIsImxhc3ROYW1lIjoiVXNlciIsImZyZWVTcG90cyI6MSwiZW1haWwiOiJzcG90YmFja3RlYW1AZ21haWwuY29tIiwiY3JlYXRlZF90aW1lIjoxNTczMzc2Njg3NTM1LCJ2ZXJpZmllZCI6ZmFsc2UsImZpcnN0TmFtZSI6IlRlc3QiLCJwYXNzd29yZCI6InNoYTEkNWJlNTFiMjMkMSQ2MTBkNjY5NzhkYjU0ZjBiNWE3ZWQ3MmE3YTQxYmMzNWQ5NWUwMzg4IiwiYmFsYW5jZSI6MCwiY2FyIjp7Im1vZGVsIjoiY2l2aWMiLCJjYXJUeXBlIjoiY291cGUiLCJjb2xvciI6InJlZCIsIm1ha2UiOiJob25kYSIsInllYXIiOiIxOTk1In0sInN0cmlwZVRva2VuIjoicG1fMUZacU1jRkJXWlR2VFRlYVIxWjZwUEhZIiwicGhvbmUiOiIxNDA4NzIyNzM4NyIsInJlZmVycmFscyI6W10sImlhdCI6MTU3MzQxMTQ5NSwiZXhwIjoxNTc2MDM5NDk1LCJhdWQiOiJodHRwczovL3d3dy5zcG90YmFjay5pbyIsImlzcyI6InNwb3RiYWNrLmlvIn0.hwHgfJfdC5_Zl5-QypG4VI580Zh_5I5AkLvXypXafYp1PLS9q4ru9B0bvsNR-5H8i-4P6MJZ2Jf4w_Fw_X3RVntaQT-sZ4FVCGzWWNvI-eAabvRUzCFjmvB56dil0GT5OuQcgZFBRza5FRHwPVPE4RnsJ-7odbVkjJVUsi1FaEelStp1jIdW7ALz8lHdAyM0czT6I_7KMWR7Fca2Rh3jMeQKeix3nolE0Y-knykXsky8VMS2aJwDhF-3sl-4cS6mJkHpw245bN_6nNpz25cBx_-10Knt2xs1Nc7cHS8grugmJY2uRUkHyXcWXhX6yGgE6edzWE1QLCDhsmK708l1hw", "X-Forwarded-Port": "443", "X-Forwarded-Proto": "https" }, "requestContext": { "accountId": "123456789012", "resourceId": "123456", "stage": "prod", "requestId": "c6af9ac6-7b61-11e6-9a41-93e8deadbeef", "identity": { "cognitoIdentityPoolId": null, "accountId": null, "cognitoIdentityId": null, "caller": null, "apiKey": null, "sourceIp": "127.0.0.1", "cognitoAuthenticationType": null, "cognitoAuthenticationProvider": null, "userArn": null, "userAgent": "Custom User Agent String", "user": null }, "resourcePath": "/{proxy+}", "httpMethod": "POST", "apiId": "1234567890" } }'
```

### Use this as the input after the data flag:
```json
{
  "resource": "/",
  "path": "/",
  "httpMethod": "POST",
  "headers": {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-GB,en-US;q=0.8,en;q=0.6,zh-CN;q=0.4",
    "cache-control": "max-age=0",
    "CloudFront-Forwarded-Proto": "https",
    "CloudFront-Is-Desktop-Viewer": "true",
    "CloudFront-Is-Mobile-Viewer": "false",
    "CloudFront-Is-SmartTV-Viewer": "false",
    "CloudFront-Is-Tablet-Viewer": "false",
    "CloudFront-Viewer-Country": "GB",
    "content-type": "application/x-www-form-urlencoded",
    "Host": "j3ap25j034.execute-api.eu-west-2.amazonaws.com",
    "origin": "https://j3ap25j034.execute-api.eu-west-2.amazonaws.com",
    "Referer": "https://j3ap25j034.execute-api.eu-west-2.amazonaws.com/dev/",
    "upgrade-insecure-requests": "1",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
    "Via": "2.0 a3650115c5e21e2b5d133ce84464bea3.cloudfront.net (CloudFront)",
    "X-Amz-Cf-Id": "0nDeiXnReyHYCkv8cc150MWCFCLFPbJoTs1mexDuKe2WJwK5ANgv2A==",
    "X-Amzn-Trace-Id": "Root=1-597079de-75fec8453f6fd4812414a4cd",
    "X-Forwarded-For": "50.129.117.14, 50.112.234.94",
    "X-Forwarded-Port": "443",
    "X-Forwarded-Proto": "https"
  },
  "queryStringParameters": null,
  "pathParameters": null,
  "stageVariables": null,
  "requestContext": {
    "path": "/dev/",
    "accountId": "125002137610",
    "resourceId": "qdolsr1yhk",
    "stage": "dev",
    "requestId": "0f2431a2-6d2f-11e7-b75152aa497861",
    "identity": {
      "cognitoIdentityPoolId": null,
      "accountId": null,
      "cognitoIdentityId": null,
      "caller": null,
      "apiKey": "",
      "sourceIp": "50.129.117.14",
      "accessKey": null,
      "cognitoAuthenticationType": null,
      "cognitoAuthenticationProvider": null,
      "userArn": null,
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
      "user": null
    },
    "resourcePath": "/",
    "httpMethod": "POST",
    "apiId": "j3azlsj0c4"
  },
  "body": "postcode=LS17FR",
  "isBase64Encoded": false
}
```
After this you should have your Lambda service up and running.
You can find a blog post about this example [here](http://lazarbulic.com/blog/?p=154&preview=true).
