package com.physiobook.physiobook_doctor.manageReceptionist.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import com.physiobook.physiobook_doctor.manageReceptionist.delegate.ReceptionistDelegate;
import com.physiobook.physiobook_doctor.manageReceptionist.dto.ReceptionistDTO;
import com.physiobook.physiobook_doctor.manageReceptionist.model.Receptionist;

import java.util.List;

@Configuration
public class ReceptionistService {

    @Autowired
    private ReceptionistDelegate receptionistDelegate;
    public Receptionist createReceptionist(ReceptionistDTO dto) {
        return receptionistDelegate.createReceptionist(dto);
    }

    public List<Receptionist> fetchAllReceptionists() {
        return receptionistDelegate.fetchAllReceptionists();
    }
}
