package com.physiobook.physiobook_doctor.kafka.controller;
import com.physiobook.physiobook_doctor.kafka.producer.DoctorProducer;
import com.physiobook.physiobook_doctor.kafka.service.DoctorMessageService;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doctor")
public class DoctorController {

    private final DoctorProducer doctorProducer;
    private final DoctorMessageService doctorMessageService;

    public DoctorController(DoctorProducer doctorProducer, DoctorMessageService doctorMessageService) {
        this.doctorProducer = doctorProducer;
        this.doctorMessageService = doctorMessageService;
    }

    // Send a doctor-related message    
    @PostMapping("/sendDoctorEvent")
    public String sendDoctorEvent(@RequestParam String message) {
        doctorProducer.sendDoctorEvent(message);
        return "Doctor event sent: " + message;
    }

    // Send an appointment-related message
    @PostMapping("/sendAppointmentEvent")
    public String sendAppointmentEvent(@RequestParam String message) {
        doctorProducer.sendAppointmentEvent(message);
        return "Appointment event sent: " + message;
    }

    // Retrieve all messages received from the receptionist
    @GetMapping("/receptionistMessages")
    public List<String> getReceptionistMessages() {
        return doctorMessageService.getReceptionistMessage();
    }

}
