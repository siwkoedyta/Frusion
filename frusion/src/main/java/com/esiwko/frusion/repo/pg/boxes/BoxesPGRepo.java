package com.esiwko.frusion.repo.pg.boxes;

import com.esiwko.frusion.repo.pg.fruits.FruitEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoxesPGRepo extends JpaRepository<BoxEntity, String> {

    @Transactional
    @Modifying
    @Query("update BoxEntity b set b.archived = true where b.id = :boxId AND b.admin.id = :adminId")
    void setArchived(String boxId, String adminId);

    List<BoxEntity> findAllByAdminId(String adminId);
}
