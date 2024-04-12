package com.esiwko.frusion.repo.pg.fruits;


import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface FruitsPGRepo extends JpaRepository<FruitEntity, String> {
    @Transactional
    @Modifying
    @Query("update FruitEntity f set f.price = :price where f.id = :fruitId")
    void setPrice(String fruitId, BigDecimal price);

    @Transactional
    @Modifying
    @Query("update FruitEntity f set f.archived = true where f.id = :fruitId AND f.admin.id = :adminId")
    void setArchived(String fruitId, String adminId);

    List<FruitEntity> findAllByAdminId(String adminId);
}

