# Food Delivery App

This is a food delivery application that allows users to register, log in, place orders, view their order history, and complete transactions. Built with React for the frontend, Node.js and Express for the backend, and MongoDB for the database.

## Features

### 1. **Login Page**
   - The login page allows existing users to sign in using their credentials (email and password).
   - After successful login, users are redirected to the menu page.

   **Screenshot:**
  ![Screenshot 2025-01-11 233102](https://github.com/user-attachments/assets/93f9d536-ff34-4e38-8bba-57a7594faee6)



### 2. **Register Page**
   - The register page enables new users to create an account by entering their username and password.
   - Once registered, users can log in and proceed to the menu.

   **Screenshot:**
   ![Screenshot 2025-01-11 233049](https://github.com/user-attachments/assets/aecb2be0-6638-490a-b769-705323e6f6de)


### 3. **Menu Display**
   - The menu page displays a list of available food items, each with its name, description, price, and an option to add to the cart.
   - Items can be filtered based on categories such as "Appetizers", "Main Course", and "Drinks".
   
   **Screenshot:**
  ![Screenshot 2025-01-11 233115](https://github.com/user-attachments/assets/910b0728-611d-4a9a-bdff-d519d5844ba3)



### 4. **Add to Cart**
   - Users can add items to their cart by selecting the quantity and clicking the "Add to Cart" button.
   - The cart is updated in real-time and shows the items, quantities, and the total price.

   **Screenshot:**
  ![Screenshot 2025-01-11 233130](https://github.com/user-attachments/assets/3779d95a-386b-46b1-bfc7-d05ec9cccd76)


### 5. **Order Details**
   - Users can view their cart and proceed to the checkout page where they can fill in their name, address, and review the items before placing the order.
   - The order total is calculated and displayed along with the estimated delivery time.
   
   **Screenshot:**
  ![Screenshot 2025-01-11 233151](https://github.com/user-attachments/assets/c5f808ad-8fd7-45c1-b220-cd5121ce96d9)


### 6. **Place Order**
   - After entering the order details, users can place their order. The order details are sent to the backend and stored in the database.

   **Screenshot:**
  ![Screenshot 2025-01-11 233200](https://github.com/user-attachments/assets/8aa27eab-3386-4f77-a90c-1b9694bfff4b)


### 7. **Order History**
   - Users can view their past orders, including the items ordered, delivery address, customer name, and estimated delivery time.
   - The order history page is automatically updated after each successful order.

   **Screenshot:**
  ![Screenshot 2025-01-11 233219](https://github.com/user-attachments/assets/5248afe7-6c8d-4399-823c-03c123c01eac)


### 8. **Backend Features**
   - **Order API:** The backend provides an API to place new orders and fetch past orders.
   - **User Authentication:** JWT-based authentication is used to secure user interactions with the system.
   - **Menu Management:** A dynamic menu is served from the database, allowing admins to update available items.

### 9. **User Authentication**
   - The app supports user login, where users must log in to place an order and view their order history.
   - A JWT token is used for authentication.

### 10. **Responsive Design**
   - The app is designed to be fully responsive and works well across different screen sizes (desktop, tablet, and mobile).

## Technologies Used

- **Frontend:** React, Material-UI, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **State Management:** React Context API
- **API Client:** Fetch API
- **UI Framework:** Material-UI


