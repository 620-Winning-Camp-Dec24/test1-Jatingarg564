let bookings = [];

document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const dateTime = document.getElementById("dateTime").value;

  // Add booking to the array
  bookings.push({ Name: name, Email: email, "Booking Date/Time": dateTime });

  // Update the booking history list
  updateHistory();

  alert("Booking added successfully!");
  modal.style.display = "none";
});

function updateHistory() {
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";
  bookings.forEach((booking, index) => {
    historyList.innerHTML += `<li>${index + 1}. ${booking.Name} - ${booking["Booking Date/Time"]}</li>`;
  });
}

// Save booking history to an Excel file
document.getElementById("saveHistoryBtn").addEventListener("click", function () {
  if (bookings.length === 0) {
    alert("No booking history to save!");
    return;
  }

  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Convert booking data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(bookings);

  // Append worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Booking History");

  // Generate Excel file and download
  XLSX.writeFile(workbook, "booking_history.xlsx");
});
