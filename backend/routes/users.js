const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
  // gets list of all users from mongoDB
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
}); // handles user requests (localhost:5000/users)

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username }); // create a new instance of User

  newUser.save()
    .then(() => res.json('User added'))
    .catch((err) => res.status(400).json('Error: ' + err));
}); // handles post requests to add users

module.exports = router;