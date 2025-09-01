package com.apiweb.apidatabase.repository;

import com.apiweb.apidatabase.model.Cliente;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClienteRepository extends MongoRepository<Cliente, String> {
    void deleteByPessoaCpf(String pessoaCpf);
}


