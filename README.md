# ClinicsNepal

ClinicsNepal is a web application designed to facilitate the management of clinics, appointments, and patient interactions. It provides a user-friendly interface for both administrators and patients to manage appointments, view doctors, and communicate effectively.

## Features

- **User Authentication**: Secure login for admins and patients.
- **Appointment Management**: Patients can book, view, and manage their appointments.
- **Doctor Directory**: A comprehensive list of doctors with their specialties.
- **Message System**: Patients can send messages to the clinic for inquiries.
- **Admin Dashboard**: Admins can manage users, appointments, and doctors efficiently.

## Tech Stack

- **Frontend**:

  - React
  - Vite
  - Axios
  - React Router
  - React Toastify

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT for authentication
  - Cloudinary for image uploads

## Installation

### Prerequisites

- Node.js
- MongoDB
- Cloudinary account (for image uploads)

### Clone the repository

```bash
git clone https://github.com/abhisoni24/ClinicsNepal.git
cd ClinicsNepal
```

### Setup Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend directory and add the following variables:

```plaintext
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:3000
DASHBOARD_URL=http://localhost:4000
```

Start the backend server:

```bash
npm run dev
```

### Setup Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend server:

```bash
npm run dev
```

## Usage

1. Open your browser and go to [http://localhost:3000](http://localhost:3000) for the frontend.
2. Admin can log in using their credentials to manage the clinic.
3. Patients can register and log in to book appointments and communicate with the clinic.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- React
- Node.js
- Express
- MongoDB
- Cloudinary
