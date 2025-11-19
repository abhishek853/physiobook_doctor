package com.physiobook.physiobook_doctor.manageTherapy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.physiobook.physiobook_doctor.manageTherapy.model.PatientTherapy;

public interface PatientTherapyRepository extends JpaRepository<PatientTherapy, Long>{
    List<PatientTherapy> findByPatientId(Long patientId);
}
