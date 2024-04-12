package com.esiwko.frusion.repo.pg.users;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsersPGRepo extends JpaRepository<UserEntity, String> {
    @Transactional
    @Modifying
    @Query("update UserEntity u set u.archived = true where u.id = :userId AND u.admin.id = :adminId")
    void setArchived(String userId, String adminId);

    List<UserEntity> findAllByAdminId(String adminId);
}