package com.physiobook.physiobook_doctor.ManageReceptionist.delegate;
import com.physiobook.physiobook_doctor.ManageReceptionist.dto.ReceptionistDTO;
import com.physiobook.physiobook_doctor.ManageReceptionist.model.Receptionist;
import com.physiobook.physiobook_doctor.ManageReceptionist.repository.ReceptionistRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ReceptionistDelegate {

    private final ReceptionistRepository repository;

    public ReceptionistDelegate(ReceptionistRepository repository) {
        this.repository = repository;
    }

    public Receptionist createReceptionist(ReceptionistDTO dto) {
        Receptionist receptionist = new Receptionist();
        receptionist.setName(dto.getName());
        receptionist.setEmail(dto.getEmail());
        receptionist.setPhone(dto.getPhone());
        receptionist.setAddress(dto.getAddress());
        return repository.save(receptionist);
    }

    public List<Receptionist> fetchAllReceptionists() {
        return repository.findAll();
    }


}
