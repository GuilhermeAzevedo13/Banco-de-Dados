package com.apiweb.apidatabase.controller;

import com.apiweb.apidatabase.model.Pessoa;
import com.apiweb.apidatabase.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pessoa")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    @PostMapping("/add")
    public ResponseEntity<?> criarPessoa(@RequestBody Pessoa pessoa) {
        try {
            Pessoa novaPessoa = pessoaService.salvarPessoa(pessoa);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaPessoa);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/get")
    public ResponseEntity<List<Pessoa>> listarPessoas() {
        List<Pessoa> pessoas = pessoaService.listarPessoas();
        return new ResponseEntity<>(pessoas, HttpStatus.OK);
    }

    @GetMapping("/get/{cpf}")
    public ResponseEntity<Pessoa> buscarPessoa(@PathVariable String cpf) {
        return pessoaService.buscarPorCpf(cpf)
                .map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/update/{cpf}")
    public ResponseEntity<Pessoa> atualizarPessoa(@PathVariable String cpf, @RequestBody Pessoa pessoaAtualizada) {
        Pessoa pessoa = pessoaService.atualizarPessoa(cpf, pessoaAtualizada);
        return pessoa != null ? new ResponseEntity<>(pessoa, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{cpf}")
    public ResponseEntity<Void> deletarPessoa(@PathVariable String cpf) {
        boolean deletado = pessoaService.deletarPessoa(cpf);
        return deletado ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
