package com.physiobook.physiobook_doctor.managePatient.controller;

import java.util.Map;

import com.physiobook.physiobook_doctor.managePatient.Patient;
import com.physiobook.physiobook_doctor.managePatient.PatientRepository;
import com.physiobook.physiobook_doctor.managePatient.model.MainTherapy;
import com.physiobook.physiobook_doctor.managePatient.model.PatientTherapy;
import com.physiobook.physiobook_doctor.managePatient.model.SubTherapy;
import com.physiobook.physiobook_doctor.managePatient.repository.MainTherapyRepository;
import com.physiobook.physiobook_doctor.managePatient.repository.PatientTherapyRepo;
import com.physiobook.physiobook_doctor.managePatient.repository.SubTherapyRepository;
import com.physiobook.physiobook_doctor.managePatient.services.PatientTherapyService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/PatientTherapyDetails")
@Tag(name = "PatientTherapyDetails APIs", description = "APIs for PatientTherapyDetails")
public class PatientTherapyDetails {
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private MainTherapyRepository mainTherapyRepository;

    @Autowired
    PatientTherapyService patientTherapyService;
    @Autowired
    private SubTherapyRepository subTherapyRepository;
    @Autowired
    private PatientTherapyRepo patientTherapyRepo;

    @GetMapping("/details/{id}")
    public ResponseEntity<List<Patient>> getPatientById(@PathVariable long id) {

        return patientRepository.findById(id)
                .map(patient -> ResponseEntity.ok(List.of(patient)))
                .orElse(ResponseEntity.ok(List.of()));
    }

    @GetMapping("/mainTherapy")
    public List<MainTherapy> getAllMainTherapies() {
        return mainTherapyRepository.findAll();
    }

    // =============================
    // Get sub-therapies by main ID
    // =============================
    @GetMapping("/subTherapy/{mainId}")
    public List<SubTherapy> getSubTherapies(@PathVariable Long mainId) {
        return subTherapyRepository.findByMainTherapyId(mainId);
    }

    @PostMapping("/saveTherapies")
    public ResponseEntity<?> saveTherapies(@RequestBody Map<String, Object> req) {

        // patientId can be String or number → convert safely
        int patientId = Integer.parseInt(req.get("patientId").toString());

        List<Map<String, Object>> therapies =
                (List<Map<String, Object>>) req.get("therapies");

        for (Map<String, Object> therapy : therapies) {

            int main = Integer.parseInt(therapy.get("main").toString());
            int duration = Integer.parseInt(therapy.get("duration").toString());
            String medicines = therapy.get("medicines").toString();

            List<?> subsRaw = (List<?>) therapy.get("subs");
            List<Integer> subs = subsRaw.stream()
                    .map(s -> Integer.parseInt(s.toString()))
                    .toList();

            for (Integer subId : subs) {

                PatientTherapy pt = new PatientTherapy();


                pt.setPid(patientId);
                pt.setMainTherapy(mainTherapyRepository.findById((long) main).orElse(null));
                pt.setSubTherapy(subTherapyRepository.findById((long) subId).orElse(null));
                pt.setDuration(duration);
                pt.setMedicines(medicines);

                patientTherapyRepo.save(pt);
            }
        }

        return ResponseEntity.ok("Saved Successfully");
    }




}
