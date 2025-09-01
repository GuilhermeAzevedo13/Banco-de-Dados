package com.apiweb.apidatabase.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "endereco")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Endereco {

    private String rua;
    private String cep;
    private int numero;

}

