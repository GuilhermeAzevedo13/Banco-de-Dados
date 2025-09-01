import type { HttpContext } from '@adonisjs/core/http'
import Pessoa from '#models/pessoa'

export default class PessoasController {
  // Listar Tabela Pessoas
  async index({ response }: HttpContext) {
    try {
      const pessoas = await Pessoa.query().preload('cliente')

      return response.status(200).json({
        sucess: true,
        pessoas: pessoas,
      })
    } catch (error) {
      console.log(error)

      return response.status(error.status || 500).json({
        success: false,
        error: {
          ...error,
        },
      })
    }
  }

  //Inserir Pessoas
  async store({ request, response }: HttpContext) {
    try {
      const createPessoa = request.body()

      const pessoasCPF = await Pessoa.findBy('cpf', createPessoa.cpf)

      const pessoasTELEFONE = await Pessoa.findBy('telefone', createPessoa.telefone)

      if(pessoasCPF) {
        return response.status(422).json({
          sucess:false,
          error: {
            error_message: 'CPF já inserido'
          },
        })
      }

      if(pessoasTELEFONE) {
        return response.status(422).json({
          sucess:false,
          error: {
            error_message: 'Telefone já inserido'
          },
        })
      }

      const pessoa = new Pessoa()

      pessoa.cpf = createPessoa.cpf
      pessoa.nome = createPessoa.nome
      pessoa.telefone = createPessoa.telefone
      pessoa.rua = createPessoa.rua
      pessoa.cep = createPessoa.cep
      pessoa.numero = createPessoa.numero
      pessoa.idade = createPessoa.idade

      await pessoa.save()


    } catch (error) {
      console.log(error)
    }
  }

  // Atualizar dados no Banco de Dados
  async update({ request, response }: HttpContext){
    try{

      const updatePessoa = request.body()

      const cpf = request.param('cpf')

      const pessoa = await Pessoa.findOrFail(cpf)

      pessoa.nome = updatePessoa.nome
      pessoa.telefone = updatePessoa.telefone
      pessoa.rua = updatePessoa.rua
      pessoa.cep = updatePessoa.cep
      pessoa.numero = updatePessoa.numero
      pessoa.idade = updatePessoa.idade


      await pessoa.save()


    } catch (error) {
      console.log(error)

      return response.status(error.status || 500).json({
        success: false,
        error: {
          ...error,
        },
      })
    }
  }

  // Deletar do Banco de Dados
  async delete({ request, response }: HttpContext){
    try{
      const cpf = request.param('cpf')
      
      await Pessoa.query().where('cpf', cpf).delete()

      return response.status(200).json({
        success: true,
      })
  
    } catch (error){
      console.log(error)

      return response.status(error.status || 500).json({
        success: false,
        error: {
          ...error,
        },
      })
    }
  }

}