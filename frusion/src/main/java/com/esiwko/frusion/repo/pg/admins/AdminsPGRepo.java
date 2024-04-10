package com.esiwko.frusion.repo.pg.admins;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminsPGRepo extends JpaRepository<AdminEntity, String> {
    Optional<AdminEntity> findByEmail(String email);
}
