package com.esiwko.frusion.repo.pg.transactions;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionPGRepo extends JpaRepository<TransactionEntity, String> {
    List<TransactionEntity> findAllByAdminId(String adminId);
}
