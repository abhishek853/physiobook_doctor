package com.physiobook.physiobook_doctor.managePatient;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class PatientService {
    
    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository){
        this.patientRepository = patientRepository;
    }

    public void addPatient(Patient patient) {
        System.out.println("Saving patient: " + patient);
        patientRepository.save(patient);
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(Long id) {
        
        return patientRepository.findById(id).orElse(null);
        
    }
}
