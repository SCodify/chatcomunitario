const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
  res.render('users.handlebars')
})

module.exports = router