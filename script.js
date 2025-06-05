const userContainer = document.getElementById("userContainer");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUserData() {
  userContainer.innerHTML = "<p>Loading users...</p>";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Failed to fetch users");

    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    userContainer.innerHTML = "<p style='color:red;'>Error fetching data. Check your connection.</p>";
    console.error(error);
  }
}

function displayUsers(users) {
  userContainer.innerHTML = ""; // Clear previous users

  users.forEach(user => {
    const userCard = document.createElement("div");
    userCard.className = "user";

    userCard.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
    `;

    userContainer.appendChild(userCard);
  });
}

// Load users on page load
fetchUserData();

// Reload button
reloadBtn.addEventListener("click", fetchUserData);
