# Use OpenJDK 17 base image
FROM openjdk:17-jdk-slim

# Add a volume for temp files
VOLUME /tmp

# Copy built JAR file into container
COPY target/*.jar app.jar

# Run the JAR
ENTRYPOINT ["java","-jar","/app.jar"]
