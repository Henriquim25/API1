const {Router} = require('express')

const SessionsController =require('../controllers/SessionController')
const SessionController = new SessionsController()

const sessionsRoutes = Router()

sessionsRoutes.post('/',SessionsController.create)