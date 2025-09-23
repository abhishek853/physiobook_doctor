package com.physiobook.physiobook_doctor.ManageReceptionist.repository;
import com.physiobook.physiobook_doctor.ManageReceptionist.model.Receptionist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceptionistRepository extends JpaRepository<Receptionist, Long> {


    // we can create our costume repository methode here
}
