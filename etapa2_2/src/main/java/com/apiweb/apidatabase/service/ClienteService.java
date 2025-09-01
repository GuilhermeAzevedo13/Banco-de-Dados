package com.apiweb.apidatabase.service;

import com.apiweb.apidatabase.model.Cliente;
import com.apiweb.apidatabase.model.Pessoa;
import com.apiweb.apidatabase.repository.ClienteRepository;
import com.apiweb.apidatabase.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PessoaRepository pessoaRepository;

    public Cliente salvarCliente(Cliente cliente) {
        Optional<Pessoa> pessoaExistente = pessoaRepository.findById(cliente.getPessoa().getCpf());
        if (pessoaExistente.isPresent()) {
            return clienteRepository.save(cliente);
        }
        throw new RuntimeException("Pessoa com CPF " + cliente.getPessoa().getCpf() + " não encontrada.");
    }

    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> buscarPorMatricula(String matricula) {
        return clienteRepository.findById(matricula);
    }

    public Cliente atualizarCliente(String matricula, Cliente clienteAtualizado) {
        Optional<Cliente> clienteExistente = clienteRepository.findById(matricula);
        if (clienteExistente.isPresent()) {
            Cliente clienteBanco = clienteExistente.get();
            clienteAtualizado.setMatricula(clienteBanco.getMatricula());
            return clienteRepository.save(clienteAtualizado);
        }
        return null;
    }

    public boolean deletarCliente(String matricula) {
        if (clienteRepository.existsById(matricula)) {
            clienteRepository.deleteById(matricula);
            return true;
        }
        return false;
    }
}
