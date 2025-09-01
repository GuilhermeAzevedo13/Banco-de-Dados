import router from '@adonisjs/core/services/router'

const ContratosController = () => import('#controllers/contratos_controller')

router.get('/contrato', [ContratosController, 'index'])

router.post('/contrato', [ContratosController, 'store'])

router.put('/contrato/:cliente_matricula', [ContratosController, 'update'])

router.delete('/contrato/:cliente_matricula', [ContratosController, 'delete'])