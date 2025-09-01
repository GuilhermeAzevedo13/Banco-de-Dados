package com.apiweb.apidatabase.controller;

import com.apiweb.apidatabase.model.Contrato;
import com.apiweb.apidatabase.service.ContratoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cliente/{clienteId}/contrato")
public class ContratoController {

    @Autowired
    private ContratoService contratoService;

    @PostMapping("/add")
    public ResponseEntity<Contrato> adicionarContrato(@PathVariable String clienteId, @RequestBody Contrato contrato) {
        Contrato novoContrato = contratoService.adicionarContrato(clienteId, contrato);
        return novoContrato != null ? new ResponseEntity<>(novoContrato, HttpStatus.CREATED)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/get")
    public ResponseEntity<List<Contrato>> listarContratos(@PathVariable String clienteId) {
        List<Contrato> contratos = contratoService.listarContratos(clienteId);
        return contratos != null ? new ResponseEntity<>(contratos, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/get/{contratoId}")
    public ResponseEntity<Contrato> buscarContrato(@PathVariable String clienteId, @PathVariable String contratoId) {
        Contrato contrato = contratoService.buscarContrato(clienteId, contratoId);
        return contrato != null ? new ResponseEntity<>(contrato, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update/{contratoId}")
    public ResponseEntity<Contrato> atualizarContrato(@PathVariable String clienteId, @PathVariable String contratoId,
                                                      @RequestBody Contrato contratoAtualizado) {
        Contrato contrato = contratoService.atualizarContrato(clienteId, contratoId, contratoAtualizado);
        return contrato != null ? new ResponseEntity<>(contrato, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{contratoId}")
    public ResponseEntity<Void> deletarContrato(@PathVariable String clienteId, @PathVariable String contratoId) {
        boolean deletado = contratoService.deletarContrato(clienteId, contratoId);
        return deletado ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
