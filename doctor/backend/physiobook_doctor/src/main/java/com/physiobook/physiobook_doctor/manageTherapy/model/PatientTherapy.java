package com.physiobook.physiobook_doctor.manageTherapy.model;

import com.physiobook.physiobook_doctor.managePatient.Patient;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientTherapy {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "patientID")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "tcid")
    private TherapyCategory therapyCategory;

    @ManyToOne
    @JoinColumn(name = "ttid")
    private TherapyType therapyType;

    private Long duration;

    private String medicines;
}
