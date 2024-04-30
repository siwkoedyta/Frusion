package com.esiwko.frusion.repo.pg.transactions;


import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface TransactionPGRepo extends JpaRepository<TransactionEntity, String> {
    List<TransactionEntity> findAllByAdminId(String adminId);
    List<TransactionEntity> findAllByUserId(String userId);

    @Query("select t from TransactionEntity t where t.admin.id = :adminId and t.transaction_date between :startDate and :endDate")
    List<TransactionEntity> getAllTransactions(String adminId, LocalDate startDate, LocalDate endDate);

    @Query("select t from TransactionEntity t where t.user.id = :userId and t.transaction_date between :startDate and :endDate")
    List<TransactionEntity> getAllTransactionsForUser(String userId, LocalDate startDate, LocalDate endDate);
}
