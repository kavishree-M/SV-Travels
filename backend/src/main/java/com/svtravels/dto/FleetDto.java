package com.svtravels.dto;

import java.util.List;

public class FleetDto {
    private String id;
    private String category;
    private String name;
    private Integer seatingCapacity;
    private boolean capacityConfirmed;
    private String capacityLabel;
    private String image;
    private String shortDescription;
    private List<String> features;
    private String idealFor;

    public FleetDto() {}

    public FleetDto(String id, String category, String name, Integer seatingCapacity, boolean capacityConfirmed,
                    String capacityLabel, String image, String shortDescription, List<String> features, String idealFor) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.seatingCapacity = seatingCapacity;
        this.capacityConfirmed = capacityConfirmed;
        this.capacityLabel = capacityLabel;
        this.image = image;
        this.shortDescription = shortDescription;
        this.features = features;
        this.idealFor = idealFor;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getSeatingCapacity() { return seatingCapacity; }
    public void setSeatingCapacity(Integer seatingCapacity) { this.seatingCapacity = seatingCapacity; }
    public boolean isCapacityConfirmed() { return capacityConfirmed; }
    public void setCapacityConfirmed(boolean capacityConfirmed) { this.capacityConfirmed = capacityConfirmed; }
    public String getCapacityLabel() { return capacityLabel; }
    public void setCapacityLabel(String capacityLabel) { this.capacityLabel = capacityLabel; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    public List<String> getFeatures() { return features; }
    public void setFeatures(List<String> features) { this.features = features; }
    public String getIdealFor() { return idealFor; }
    public void setIdealFor(String idealFor) { this.idealFor = idealFor; }
}
