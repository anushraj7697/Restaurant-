import { useState } from "react";

const RestaurantReservation = () => {
  const totalSeats = 20;
  const [seatsLeft, setSeatsLeft] = useState(totalSeats);
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({ name: "", phone: "", guests: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReservation = () => {
    const { name, phone, guests } = formData;
    const guestCount = parseInt(guests, 10);

    if (!name || !phone || isNaN(guestCount) || guestCount <= 0) {
      alert("Please enter valid details.");
      return;
    }

    if (guestCount > seatsLeft) {
      alert("Not enough seats available.");
      return;
    }

    if (reservations.some((res) => res.name === name)) {
      alert("Duplicate name detected. Please use a unique name.");
      return;
    }

    const newReservation = {
      id: Date.now(),
      name,
      phone,
      guests: guestCount,
      checkInTime: new Date().toLocaleTimeString(),
      checkOutTime: null,
    };

    setReservations([...reservations, newReservation]);
    setSeatsLeft(seatsLeft - guestCount);
    setFormData({ name: "", phone: "", guests: "" });
  };

  const handleCheckout = (id) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, checkOutTime: new Date().toLocaleTimeString() } : res
      )
    );
  };

  const handleDelete = (id) => {
    const reservation = reservations.find((res) => res.id === id);
    if (!reservation) return;

    const updatedSeats = reservation.checkOutTime ? seatsLeft : seatsLeft + reservation.guests;
    setSeatsLeft(updatedSeats);
    setReservations(reservations.filter((res) => res.id !== id));
  };

  return (
    <div className="reservation-container">
      <h2>Welcome to AB Restaurant</h2>
      <div className="seats-info">Seats Left: {seatsLeft} / {totalSeats}</div>

      <div className="reservation-form">
        <input type="text" name="name" placeholder="Customer Name" value={formData.name} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
        <input type="number" name="guests" placeholder="Guest Count" value={formData.guests} onChange={handleChange} />
        <button onClick={handleReservation}>Book Table</button>
      </div>

      <table className="reservation-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Guests</th>
            <th>Check-in Time</th>
            <th>Checkout</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td>{res.name}</td>
              <td>{res.phone}</td>
              <td>{res.guests}</td>
              <td>{res.checkInTime}</td>
              <td>
                {res.checkOutTime ? res.checkOutTime : (
                  <button className="checkout-btn" onClick={() => handleCheckout(res.id)}>Click to Checkout</button>
                )}
              </td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(res.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantReservation;
