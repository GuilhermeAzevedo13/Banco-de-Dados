import router from '@adonisjs/core/services/router'

const ClientesController = () => import('#controllers/clientes_controller')

router.get('/cliente', [ClientesController, 'index'])

router.post('/cliente', [ClientesController, 'store'])

router.put('/cliente/:cpf', [ClientesController, 'update'])

router.delete('/cliente/:pessoa_cpf', [ClientesController, 'delete'])