const router = require('express').Router({ mergeParams: true })
const { sequelize } = require('@server/models')

const apiLoggerMiddleware = require('@server/middleware/apiLogger')
const authMiddleware = require('@server/middleware/auth')

const usersController = require('@server/controllers/user.controller')
const authController = require('@server/controllers/auth.controller')
const stagesController = require('@server/controllers/stage.controller')

router.use(authMiddleware)
router.use(apiLoggerMiddleware)

router.use('/users', usersController)
router.use('/auth', authController)
router.use('/stages', stagesController)

router.get('/ping', async (req, res) => {
  try {
    await sequelize.query('SELECT true')

    res.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

module.exports = router
