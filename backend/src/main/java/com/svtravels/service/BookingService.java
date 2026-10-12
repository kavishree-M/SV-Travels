package com.svtravels.service;

import com.svtravels.dto.BookingRequestDto;
import com.svtravels.dto.BookingResponseDto;
import com.svtravels.entity.BookingStatus;
import com.svtravels.entity.EmailStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Random;

@Service
public class BookingService {

    private static final Logger logger = LoggerFactory.getLogger(BookingService.class);

    private final EmailNotificationService emailNotificationService;
    private final Random random = new Random();

    public BookingService(EmailNotificationService emailNotificationService) {
        this.emailNotificationService = emailNotificationService;
    }

    /**
     * Send a booking enquiry by email without persisting customer data.
     */
    public BookingResponseDto createBooking(BookingRequestDto requestDto) {
        String reference = generateUniqueBookingReference();
        emailNotificationService.sendBookingNotification(requestDto, reference);
        logger.info("Sent booking enquiry email for reference {}", reference);

        BookingResponseDto response = new BookingResponseDto();
        response.setId(reference);
        response.setBookingReference(reference);
        response.setFullName(requestDto.getFullName().trim());
        response.setEmail(requestDto.getEmail().trim().toLowerCase());
        response.setPhone(requestDto.getPhone().trim());
        response.setServiceType(requestDto.getServiceType().trim());
        response.setTripType(requestDto.getTripType().trim().toLowerCase());
        response.setTravelDate(requestDto.getTravelDate());
        response.setReturnDate(requestDto.getReturnDate());
        response.setPickupLocation(requestDto.getPickupLocation().trim());
        response.setDestination(requestDto.getDestination().trim());
        response.setPassengerCount(requestDto.getPassengerCount());
        response.setPreferredVehicleCategory(requestDto.getVehicleCategory().trim());
        response.setAdditionalRequirements(requestDto.getAdditionalRequirements());
        response.setLanguage(requestDto.getLanguage());
        response.setStatus(BookingStatus.PENDING);
        response.setEmailNotificationStatus(EmailStatus.SENT);
        response.setCreatedAt(java.time.LocalDateTime.now());
        response.setConfirmationMessage("Your booking enquiry was emailed to SV Travels successfully.");
        return response;
    }

    /**
     * Generate unique reference code format: SVT-YYYYMM-XXXX
     */
    private String generateUniqueBookingReference() {
        String yearMonth = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMM"));
        String ref;
        int randomSuffix = 1000 + random.nextInt(9000);
        ref = String.format("SVT-%s-%d", yearMonth, randomSuffix);
        return ref;
    }
}
