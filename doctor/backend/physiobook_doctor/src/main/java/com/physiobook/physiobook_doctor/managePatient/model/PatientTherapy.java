package com.physiobook.physiobook_doctor.managePatient.model;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "PatientTherapy")
public class PatientTherapy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int pid;

    @ManyToOne
    @JoinColumn(name = "main_therapy")
    private MainTherapy mainTherapy;

    @ManyToOne
    @JoinColumn(name = "sub_therapy")
    private SubTherapy subTherapy;


    private int duration;

    private String medicines;
}