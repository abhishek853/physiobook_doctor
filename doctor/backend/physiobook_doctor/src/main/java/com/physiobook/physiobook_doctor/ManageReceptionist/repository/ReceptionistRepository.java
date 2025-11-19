package com.physiobook.physiobook_doctor.manageReceptionist.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.physiobook.physiobook_doctor.manageReceptionist.model.Receptionist;

@Repository
public interface ReceptionistRepository extends JpaRepository<Receptionist, Long> {

    Receptionist findByPhone(String phone);
}
