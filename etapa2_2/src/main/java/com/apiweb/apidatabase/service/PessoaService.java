package com.apiweb.apidatabase.service;

import com.apiweb.apidatabase.model.Pessoa;
import com.apiweb.apidatabase.repository.ClienteRepository;
import com.apiweb.apidatabase.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    public Pessoa salvarPessoa(Pessoa pessoa) {
        return pessoaRepository.save(pessoa);
    }

    public List<Pessoa> listarPessoas() {
        return pessoaRepository.findAll();
    }

    public Optional<Pessoa> buscarPorCpf(String cpf) {
        return pessoaRepository.findById(cpf);
    }

    public Pessoa atualizarPessoa(String cpf, Pessoa pessoaAtualizada) {
        if (pessoaRepository.existsById(cpf)) {
            pessoaAtualizada.setCpf(cpf);
            return pessoaRepository.save(pessoaAtualizada);
        }
        return null;
    }

    @Autowired
    private ClienteRepository clienteRepository;

    public boolean deletarPessoa(String cpf) {
        if (pessoaRepository.existsById(cpf)) {

            clienteRepository.deleteByPessoaCpf(cpf);

            pessoaRepository.deleteById(cpf);
            return true;
        }
        return false;
    }
}

