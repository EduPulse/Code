/* React configuration
 * Setup configuration options and constants in here
*/

const environment = process.env.NODE_ENV;
const applicationRoot = (environment === 'production') ? window.location.origin : `${window.location.protocol}//${window.location.hostname}:9000`;
const URIs = {
    post: '/components/academicUser/viewArticle/',
    user: '/components/academicUser/authorProfile/'
}
const clients={
        unsplash:{
            access_key:"1BUdbzubiRw5_iYRYdYdth_ud40ySWBVwPtUgSjWTME"
        }
}
module.exports = Object.freeze({
    environment,
    applicationRoot,
    URIs,
    clients
});
