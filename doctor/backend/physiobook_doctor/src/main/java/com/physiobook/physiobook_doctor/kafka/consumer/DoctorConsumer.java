package com.physiobook.physiobook_doctor.kafka.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.physiobook.physiobook_doctor.kafka.service.DoctorMessageService;

@Service
public class DoctorConsumer {

    private final DoctorMessageService doctorMessageService;

    public DoctorConsumer(DoctorMessageService doctorMessageService){
        this.doctorMessageService = doctorMessageService;
    }

    @KafkaListener(topics = "${app.kafka.topic.receptionist}", groupId = "doctor_group")
    public void listenReceptionistEvent(String message){
        System.out.println("Doctor Service -> Received receptionist event: " + message);
        doctorMessageService.saveReceptionistMessage(message);
    }
}