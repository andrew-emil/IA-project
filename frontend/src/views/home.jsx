import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const carPosts = [
    {
      id: 1,
      title: "Luxury SUV for Rent",
      brand: "BMW",
      model: "X5",
      year: 2022,
      description: "Comfortable and stylish SUV, perfect for city trips.",
      carType: "SUV",
      transmission: "Automatic",
      location: "Riyadh",
      rentalStatus: "Available",
      availableFrom: "2025-04-24",
      availableTo: "2025-05-01",
      price: 350,
    },
    {
      id: 2,
      title: "Economy Car for Daily Use",
      brand: "Toyota",
      model: "Yaris",
      year: 2021,
      description: "Fuel-efficient and compact, ideal for daily commutes.",
      carType: "Sedan",
      transmission: "Manual",
      location: "Jeddah",
      rentalStatus: "Available",
      availableFrom: "2025-04-25",
      availableTo: "2025-05-10",
      price: 150,
    },
    {
      id: 3,
      title: "Family Van with Extra Space",
      brand: "Honda",
      model: "Odyssey",
      year: 2020,
      description: "Spacious van with all the features for family trips.",
      carType: "Van",
      transmission: "Automatic",
      location: "Dammam",
      rentalStatus: "Rented",
      availableFrom: "2025-05-10",
      availableTo: "2025-05-20",
      price: 250,
    },
  ];

  const handleButtonClick = (id) => {
    navigate(`/car/${id}`);
  };

  if (loading) {
    return (
      <Container>
        <Skeleton variant="rectangular" height={205} sx={{ marginY: "1rem" }} />
        <Skeleton variant="rectangular" height={205} sx={{ marginY: "1rem" }} />
        <Skeleton variant="rectangular" height={205} sx={{ marginY: "1rem" }} />
      </Container>
    );
  }

  return (
    <Container>
      {carPosts.length > 0 ? (
        carPosts.map((car) => (
          <Card variant="outlined" key={car.id} sx={{ marginY: "1rem" }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {car.title} - {car.brand} {car.model} ({car.year})
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                {car.description}
              </Typography>
              <Typography variant="body2">
                <strong>Type:</strong> {car.carType} |{" "}
                <strong>Transmission:</strong> {car.transmission} <br />
                <strong>Location:</strong> {car.location} <br />
                <strong>Status:</strong> {car.rentalStatus} <br />
                <strong>Available From:</strong> {car.availableFrom} to{" "}
                {car.availableTo}
                <br />
                <strong>Price:</strong> ${car.price}/day
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleButtonClick(car.id)}>
                View Details
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Container
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h5">No Cars Available Yet</Typography>
            </CardContent>
          </Card>
        </Container>
      )}
    </Container>
  );
}
