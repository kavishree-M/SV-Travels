package com.svtravels.controller;

import com.svtravels.dto.ServiceDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @GetMapping
    public ResponseEntity<List<ServiceDto>> getServices() {
        List<ServiceDto> services = Arrays.asList(
            new ServiceDto(
                "bhavans-school-transport",
                "Bhavans School Transportation",
                "bhavans-school-transportation",
                "/assets/images/school_bus_service.jpg",
                "Dedicated daily pick-up and drop-off transportation exclusively for students of Bhavans School.",
                "SV Travels provides structured, punctual daily commuting routes arranged exclusively for students attending Bhavans School. Our drivers follow verified schedules to ensure student safety, punctual arrival, and orderly return every school day.",
                Arrays.asList(
                    "Daily morning pickup and afternoon return routes for Bhavans School students",
                    "Structured semester and academic-year commute arrangements",
                    "Dedicated stops mapped for student convenience and punctuality"
                ),
                Arrays.asList("Blue Tourister (22-seater)", "Green Mahindra vehicle (25-seater)", "Omni van"),
                "Exclusively available for students of Bhavans School. Not offered for other schools. Enquiries are submitted for route coordination; this service does not imply an official institutional affiliation with Bhavans School."
            ),
            new ServiceDto(
                "school-trips-tours",
                "School Trips and Educational Tours",
                "school-trips-and-educational-tours",
                "/assets/images/tourist_travel_service.jpg",
                "Safe group transportation for educational field trips, science exhibitions, museum visits, and student excursions.",
                "Coordinated transportation logistics for educational tours, historical heritage excursions, science centre visits, and inter-school academic competitions. Open to educational batches and student groups seeking reliable travel.",
                Arrays.asList(
                    "Single-day educational visits and science museum tours",
                    "Interschool sports competitions and cultural events",
                    "Field study trips and student excursion programs"
                ),
                Arrays.asList("Green Mahindra vehicle (25-seater)", "Blue Tourister (22-seater)", "Tavera (8-seater)"),
                "Available for schools, colleges, and student groups generally. Advance enquiry recommended to align itinerary stops and route requirements."
            ),
            new ServiceDto(
                "tourist-travel",
                "Tourist Travel",
                "tourist-travel",
                "/assets/images/hero_travel_bus.jpg",
                "Comfortable passenger vehicles for sightseeing itineraries, family vacations, pilgrimage tours, and group travel.",
                "Explore regional tourist spots, pilgrimage temples, coastal destinations, and hill stations with clean, dependable passenger vehicles. SV Travels caters to family groups and travel parties looking for comfortable seating and courteous drivers.",
                Arrays.asList(
                    "Family vacation road trips and sightseeing packages",
                    "Pilgrimage trips and temple circuit visits",
                    "Weekend group tours and outstation leisure trips"
                ),
                Arrays.asList("Green Mahindra vehicle (25-seater)", "Blue Tourister (22-seater)", "Tavera (8-seater)", "Omni van"),
                "Both one-way transfers and round-trip packages available. Detailed route and stop requirements can be shared during enquiry."
            ),
            new ServiceDto(
                "local-outstation",
                "Local and Outstation Travel",
                "local-and-outstation-travel",
                "/assets/images/tavera_passenger_suv.jpg",
                "Point-to-point transfers for airport pickups, family functions, social events, and intercity journeys.",
                "From punctual airport pick-and-drops across Chennai to attending wedding celebrations or traveling to outstation districts, SV Travels offers point-to-point and round-trip travel hires keeping your group together comfortably.",
                Arrays.asList(
                    "Chennai airport and railway terminal passenger transfers",
                    "Family gatherings, weddings, and social functions",
                    "Intercity outstation journeys from Chennai"
                ),
                Arrays.asList("Tavera (8-seater)", "Omni van", "Blue Tourister (22-seater)", "Green Mahindra vehicle (25-seater)"),
                "Enquiries accepted for same-day local hires as well as multi-day outstation trips. Pickup and drop locations can be customized."
            )
        );

        return ResponseEntity.ok(services);
    }
}
