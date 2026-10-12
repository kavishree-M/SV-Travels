package com.svtravels.dto;

import java.util.List;

public class ServiceDto {
    private String id;
    private String name;
    private String slug;
    private String image;
    private String shortDescription;
    private String fullDescription;
    private List<String> suitableUseCases;
    private List<String> vehicleOptions;
    private String bookingInfo;

    public ServiceDto() {}

    public ServiceDto(String id, String name, String slug, String image, String shortDescription,
                      String fullDescription, List<String> suitableUseCases, List<String> vehicleOptions, String bookingInfo) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.image = image;
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;
        this.suitableUseCases = suitableUseCases;
        this.vehicleOptions = vehicleOptions;
        this.bookingInfo = bookingInfo;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    public String getFullDescription() { return fullDescription; }
    public void setFullDescription(String fullDescription) { this.fullDescription = fullDescription; }
    public List<String> getSuitableUseCases() { return suitableUseCases; }
    public void setSuitableUseCases(List<String> suitableUseCases) { this.suitableUseCases = suitableUseCases; }
    public List<String> getVehicleOptions() { return vehicleOptions; }
    public void setVehicleOptions(List<String> vehicleOptions) { this.vehicleOptions = vehicleOptions; }
    public String getBookingInfo() { return bookingInfo; }
    public void setBookingInfo(String bookingInfo) { this.bookingInfo = bookingInfo; }
}
