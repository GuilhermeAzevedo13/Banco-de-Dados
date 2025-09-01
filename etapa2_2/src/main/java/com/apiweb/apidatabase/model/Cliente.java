package com.apiweb.apidatabase.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "Cliente")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    @Id
    private String matricula;

    @DBRef
    private Pessoa pessoa;

    private RelatoriosFrequencia relatoriosFrequencia;
    private List<Contrato> contratos;
}
