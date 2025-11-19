package com.physiobook.physiobook_doctor.manageReceptionist.dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReceptionistDTO {
    private String name;
    private String email;
    private String phone;
    private String password;
    private String address;

}
