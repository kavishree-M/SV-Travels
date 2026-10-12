package com.svtravels.service;

import com.svtravels.dto.BookingRequestDto;
import com.svtravels.exception.EmailDeliveryException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailNotificationService {

    private static final Logger logger = LoggerFactory.getLogger(EmailNotificationService.class);

    private final JavaMailSender mailSender;
    private final String officialEmail;
    private final String senderEmail;
    private final String senderPassword;

    public EmailNotificationService(
            JavaMailSender mailSender,
            @Value("${svtravels.email.official:}") String officialEmail,
            @Value("${spring.mail.username:}") String senderEmail,
            @Value("${spring.mail.password:}") String senderPassword) {
        this.mailSender = mailSender;
        this.officialEmail = officialEmail;
        this.senderEmail = senderEmail;
        this.senderPassword = senderPassword;
    }

    public void sendBookingNotification(BookingRequestDto booking, String reference) {
        if (senderEmail.isBlank() || senderPassword.isBlank() || officialEmail.isBlank()) {
            logger.error("Booking email is not configured: MAIL_USERNAME, MAIL_PASSWORD, and SV_TRAVELS_EMAIL are required.");
            throw new EmailDeliveryException(
                    "Booking email is not configured. Set MAIL_USERNAME, MAIL_PASSWORD, and SV_TRAVELS_EMAIL on the backend.");
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(senderEmail);
        message.setTo(officialEmail);
        message.setReplyTo(booking.getEmail().trim());
        message.setSubject("New Booking Enquiry - SV Travels - " + reference);

        StringBuilder body = new StringBuilder();
        body.append("=== SV TRAVELS - NEW BOOKING ENQUIRY ===\n\n");
        body.append("Booking Reference: ").append(reference).append("\n\n");
        body.append("--- CUSTOMER DETAILS ---\n");
        body.append("Name:              ").append(booking.getFullName().trim()).append("\n");
        body.append("Phone:             ").append(booking.getPhone().trim()).append("\n");
        body.append("Email:             ").append(booking.getEmail().trim()).append("\n");
        body.append("Language:          ")
                .append(booking.getLanguage() == null ? "EN" : booking.getLanguage().toUpperCase())
                .append("\n\n");
        body.append("--- TRIP SPECIFICATIONS ---\n");
        body.append("Selected Service:  ").append(booking.getServiceType().trim()).append("\n");
        body.append("Trip Format:       ").append(booking.getTripType().trim()).append("\n");
        if (booking.getTravelDate() != null) {
            body.append("Departure Date:    ").append(booking.getTravelDate()).append("\n");
        }
        if (booking.getReturnDate() != null) {
            body.append("Return Date:       ").append(booking.getReturnDate()).append("\n");
        }
        body.append("Pickup Location:   ").append(booking.getPickupLocation().trim()).append("\n");
        body.append("Destination:       ").append(booking.getDestination().trim()).append("\n");
        body.append("Passenger Count:   ").append(booking.getPassengerCount()).append("\n");
        body.append("Preferred Vehicle: ").append(booking.getVehicleCategory().trim()).append("\n\n");
        body.append("--- ADDITIONAL REQUIREMENTS / NOTES ---\n");
        body.append(booking.getAdditionalRequirements() == null || booking.getAdditionalRequirements().isBlank()
                ? "None specified"
                : booking.getAdditionalRequirements()).append("\n");

        message.setText(body.toString());
        try {
            mailSender.send(message);
        } catch (MailException ex) {
            logger.error("Failed to deliver booking notification for {}", reference, ex);
            throw new EmailDeliveryException(
                    "SV Travels could not send the booking email. Please try again later or contact us directly.");
        }
    }
}
