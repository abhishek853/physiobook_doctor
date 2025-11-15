package com.physiobook.physiobook_doctor.managePatient.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "mainTherapy")
public class MainTherapy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String therapy;
}