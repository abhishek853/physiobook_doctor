package com.physiobook.physiobook_doctor.managePatient.repository;

import com.physiobook.physiobook_doctor.managePatient.model.PatientTherapy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientTherapyRepo extends JpaRepository<PatientTherapy, Long> {
}