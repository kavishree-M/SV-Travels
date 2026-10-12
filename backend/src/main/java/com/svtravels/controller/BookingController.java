package com.svtravels.controller;

import com.svtravels.dto.BookingRequestDto;
import com.svtravels.dto.BookingResponseDto;
import com.svtravels.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<BookingResponseDto> createBooking(
            @Valid @RequestBody BookingRequestDto requestDto) {
        BookingResponseDto response = bookingService.createBooking(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
