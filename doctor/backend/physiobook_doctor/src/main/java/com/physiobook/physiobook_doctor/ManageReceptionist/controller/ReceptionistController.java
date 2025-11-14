package com.physiobook.physiobook_doctor.ManageReceptionist.controller;

import com.physiobook.physiobook_doctor.ManageReceptionist.dto.ReceptionistDTO;
import com.physiobook.physiobook_doctor.ManageReceptionist.model.Receptionist;
import com.physiobook.physiobook_doctor.ManageReceptionist.repository.ReceptionistRepository;
import com.physiobook.physiobook_doctor.ManageReceptionist.Services.ReceptionistService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*         THIS IS OUR API CONTROLLER FORMAT         */

/*

Swagger UI URL (for local testing):
http://localhost:8081/swagger-ui/index.html#/

For production, use domain name or public IP if deployed on AWS EC2
*/

@RestController
@RequestMapping("/api")
@Tag(name = "Receptionist APIs", description = "APIs for managing receptionists")
public class ReceptionistController {

    @Autowired
    private ReceptionistService receptionistService;

    @Autowired
    private ReceptionistRepository receptionistRepository;


    @PostMapping("/SaveReceptionists")
    @Operation(summary = "Create Receptionist", description = "Saves a new receptionist in the database")
    public ResponseEntity<Receptionist> createReceptionist(@RequestBody ReceptionistDTO dto) {
        Receptionist saved = receptionistService.createReceptionist(dto);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/GetAllReceptionists")
    @Operation(summary = "Get All Receptionists", description = "Fetches all receptionists from the database")
    public ResponseEntity<List<Receptionist>> getAllReceptionists() {
        return new ResponseEntity<>(receptionistService.fetchAllReceptionists(), HttpStatus.OK);
    }

    @GetMapping("/GetReceptionistByPhone/{phone}")
    @Operation(summary = "Get Receptionist by Phone", description = "Fetches a receptionist by their phone number")
    public ResponseEntity<Receptionist> getReceptionistByPhone(@PathVariable String phone) {
        Receptionist receptionist = receptionistRepository.findByPhone(phone);

        if(receptionist == null) {
            System.out.println("\n \n Receptionist not found with phone: " + phone + "\n \n");
            return ResponseEntity.notFound().build();
        }

        return new ResponseEntity<>(receptionist, HttpStatus.OK);
    }
}
