package com.physiobook.physiobook_doctor.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.HashMap;
import java.util.Map;

/*         THIS IS OUR API CONTROLLER FORMAT         */


/*

we can access our Swagger API by this URL

http://localhost:8080/swagger-ui/index.html#/

for the production we have to use domain name or Public Ip os the server
but we use AWS ec2 SO we use public IP

 */


@RestController
@RequestMapping("/api")
@Tag(name = "Doctor APIs", description = "APIs for doctor operations")  //this is for our class level api information having name and description
public class DoctorController1 {

    @GetMapping("/hello")            // this is for our individual api endpoint
    @Operation(summary = "Say Hello", description = "Returns a greeting message") // that name and description
    public String hello() {
        return "Hello, Physiobook!";
    }

    @PostMapping("/validate")
    @Operation(summary = "Validate user", description = "Checks if username and password are valid")
    public ResponseEntity<Map<String, String>> validateUser(
            @RequestParam String username,
            @RequestParam String password) {

        Map<String, String> response = new HashMap<>();
        if ("harish".equals(username) && "1234".equals(password)) {
            response.put("message", "User is valid");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.put("message", "Invalid username or password");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }
}
