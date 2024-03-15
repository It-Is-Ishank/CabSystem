# Cab Booking System

The Cab Booking System is a web application designed to manage cab bookings for various types of cabs. It allows users to book cabs for their trips, view available cabs, and manage bookings.

## Features

- **Book Cab:** Users can book a cab by providing details such as cab type, start time, source, destination, and email address.
- **View Available Cabs:** Users can view the available cabs for a specific time slot.
- **Conflict Detection:** The system detects conflicts when booking a cab for a specific time slot if the cab is already booked or unavailable.
- **Admin Dashboard:** An admin dashboard is provided to manage cab types, view all bookings, and monitor cab availability.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: React.js
- **Styling**: CSS

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/cab-booking-system.git
    ```
2. Navigate to the project directory:
  ```bash
  cd MyVahan
  ```
3. Install dependecies for both server and client
  ```bash
  cd client
  npm install
  ```
  ```bash
  cd server
  npm install
  ```
4. Create the DotEnv file with these variables
  ```bash
    DB_USER = <db user>
    DB_PASSWORD = <db password>
    EMAIL_USER = <email>
    EMAIL_PASSWORD = <app password>
  ```
5. Run the development server
  ```bash
  npm run dev // for client
  npm start // for server
  ```

## Usage
 - Register or log in to your account.
 - Book a cab by providing details such as cab type, start time, source, destination, and email address.
 - View available cabs for a specific time slot.
 - Admin users can manage cab types, view all bookings, and monitor cab availability from the admin dashboard.
