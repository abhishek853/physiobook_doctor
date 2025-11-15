package com.physiobook.physiobook_doctor.managePatient.repository;

import com.physiobook.physiobook_doctor.managePatient.model.MainTherapy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MainTherapyRepository extends JpaRepository<MainTherapy, Long> {
}