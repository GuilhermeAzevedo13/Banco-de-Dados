import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo} from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Cliente from '#models/cliente'

export default class Contrato extends BaseModel {

  public static table = 'academia.contrato'

  @column({ isPrimary: true })
  declare id_mensalidade: number

  @column()
  declare valor: number

  @column()
  declare vencimento: DateTime

  @column()
  declare cliente_matricula: number

  @belongsTo(() => Cliente, {
    localKey: 'matricula',       // Chave primária do Cliente
    foreignKey: 'cliente_matricula', // Coluna na tabela contrato que referencia o cliente 
  })
  declare cliente: BelongsTo<typeof Cliente>
}