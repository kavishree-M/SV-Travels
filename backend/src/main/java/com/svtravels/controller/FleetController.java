package com.svtravels.controller;

import com.svtravels.dto.FleetDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/fleet")
public class FleetController {

    @GetMapping
    public ResponseEntity<List<FleetDto>> getFleet() {
        List<FleetDto> fleet = Arrays.asList(
            new FleetDto(
                "fleet-omni-van",
                "Omni van",
                "Omni van",
                null,
                false,
                "Seating capacity to be confirmed",
                "/assets/images/omni_passenger_van.jpg",
                "Compact passenger van suitable for small group transfers, local errands, and quick point-to-point journeys.",
                Arrays.asList(
                    "Compact Micro-Van Maneuverability",
                    "Sliding Passenger Access Door",
                    "Seating capacity to be confirmed upon booking consultation",
                    "Suitable for Local City Street Navigation"
                ),
                "Small group local transfers, student pickup routes, and quick city travel."
            ),
            new FleetDto(
                "fleet-blue-tourister",
                "Blue Tourister",
                "Blue Tourister",
                22,
                true,
                "22-seater",
                "/assets/images/blue_tourister_bus.jpg",
                "Distinctive royal blue 22-seater mini bus with dedicated passenger seating and comfortable highway ride.",
                Arrays.asList(
                    "Confirmed 22 Passenger High-Back Seats",
                    "Wide Tinted Passenger Windows",
                    "Overhead Hand-Luggage Storage Space",
                    "Maintained for School & Sightseeing Trips"
                ),
                "Bhavans school transport batches, educational tours, and tourist groups up to 22 passengers."
            ),
            new FleetDto(
                "fleet-green-mahindra",
                "Green Mahindra vehicle",
                "Green Mahindra vehicle",
                25,
                true,
                "25-seater",
                "/assets/images/green_mahindra_vehicle.jpg",
                "Sturdy green 25-seater Mahindra passenger vehicle designed for larger groups, school batches, and excursion travel.",
                Arrays.asList(
                    "Confirmed 25 Passenger Seating Capacity",
                    "Spacious Cabin for Larger Batches",
                    "Robust Chassis Built for Outstation & Local Highways",
                    "Adequate Luggage Space for School & Tour Groups"
                ),
                "Large student groups, school excursions, and tourist groups up to 25 passengers."
            ),
            new FleetDto(
                "fleet-tavera",
                "Tavera",
                "Tavera",
                8,
                true,
                "8-seater",
                "/assets/images/tavera_passenger_suv.jpg",
                "Reliable 8-seater multi-utility passenger vehicle ideal for families, airport runs, and smaller travel parties.",
                Arrays.asList(
                    "Confirmed 8 Passenger Seats",
                    "Air-Conditioned Cabin Comfort",
                    "Smooth Highway Performance",
                    "Flexible Luggage Space for Family Trips"
                ),
                "Family airport transfers, small private group outstation travel, and local Chennai transit up to 8 passengers."
            )
        );

        return ResponseEntity.ok(fleet);
    }
}
