package com.physiobook.physiobook_doctor.ManageReceptionist.Services;

import com.physiobook.physiobook_doctor.ManageReceptionist.dto.ReceptionistDTO;
import com.physiobook.physiobook_doctor.ManageReceptionist.model.Receptionist;
import com.physiobook.physiobook_doctor.ManageReceptionist.delegate.ReceptionistDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

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
