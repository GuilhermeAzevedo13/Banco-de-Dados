
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Contrato from '#models/cliente'

export default class Cliente extends BaseModel {

  public static table = 'academia.cliente'

  @column({isPrimary: true})
  declare matricula: number

  @column()
  declare pessoa_cpf: number

  @hasMany(() => Contrato)
  declare contratos: HasMany<typeof Contrato>
}