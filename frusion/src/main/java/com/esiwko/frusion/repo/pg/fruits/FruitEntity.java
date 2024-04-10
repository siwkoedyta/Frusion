package com.esiwko.frusion.repo.pg.fruits;

import com.esiwko.frusion.repo.pg.admins.AdminEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "fruits")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FruitEntity {
    @Id
    private String id;

    private String name;

    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id", nullable = false)
    private AdminEntity admin;


    private boolean archived;
}
