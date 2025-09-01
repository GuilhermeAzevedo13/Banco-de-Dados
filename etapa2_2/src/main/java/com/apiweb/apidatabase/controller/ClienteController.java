package com.apiweb.apidatabase.controller;

import com.apiweb.apidatabase.model.Cliente;
import com.apiweb.apidatabase.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping("/add")
    public ResponseEntity<?> criarCliente(@RequestBody Cliente cliente) {
        try {
            Cliente novoCliente = clienteService.salvarCliente(cliente);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoCliente);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/get")
    public ResponseEntity<List<Cliente>> listarClientes() {
        return ResponseEntity.ok(clienteService.listarClientes());
    }

    @GetMapping("/get/{matricula}")
    public ResponseEntity<Cliente> buscarCliente(@PathVariable String matricula) {
        return clienteService.buscarPorMatricula(matricula)
                .map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/update/{matricula}")
    public ResponseEntity<Cliente> atualizarCliente(@PathVariable String matricula, @RequestBody Cliente clienteAtualizado) {
        Cliente cliente = clienteService.atualizarCliente(matricula, clienteAtualizado);
        return cliente != null ? new ResponseEntity<>(cliente, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{matricula}")
    public ResponseEntity<Void> deletarCliente(@PathVariable String matricula) {
        boolean deletado = clienteService.deletarCliente(matricula);
        return deletado ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
