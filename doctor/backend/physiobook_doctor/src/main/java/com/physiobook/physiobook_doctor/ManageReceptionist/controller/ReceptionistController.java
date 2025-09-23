package com.physiobook.physiobook_doctor.ManageReceptionist.controller;

import com.physiobook.physiobook_doctor.ManageReceptionist.delegate.ReceptionistDelegate;
import com.physiobook.physiobook_doctor.ManageReceptionist.dto.ReceptionistDTO;
import com.physiobook.physiobook_doctor.ManageReceptionist.model.Receptionist;
import com.physiobook.physiobook_doctor.ManageReceptionist.Services.ReceptionistService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

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

    private final ReceptionistDelegate delegate;

    public ReceptionistController(ReceptionistDelegate delegate) {
        this.delegate = delegate;
    }

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

}
