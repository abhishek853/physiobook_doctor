package com.physiobook.physiobook_doctor.manageTherapy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.physiobook.physiobook_doctor.manageTherapy.model.TherapyCategory;

public interface TherapyCategoryRepository extends JpaRepository<TherapyCategory, Long>{
    
}
