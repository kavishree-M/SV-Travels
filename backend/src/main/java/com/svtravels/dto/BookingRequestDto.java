package com.svtravels.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class BookingRequestDto {

    @NotBlank(message = "Customer name is required")
    @Size(min = 2, max = 120, message = "Customer name must be between 2 and 120 characters")
    private String fullName;

    @NotBlank(message = "Email address is required")
    @Email(message = "Please provide a valid email address")
    @Size(max = 150, message = "Email address must not exceed 150 characters")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[+]?[0-9]{8,15}$", message = "Phone number must contain 8 to 15 digits, optional leading '+'")
    private String phone;

    @NotBlank(message = "Service type is required")
    private String serviceType;

    @NotBlank(message = "Trip type is required (one-way or round-trip)")
    @Pattern(regexp = "^(one-way|round-trip)$", message = "Trip type must be 'one-way' or 'round-trip'")
    private String tripType;

    private LocalDate travelDate;

    private LocalDate returnDate;

    @NotBlank(message = "Pickup location is required")
    @Size(min = 3, max = 255, message = "Pickup location must be between 3 and 255 characters")
    private String pickupLocation;

    @NotBlank(message = "Destination is required")
    @Size(min = 3, max = 255, message = "Destination must be between 3 and 255 characters")
    private String destination;

    @NotNull(message = "Passenger count is required")
    @Min(value = 1, message = "Passenger count must be at least 1")
    @Max(value = 150, message = "For groups over 150, please contact our office for multi-fleet transport")
    private Integer passengerCount;

    @NotBlank(message = "Preferred vehicle category is required")
    private String vehicleCategory;

    @Size(max = 5000, message = "Additional requirements must not exceed 5000 characters")
    private String additionalRequirements;

    private String language;

    public BookingRequestDto() {}

    // Validation helper
    @AssertTrue(message = "Travel date is required and cannot be in the past")
    public boolean isTravelDateValid() {
        if (isSchoolTransport()) {
            return true;
        }
        return travelDate != null && !travelDate.isBefore(LocalDate.now());
    }

    @AssertTrue(message = "Return date must be on or after travel date for round trips")
    public boolean isReturnDateValid() {
        if (isSchoolTransport()) {
            return true;
        }
        if ("round-trip".equalsIgnoreCase(tripType)) {
            if (returnDate == null) {
                return false;
            }
            return travelDate == null || !returnDate.isBefore(travelDate);
        }
        return true;
    }

    private boolean isSchoolTransport() {
        if (serviceType == null) {
            return false;
        }
        String normalizedService = serviceType.toLowerCase();
        return normalizedService.contains("bhavans")
                || normalizedService.contains("school transportation")
                || normalizedService.contains("பவன்ஸ்")
                || normalizedService.contains("भवांस");
    }

    // Getters and Setters
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public String getTripType() {
        return tripType;
    }

    public void setTripType(String tripType) {
        this.tripType = tripType;
    }

    public LocalDate getTravelDate() {
        return travelDate;
    }

    public void setTravelDate(LocalDate travelDate) {
        this.travelDate = travelDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public String getPickupLocation() {
        return pickupLocation;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Integer getPassengerCount() {
        return passengerCount;
    }

    public void setPassengerCount(Integer passengerCount) {
        this.passengerCount = passengerCount;
    }

    public String getVehicleCategory() {
        return vehicleCategory;
    }

    public void setVehicleCategory(String vehicleCategory) {
        this.vehicleCategory = vehicleCategory;
    }

    public String getAdditionalRequirements() {
        return additionalRequirements;
    }

    public void setAdditionalRequirements(String additionalRequirements) {
        this.additionalRequirements = additionalRequirements;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
