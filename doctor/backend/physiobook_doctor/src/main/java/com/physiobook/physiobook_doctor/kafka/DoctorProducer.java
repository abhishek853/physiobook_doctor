package com.physiobook.physiobook_doctor.kafka;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class DoctorProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    @Value("${app.kafka.topic.doctor}")
    private String doctorTopic;

    @Value("${app.kafka.topic.appointment}")
    private String appointmentTopic;

    public DoctorProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendDoctorEvent(String message) {
        kafkaTemplate.send(doctorTopic, message);
        System.out.println("Doctor Service -> Sent doctor event: " + message);
    }

    public void sendAppointmentEvent(String message) {
        kafkaTemplate.send(appointmentTopic, message);
        System.out.println("Doctor Service -> Sent appointment event: " + message);
    }
}
