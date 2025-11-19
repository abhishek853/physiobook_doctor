package com.physiobook.physiobook_doctor.manageTherapy.dto;

import lombok.Data;

@Data
public class PatientTherapyRequest {
    private Long id;
    private Long patientId;
    private Long tcid;
    private Long ttid;
    private Long duration;
    private String medicines;    
}
