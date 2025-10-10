package com.physiobook.physiobook_doctor.managePatient;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor // Generate Default Constructor for JPA to create empty object first
@AllArgsConstructor // Generate All Arguments Constructor for Serialization and it put data in empty object
public class Patient {
    
    @Id
    private long id;
    private String name;
    private int age;
    private int weight;
    private String gender;
    private String phone;
    private String status;
    private LocalDateTime createdAt;

}
