package com.physiobook.physiobook_doctor.managePatient.repository;


import com.physiobook.physiobook_doctor.managePatient.model.SubTherapy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubTherapyRepository extends JpaRepository<SubTherapy, Long> {

    List<SubTherapy> findByMainTherapyId(Long mainId);
}