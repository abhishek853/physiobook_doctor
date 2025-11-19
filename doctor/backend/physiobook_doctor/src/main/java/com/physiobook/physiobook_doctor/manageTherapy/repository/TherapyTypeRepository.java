package com.physiobook.physiobook_doctor.manageTherapy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.physiobook.physiobook_doctor.manageTherapy.model.TherapyType;

public interface TherapyTypeRepository extends JpaRepository<TherapyType, Long>{

    List<TherapyType> findByTherapyCategory_Id(Long mt);
    
}
