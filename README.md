# SV Travels

A responsive travel and passenger transportation website for SV Travels, Chennai. Customers can enquire about Bhavans School transportation, educational tours, tourist travel, and local or outstation journeys.

## Architecture

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, Axios.
- **Backend:** Java 17+, Spring Boot 3.3, Bean Validation, Spring Mail.
- **Booking delivery:** The backend validates each enquiry and sends it to the configured inbox over Gmail SMTP. Booking details are not retained by the app in SQL, server storage, or browser storage.

## Email configuration

Configure these variables in the backend environment:

| Variable | Purpose |
|---|---|
| `MAIL_HOST` | SMTP server; defaults to `smtp.gmail.com` |
| `MAIL_PORT` | SMTP SSL port; defaults to `465` |
| `MAIL_USERNAME` | Gmail account used to send the notification |
| `MAIL_PASSWORD` | Google App Password; do not use your normal account password |
| `SV_TRAVELS_EMAIL` | Inbox that receives booking enquiries; defaults to `MAIL_USERNAME` |

Keep SMTP credentials on the backend only. Do not place them in frontend environment variables, source files, or committed `.env` files. See [backend/.env.example](./backend/.env.example) for placeholders. If SMTP is not configured or delivery fails, the booking API returns an error and the frontend does not show a successful booking confirmation.

### Render email setup

The backend connects to Gmail using implicit SSL on port `465`. The Render Blueprint deliberately leaves `MAIL_PASSWORD` unset because it is a secret. In the `sv-travels-backend` service's **Environment** settings, add `MAIL_PASSWORD` with a Google App Password for the account in `MAIL_USERNAME` (not the account's regular password), save the change, and redeploy. Keep `MAIL_USERNAME` and `SV_TRAVELS_EMAIL` set to the Gmail sender account and the inbox that should receive enquiries. After redeployment, submit a test enquiry and check that inbox's spam folder if the message is not in the inbox. The API reports an error rather than confirming a booking when email delivery fails.

## Booking API

`POST /api/bookings` validates and emails the booking enquiry. A successful response is returned only after the SMTP send call succeeds. The response includes a generated reference; it is not a database record and cannot be retrieved from the server later.

For recurring Bhavans School Transportation enquiries, `travelDate` and `returnDate` may be omitted or `null`. The number of students is sent as `passengerCount`, and student standards are included in `additionalRequirements`.

Example:

```json
{
  "fullName": "Priya Sundaram",
  "email": "priya@example.com",
  "phone": "+91 98765 43210",
  "serviceType": "School Trips and Educational Tours",
  "tripType": "round-trip",
  "travelDate": "2026-10-24",
  "returnDate": "2026-10-25",
  "pickupLocation": "Green Valley High School, Main Gate",
  "destination": "State Science Centre & Museum",
  "passengerCount": 21,
  "vehicleCategory": "21-seater",
  "additionalRequirements": "Early pickup required at 6:30 AM."
}
```

The backend also exposes `GET /api/services` and `GET /api/fleet`.

## Run locally

### Frontend

```bash
npm install
npm run dev
```

Vite serves the site at `http://localhost:3000`.

### Backend

Requires JDK 17+ and Maven 3.8+. Set `MAIL_USERNAME`, `MAIL_PASSWORD` (Google App Password), and `SV_TRAVELS_EMAIL` in the backend process environment, then run:

```bash
cd backend
mvn spring-boot:run
```

No database or MySQL service is required.

## Render deployment

The `render.yaml` Blueprint creates a frontend static site and an email-only backend web service; it does not provision a database. Both services use Render's free plan, so the backend may spin down while idle and its first request after inactivity can take longer while it starts. The frontend waits for that startup before timing out. Set `MAIL_PASSWORD` in the backend service's secret environment variables before expecting booking email delivery. `MAIL_USERNAME` and the receiving inbox are preconfigured to the SV Travels Gmail address.
