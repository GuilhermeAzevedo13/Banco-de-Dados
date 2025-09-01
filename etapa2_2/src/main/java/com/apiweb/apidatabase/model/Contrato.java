package com.apiweb.apidatabase.model;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contrato {

    @Id
    private String id;
    private String tipo;
    private double valor;
    private Date inicio;
    private Date fim;
    private String status;
}
