import type { HttpContext } from '@adonisjs/core/http'
import Cliente from '#models/cliente'
import Pessoa from '#models/pessoa'

export default class ClientesController {

  async index({ response }:HttpContext){
    try{
      const cliente = await Cliente.all()

      return response.status(200).json({
        success: true,
        cliente: cliente,
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

  async store({ request, response }: HttpContext) {
    try {
      const createCliente = request.body()
  
      if (!createCliente.cpf || !createCliente.pessoa_cpf) {
        return response.status(400).json({
          success: false,
          message: 'CPF e Pessoa CPF são obrigatórios.',
        })
      }
  
      // Buscar a pessoa pelo CPF
      const cpfCliente = await Pessoa.findBy('cpf', createCliente.cpf)
  
      if (!cpfCliente) {
        return response.status(404).json({
          success: false,
          message: 'Pessoa não encontrada. Cadastre a pessoa antes de criar um cliente.',
        })
      }
  
      // Verifica se já existe um cliente associado a essa pessoa
      const clienteExistente = await Cliente.findBy('pessoa_cpf', createCliente.pessoa_cpf)
  
      if (clienteExistente) {
        return response.status(400).json({
          success: false,
          message: 'Essa pessoa já tem uma matrícula associada.',
        })
      }
  
      // Criar novo cliente e associar o CPF da pessoa
      const cliente = new Cliente()
  
      cliente.matricula = createCliente.matricula
      cliente.pessoa_cpf = createCliente.pessoa_cpf // Referencia a pessoa
  
      await cliente.save()
  
      return response.status(201).json({
        success: true,
        message: 'Cliente cadastrado com sucesso!',
        cliente,
      })
    } catch (error) {
      console.log(error)
      return response.status(500).json({
        success: false,
        error: error.message,
      })
    }
  }
  
  async update({ request, response }: HttpContext){
    try{

      const updateCliente = request.body()
      const cpf = request.param('cpf')

      // Verificar se a pessoa existe
      const pessoa = await Pessoa.findBy('cpf', cpf)

      if (!pessoa) {
        return response.status(404).json({
          success: false,
          message: 'Pessoa não encontrada.',
        })
      }

      // Verificar se a pessoa já tem uma matrícula associada
      const clienteExistente = await Cliente.findBy('pessoa_cpf', cpf)

      if (clienteExistente) {
        return response.status(400).json({
          success: false,
          message: 'Essa pessoa já tem uma matrícula associada.',
        })
      }

      // Se a pessoa não tem matrícula, cria uma nova matrícula
      const cliente = new Cliente()
      cliente.matricula = updateCliente.matricula // Matrícula que é passada no PUT
      cliente.pessoa_cpf = cpf // Associa a pessoa com a matrícula

      await cliente.save()

      return response.status(200).json({
        success: true,
        message: 'Cliente atualizado com sucesso!',
        cliente,
      })



    } catch (error){
        console.log(error)
        return response.status(500).json({
        success: false,
        error: error.message,
        })
    }
  }

  // Deletar do Banco de Dados
  async delete({ request, response }: HttpContext){
    try{
      const pessoa_cpf = request.param('pessoa_cpf')

      console.log('pessoa_cpf:', pessoa_cpf)

      if (!pessoa_cpf) {
        return response.status(400).json({
          success: false,
          message: 'CPF não fornecida ou inválida',
        })
      }
      
      await Cliente.query().where('pessoa_cpf', pessoa_cpf).delete()

      return response.status(200).json({
        success: true,
        message: 'Cliente removido com sucesso!',
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


