package com.physiobook.physiobook_doctor.manageTherapy.dto;

import lombok.Data;

@Data
public class TherapyTypeRequest {
    private String therapyType;
    private Long mainTherapyid;
}
