package com.apiweb.apidatabase.repository;

import com.apiweb.apidatabase.model.Pessoa;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PessoaRepository extends MongoRepository<Pessoa, String> {
}
