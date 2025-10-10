package com.physiobook.physiobook_doctor.kafka.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.physiobook.physiobook_doctor.managePatient.Patient;
import com.physiobook.physiobook_doctor.managePatient.PatientService;

@Service
public class PatientConsumer {

    private final PatientService patientService;

    public PatientConsumer(PatientService patientService) {
        this.patientService = patientService;
    }

    @KafkaListener(topics="${app.kafka.topic.patient}", groupId="doctor_group")
    public void listenPatientEvent(Patient patient) {
        System.out.println("Doctor Service -> Received patient event: " + patient);
        patientService.addPatient(patient);
    }
}