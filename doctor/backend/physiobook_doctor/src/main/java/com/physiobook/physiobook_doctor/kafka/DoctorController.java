package com.physiobook.physiobook_doctor.kafka;
import com.physiobook.physiobook_doctor.kafka.DoctorProducer;
import com.physiobook.physiobook_doctor.kafka.KafkaProducerConfig;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doctor")
public class DoctorController {

    private final DoctorProducer doctorProducer;

    public DoctorController(DoctorProducer doctorProducer) {
        this.doctorProducer = doctorProducer;
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
}
