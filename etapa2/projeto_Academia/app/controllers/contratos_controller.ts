import type { HttpContext } from '@adonisjs/core/http'
import Contrato from '#models/contrato'
import Cliente from '#models/cliente'

export default class ContratosController {

  async index({ response }: HttpContext) {
    try {

      const contratos = await Contrato.query().preload('cliente')

      return response.status(200).json({
        success: true,
        contratos,
      })
    } catch (error) {
      console.log(error)
      return response.status(500).json({
        success: false,
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext){
    try {
      const createContrato = request.body()

      const clientesMatricula = await Cliente.findBy('matricula', createContrato.cliente_matricula)

      if (!clientesMatricula) {
        return response.status(404).json({
          success: false,
          message: 'Cliente não encontrada. Cadastre o cliente antes de criar um contrato.',
        })
      }

      const contrato = new Contrato()

      contrato.valor = createContrato.valor
      contrato.vencimento = createContrato.vencimento
      contrato.cliente_matricula = createContrato.cliente_matricula

      await contrato.save()

      return response.status(201).json({
        success: true,
        message: 'Contrato cadastrado com sucesso!',
        contrato,
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
    try {

      const ClienteMatricula = request.param('cliente_matricula')

      // Busca o contrato pelo seu id (id_mensalidade)
      const contrato = await Contrato.findBy('cliente_matricula', ClienteMatricula)

      if (!contrato) {
        return response.status(404).json({
          success: false,
          message: 'Contrato não encontrado.',
        })
      }

      const updateContrato = request.body()

      contrato.valor = updateContrato.valor
      contrato.vencimento = updateContrato.vencimento
      contrato.cliente_matricula = updateContrato.cliente_matricula

      await contrato.save()

      return response.status(200).json({
        success: true,
        message: 'CONTRATO atualizado com sucesso!',
        contrato,
      })

    } catch (error) {
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
      const cliente_matricula = request.param('cliente_matricula')

      console.log('cliente_matricula:', cliente_matricula)

      if (!cliente_matricula) {
        return response.status(400).json({
          success: false,
          message: 'CPF não fornecida ou inválida',
        })
      }
      
      await Contrato.query().where('cliente_matricula', cliente_matricula).delete()

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