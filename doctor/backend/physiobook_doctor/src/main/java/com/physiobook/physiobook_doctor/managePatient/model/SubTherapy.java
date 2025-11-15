package com.physiobook.physiobook_doctor.managePatient.model;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "subTherapy")
public class SubTherapy {

    @Id
    private int id;

    @ManyToOne
    @JoinColumn(name = "mTid")  // foreign key column
    private MainTherapy mainTherapy;

    private String subTherapyName;
}