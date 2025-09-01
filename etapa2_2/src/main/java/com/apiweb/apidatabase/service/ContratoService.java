package com.apiweb.apidatabase.service;

import com.apiweb.apidatabase.model.Cliente;
import com.apiweb.apidatabase.model.Contrato;
import com.apiweb.apidatabase.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ContratoService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Contrato adicionarContrato(String clienteId, Contrato contrato) {
        Optional<Cliente> clienteOpt = clienteRepository.findById(clienteId);
        if (clienteOpt.isPresent()) {
            Cliente cliente = clienteOpt.get();
            contrato.setId(UUID.randomUUID().toString());
            cliente.getContratos().add(contrato);
            clienteRepository.save(cliente);
            return contrato;
        }
        return null;
    }

    public List<Contrato> listarContratos(String clienteId) {
        return clienteRepository.findById(clienteId)
                .map(Cliente::getContratos)
                .orElse(null);
    }

    public Contrato buscarContrato(String clienteId, String contratoId) {
        return clienteRepository.findById(clienteId)
                .flatMap(cliente -> cliente.getContratos().stream()
                        .filter(contrato -> contrato.getId().equals(contratoId))
                        .findFirst())
                .orElse(null);
    }

    public Contrato atualizarContrato(String clienteId, String contratoId, Contrato contratoAtualizado) {
        Optional<Cliente> clienteOpt = clienteRepository.findById(clienteId);
        if (clienteOpt.isPresent()) {
            Cliente cliente = clienteOpt.get();
            List<Contrato> contratos = cliente.getContratos();

            for (int i = 0; i < contratos.size(); i++) {
                if (contratos.get(i).getId().equals(contratoId)) {
                    contratoAtualizado.setId(contratoId);
                    contratos.set(i, contratoAtualizado);
                    clienteRepository.save(cliente);
                    return contratoAtualizado;
                }
            }
        }
        return null;
    }

    public boolean deletarContrato(String clienteId, String contratoId) {
        Optional<Cliente> clienteOpt = clienteRepository.findById(clienteId);
        if (clienteOpt.isPresent()) {
            Cliente cliente = clienteOpt.get();
            boolean removed = cliente.getContratos().removeIf(contrato -> contrato.getId().equals(contratoId));
            if (removed) {
                clienteRepository.save(cliente);
            }
            return removed;
        }
        return false;
    }
}
