package com.physiobook.physiobook_doctor.manageTherapy.controller;

import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.physiobook.physiobook_doctor.manageTherapy.model.TherapyCategory;
import com.physiobook.physiobook_doctor.manageTherapy.repository.TherapyCategoryRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor    // Create Argument Constructor and Spring injects the dependency through that constructor
@RestController
@RequestMapping("/api/PatientTherapyDetails/mainTherapy")
@Tag(name = "Main Therapy Category Handler Api`s", description = "Api Responsible for handling all the functions related to main therapy category")
public class TherapyCategoryController {
  
    private final TherapyCategoryRepository therapyCategoryRepository;

    @PostMapping("/addMT")
    @Operation(summary = "Api to Add Main Therapy Category", description = "This api will responsible to add new main therapy to therapy category")
    public ResponseEntity<?> addMainTherapy(@RequestBody TherapyCategory therapyCategory){
        try {
            therapyCategoryRepository.save(therapyCategory);
            return ResponseEntity.ok("Main Therapy Added Successfully : "+therapyCategory);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping()
    @Operation(summary = "Api will get all main therapies")
    public ResponseEntity<?> getMainTherapy() {
        try {
            return ResponseEntity.ok(therapyCategoryRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Api to get specific main therapy category By id")
    public ResponseEntity<?> getMainTherapyById(@PathVariable Long id){
        
        Optional<TherapyCategory> therapy = therapyCategoryRepository.findById(id);

        if (therapy.isEmpty()) {
            return ResponseEntity.status(404).body("Therapy not found with given id : "+id);
        }

        return ResponseEntity.ok(therapy);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Api to update specific main therapy category by id")
    public ResponseEntity<?> updateMainTherapyById(@PathVariable Long id, @RequestBody TherapyCategory therapyCategory) {
        Optional<TherapyCategory> therapy = therapyCategoryRepository.findById(id);

        if(therapy.isEmpty()){
            return ResponseEntity.status(404).body("Therapy not found with given id : "+id);
        }

        if(therapyCategory.getTherapy() != null)
            therapyCategory.setTherapy(therapyCategory.getTherapy());
        
        therapyCategoryRepository.save(therapyCategory);
        return ResponseEntity.ok("Therapy Category name changed to "+therapyCategory.getTherapy());

    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Api to delete specific main therapy category by id")
    public ResponseEntity<?> deleteMainTherapyById(@PathVariable Long id){
        Optional<TherapyCategory> therapy = therapyCategoryRepository.findById(id);

        if(therapy.isEmpty()){
            return ResponseEntity.status(404).body("Therapy not found with given id : "+ id);
        }

        therapyCategoryRepository.deleteById(id);
        return ResponseEntity.ok(therapy.get().getTherapy()+" deleted successfully");
    }
    
}
