const router = require('express').Router();
const dotenv = require('dotenv'); // Using dotenv to get our mongodb uri
dotenv.config();
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

router.use(auth(config));

router.get('/', (req, res) => {
  // #swagger.tags= ['Auth']
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
router.get('/profile', requiresAuth(), (req, res) => {
  // #swagger.tags= ['Auth']
  res.send(JSON.stringify(req.oidc.user));
});
router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/orders', require('./orders'));
router.use('/products', require('./products'));
router.use('/reviews', require('./reviews'));

module.exports = router;
