export default {
    serverApi: 'https://server.saymo.ph/api/v1',
    staticApi: 'http://app.saymo.ph/api/v1',
    validStatusCodes: [200, 201, 202, 204, 304],
    sessionLifetime: 7200, // 2hrs (in seconds)
    googleMapsApiKey: 'AIzaSyAJjX11h7srW1zjB43bJtVifU6yiG2vYTI',
    env: {
        prod: process.env.NODE_ENV == 'production',
        dev: process.env.NODE_ENV == 'development'
    }
}
