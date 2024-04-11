package com.esiwko.frusion.repo.pg.boxes;

import com.esiwko.frusion.repo.pg.admins.AdminEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "boxes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoxEntity {
    @Id
    private String id;

    private String name;

    private double weight;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id", nullable = false)
    private AdminEntity admin;


    private boolean archived;
}
