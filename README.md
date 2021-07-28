 # Authenticator
 
<img width="1440" alt="Screen Shot 2021-07-24 at 2 37 25" src="https://user-images.githubusercontent.com/54035518/126864541-04d3d60d-0b1a-4e58-83d1-8df963564362.png">

## Description 
Full-stack application for just authenticating made of TypeScript.

## Why I created
To understand how authentication flow works. I thought that the part of authentication is more difficult and important than others when it comes to applications. Also, most applications have an auth feature. So I decided to build it to comprehend every single detail of authentication flow.

## Technologies

### Language/Libraries
**Frone-End**
- TypeScript
- React
- Redux
- Emotion
- Material-UI
- Axios

**Back-End**
- TypeScript
- Express
- MongoDB

### Build tool
- Webpack

### Lint/Format/Test tools
- ESLint
- Prettier
- Jest

### CI/CD tool
- Github Actions

## OAuth flow
![OAuth flow](https://user-images.githubusercontent.com/54035518/126883889-5e505853-c635-4aac-88b8-ba9c44cf7b92.png)


## Architecture
![architecture](https://user-images.githubusercontent.com/54035518/126865120-a01822bd-0dd0-4306-bda2-083304c86fe1.png)

## Links
- Production (deployment/production branch)
    - https://authenticator-neon.vercel.app/
- Staging (deployment/staging branch)
    - https://authenticator-neon-staging.vercel.app/

note: Before visiting the website, please disable cross-site tracking permission on chrome or safari settings.
## Upcoming Features
- Add JWT authentication
- Add other OAuth providers, such as Facebook and Instagram

## References
- [passport](https://github.com/jaredhanson/passport)
- [passport-google-oauth20](https://github.com/jaredhanson/passport-google-oauth2)
