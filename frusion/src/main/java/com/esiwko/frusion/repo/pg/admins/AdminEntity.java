package com.esiwko.frusion.repo.pg.admins;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "admins")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminEntity {
    @Id
    private String id;

    private String email;

    private String password;

    @Column(name = "frusion_name")
    private String frusionName;
}
