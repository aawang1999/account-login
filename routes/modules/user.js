const express = require('express')
const Account = require('../../models/account')
const router = express.Router()

router.get('/', (req, res) => {
  return res.redirect('login')
})

router.get('/login', (req, res) => {
  return res.render('login')
})

router.get('/show/:id', (req, res) => {
  const id = req.params.id
  return Account.findById(id)
    .lean()
    .then(user => {
      res.render('show', { user })
    })
})

router.post('/login', (req, res) => {
  return Account.findOne({ email: req.body.email })
    .lean()
    .then(user => {
      if (!user) {
        const alert = 'This email is not registered.'
        return res.render('login', { alert })
      }
      if (user.password !== req.body.password) {
        const alert = 'Incorrect password.'
        return res.render('login', { alert })
      }
      return res.redirect(`/show/${user._id}`)
    })
})

module.exports = router