package com.physiobook.physiobook_doctor.kafka.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class DoctorMessageService {
    
    private final List<String> receptionistMessages = new ArrayList<>();

    public void saveReceptionistMessage(String message){
        receptionistMessages.add(message);
    }

    public List<String> getReceptionistMessage() {
        return receptionistMessages;
    }

}
