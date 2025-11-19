package com.physiobook.physiobook_doctor.manageTherapy.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.physiobook.physiobook_doctor.manageTherapy.dto.TherapyTypeRequest;
import com.physiobook.physiobook_doctor.manageTherapy.model.TherapyCategory;
import com.physiobook.physiobook_doctor.manageTherapy.model.TherapyType;
import com.physiobook.physiobook_doctor.manageTherapy.repository.TherapyCategoryRepository;
import com.physiobook.physiobook_doctor.manageTherapy.repository.TherapyTypeRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/PatientTherapyDetails/therapyType")
@Tag(name = "Sub Therapy Type Handler Api`s", description = "Api`s Responsible for handing functionalities of sub therepies")
public class TherapyTypeController {
    
    private final TherapyTypeRepository therapyTypeRepository;

    private final TherapyCategoryRepository therapyCategoryRepository;

    @PostMapping("/add")
    @Operation(summary = "Api to add new sub therapy in therapy type")
    public ResponseEntity<String> addTherapyType(@RequestBody TherapyTypeRequest therapyType){
        
        TherapyCategory mainTherapy = therapyCategoryRepository.findById(therapyType.getMainTherapyid()).orElse(null);

        if (mainTherapy == null) {
            return ResponseEntity.status(404).body("Main Therapy not found with given id : ");
        }

        TherapyType subTherapy = new TherapyType();
        subTherapy.setSubTherapyName(therapyType.getTherapyType());
        subTherapy.setTherapyCategory(mainTherapy);

        therapyTypeRepository.save(subTherapy);
        return ResponseEntity.ok("Sub Therapy "+subTherapy.getSubTherapyName()+" Added for Main Therapy "+mainTherapy.getId());
    }

    @GetMapping
    @Operation(summary = "Api to get all sub therapy")
    public ResponseEntity<?> getAllTherapyTypes(){
        try {
            return ResponseEntity.ok(therapyTypeRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Api to get specific sub therapy by id")
    public ResponseEntity<?> getTherapyTypeById(@PathVariable Long id){
        try {
            return ResponseEntity.ok(therapyTypeRepository.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Therapy Type not found with given id : "+id);
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Api to update specific sub therapy by id")
    public ResponseEntity<?> updateTherapyTypeById(@PathVariable Long id, @RequestBody TherapyTypeRequest therapyDTO ){
        
        TherapyType existing = therapyTypeRepository.findById(id).orElse(null);

        if(existing==null)
            return ResponseEntity.status(404).body("Therapy Type not found with given id : "+id);

        if(therapyDTO.getTherapyType()!=null)
            existing.setSubTherapyName(therapyDTO.getTherapyType());
        
        if(therapyDTO.getMainTherapyid() != null){

            TherapyCategory mainTherapy = therapyCategoryRepository.findById(therapyDTO.getMainTherapyid()).orElse(null);

            if (mainTherapy == null)
                return ResponseEntity.status(404).body("Main Therapy not found with given provided id : "+therapyDTO.getMainTherapyid());
            
            existing.setTherapyCategory(mainTherapy);                                    
        }
        therapyTypeRepository.save(existing);
        return ResponseEntity.ok("therapy Type Updated "+existing.getSubTherapyName()+" with id : "+existing.getTherapyCategory().getId());

    }   

    @GetMapping("/mainTherapy/{id}")
    @Operation(summary = "Api to get Therapies by thier main therapy category id")
    public ResponseEntity<?> getTherapyTypeByMainTherapyId(@PathVariable Long id){
        
        List<TherapyType> list = therapyTypeRepository.findByTherapyCategory_Id(id);

        if (list.isEmpty()) {
            return ResponseEntity.status(404).body("Therapy not found with given id : "+id);
        }

        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Api to delete specific sub therapy by id")
    public ResponseEntity<String> deleteTherapyTypeById(@PathVariable Long id){
        TherapyType existing = therapyTypeRepository.findById(id).orElse(null);
        try {
            therapyTypeRepository.deleteById(id);
            return ResponseEntity.ok("Therapy "+existing.getSubTherapyName()+" Deleted with id : "+id);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Therapy Type not found with given id : "+id);
        }
    }
}
