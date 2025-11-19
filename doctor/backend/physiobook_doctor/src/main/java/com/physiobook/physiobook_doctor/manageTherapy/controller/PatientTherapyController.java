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

import com.physiobook.physiobook_doctor.managePatient.Patient;
import com.physiobook.physiobook_doctor.managePatient.PatientRepository;
import com.physiobook.physiobook_doctor.manageTherapy.dto.PatientTherapyRequest;
import com.physiobook.physiobook_doctor.manageTherapy.model.PatientTherapy;
import com.physiobook.physiobook_doctor.manageTherapy.model.TherapyCategory;
import com.physiobook.physiobook_doctor.manageTherapy.model.TherapyType;
import com.physiobook.physiobook_doctor.manageTherapy.repository.PatientTherapyRepository;
import com.physiobook.physiobook_doctor.manageTherapy.repository.TherapyCategoryRepository;
import com.physiobook.physiobook_doctor.manageTherapy.repository.TherapyTypeRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/patientTherapy")
@Tag(name = "Patient Therapy Handler Api`s", description = "Api`s responsible for handling functionalities related to patient therapies")
public class PatientTherapyController {
    
    private final PatientTherapyRepository patientTherapyRepository;

    private final TherapyCategoryRepository therapyCategoryRepository;

    private final TherapyTypeRepository therapyTypeRepository;

    private final PatientRepository patientRepository;

    @PostMapping
    @Operation(summary = "Api to add new patient therapy")
    public ResponseEntity<String> addPatientTherapy(@RequestBody PatientTherapyRequest patientTherapy){

        TherapyCategory mainTherapy = therapyCategoryRepository
                                            .findById(patientTherapy.getTcid())
                                            .orElse(null);                                                      

        if (mainTherapy == null) {
            // return ResponseEntity.status(404).body("Main Therapy id not found " + patientTherapy.getTcid());        
            throw new IllegalArgumentException("Main therapy cant be null");
        }
                                            
        TherapyType subTherapy = therapyTypeRepository
                                            .findById(patientTherapy.getTtid())
                                            .orElseThrow();
        
        if (subTherapy == null) {
            // return ResponseEntity.status(404).body("Sub Therapy id not found " + patientTherapy.getTtid());        
            throw new IllegalArgumentException("Sub Therapy cant be null");
        }

        Patient patient = patientRepository.findById(patientTherapy.getPatientId()).orElseThrow(() -> new IllegalArgumentException("Patient not found"));

        if (patient == null) {
            throw new IllegalArgumentException("Patinet Id can not be null");
        }
                                    
        PatientTherapy patientTherapyObj = new PatientTherapy();
        patientTherapyObj.setPatient(patient);
        patientTherapyObj.setTherapyCategory(mainTherapy);
        patientTherapyObj.setTherapyType(subTherapy);
        patientTherapyObj.setDuration(patientTherapy.getDuration());
        patientTherapyObj.setMedicines(patientTherapy.getMedicines());


        patientTherapyRepository.save(patientTherapyObj);    
        return ResponseEntity.ok("Patient Therapy Added Successfully");
    }

    @GetMapping
    @Operation(summary = "Api to get all patient therapies")
    public ResponseEntity<?> getAllPatientTherapy(){
        try {            
            return ResponseEntity.ok(patientTherapyRepository.findAll());            
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Api to get specific patient therapy by id")
    public ResponseEntity<?> getPatientTherapyById(@PathVariable Long id){
        try {
            return ResponseEntity.ok(patientTherapyRepository.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Patient Therapy Not Found with given id " + id);
        }
    }

    @GetMapping("/patient/{patientId}")
    @Operation(summary = "Api to get specific patient therapy by patient Id")
    public ResponseEntity<?> getPatientTherapyForSpecificPatient(@PathVariable Long patientId){
        Patient patient = patientRepository.findById(patientId).orElse(null);

        if(patient == null)
            return ResponseEntity.status(404).body("Patient Not Found");

        List<PatientTherapy> patients = patientTherapyRepository.findByPatientId(patientId);

        if (patients == null) {
            return ResponseEntity.status(404).body("Patient Therapy Not Found");
        }

        return ResponseEntity.ok(patients);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Api to update specific patient therapy by id")
    public ResponseEntity<?> updatePatientTherapyById(@PathVariable Long id, @RequestBody PatientTherapyRequest patientTherapyDTO){
        PatientTherapy patientTherapy = patientTherapyRepository.findById(id).orElse(null);

        if (patientTherapy == null) {
            return ResponseEntity.status(404).body("Patient Therapy not found with given id : " + id);
        }

        if(patientTherapyDTO.getPatientId()!=null){

            Patient patient = patientRepository.findById(patientTherapyDTO.getPatientId()).orElse(null);

            if (patient == null) {
                return ResponseEntity.status(404).body("Patient Not Found with patient Id : " + patientTherapyDTO.getPatientId());
            }

            patientTherapy.setPatient(patient);
        }

        if (patientTherapyDTO.getTcid() != null) {
            
            TherapyCategory therapyCategory = therapyCategoryRepository.findById(patientTherapyDTO.getTcid()).orElse(null);

            if (therapyCategory == null) {
                return ResponseEntity.status(404).body("Main Therapy Not Found with given Id : " + patientTherapyDTO.getTcid());                
            }

            patientTherapy.setTherapyCategory(therapyCategory);
        }
            
        if (patientTherapyDTO.getTtid() != null) {
            
            TherapyType therapyType = therapyTypeRepository.findById(patientTherapyDTO.getTtid()).orElse(null);

            if (therapyType == null) {
                return ResponseEntity.status(404).body("Sub Therapy Not Found with given Id : " + patientTherapyDTO.getTtid());
            }

            patientTherapy.setTherapyType(therapyType);
        }

        if (patientTherapyDTO.getDuration() != null) {            
            patientTherapy.setDuration(patientTherapyDTO.getDuration());
        }

        if (patientTherapyDTO.getMedicines() != null) {
            patientTherapy.setMedicines(patientTherapy.getMedicines());
        }

        patientTherapyRepository.save(patientTherapy);
        return ResponseEntity.ok(patientTherapy);

    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Api to delete specific patient therapy by id")
    public ResponseEntity<String> deletePatientTherapyById(@PathVariable Long id){
    
        PatientTherapy patientTherapy = patientTherapyRepository.findById(id).orElse(null);

        if(patientTherapy == null)
            return ResponseEntity.status(404).body("Patient Therapy not found with given id : " +id);

        patientTherapyRepository.deleteById(id);
        return ResponseEntity.ok("Patient Therapy Deleted Successfully with Id : " +id);
    }

}
