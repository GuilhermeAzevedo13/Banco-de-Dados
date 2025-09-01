package com.apiweb.apidatabase.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Pessoa")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pessoa {

    @Id
    private String cpf;

    private String nome;
    private String telefone;
    private Endereco endereco;
    private int idade;
}

