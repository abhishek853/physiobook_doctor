package com.physiobook.physiobook_doctor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class PhysiobookDoctorApplication {

	public static void main(String[] args) {

        SpringApplication.run(PhysiobookDoctorApplication.class, args);
        System.out.println("Doctor Application Running ");
	}

}
