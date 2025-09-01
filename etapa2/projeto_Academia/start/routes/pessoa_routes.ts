/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const PessoasController = () => import('#controllers/pessoas_controller')

router.get('/', [PessoasController, 'index'])

router.post('/', [PessoasController, 'store'])

router.put('/:cpf', [PessoasController, 'update'])

router.delete('/:cpf', [PessoasController, 'delete'])