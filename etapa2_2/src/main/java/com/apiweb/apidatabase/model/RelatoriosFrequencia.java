package com.apiweb.apidatabase.model;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RelatoriosFrequencia {
    private List<String> presente;
    private List<String> ausente;
}

