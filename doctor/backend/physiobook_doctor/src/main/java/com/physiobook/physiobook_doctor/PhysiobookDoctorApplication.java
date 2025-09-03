package com.physiobook.physiobook_doctor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PhysiobookDoctorApplication {

	public static void main(String[] args) {

        SpringApplication.run(PhysiobookDoctorApplication.class, args);
        System.out.println("Doctor Application Running ");
	}

}
