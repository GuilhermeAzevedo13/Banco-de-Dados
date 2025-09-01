import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Cliente from './cliente.js'

export default class Pessoa extends BaseModel {
  // Tabela associada ao model
  public static table = 'academia.pessoa'
  
  // Chave primária
  @column({ isPrimary: true })
  declare cpf: number

  // Nome
  @column()
  declare nome: string

  // Telefone
  @column()
  declare telefone: string

  // Rua
  @column()
  declare rua: string | null

  // CEP
  @column()
  declare cep: string | null

  // Número
  @column()
  declare numero: number

  // Idade
  @column()
  declare idade: number

  
  @hasOne(() => Cliente, {
    foreignKey: 'pessoa_cpf',
    localKey: 'cpf'
  })
  declare cliente: HasOne<typeof Cliente>
  

}