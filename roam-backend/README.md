# Roam Flask Backend

Run the development server:

```bash
python run.py
```


## Backend Architecture Overview

### Controllers
- **Purpose**: Handle HTTP requests and define API endpoints.
- **Responsibilities**:
  - Receive requests from frontend.
  - Parse request data, call relevant service methods, and return responses.
- **Example**: `user_controller` includes endpoints like `/signup` and `/login`.

### Services
- **Purpose**: Encapsulate business logic and rules.
- **Responsibilities**:
  - Handle core logic, validate data, and coordinate multiple repositories as needed.
  - Example operations: user creation, password hashing, and token generation.
- **Example**: `UserService` handles tasks for creating and authenticating users.

### Repositories
- **Purpose**: Abstract database operations.
- **Responsibilities**:
  - Interact with the database through CRUD operations and provide a clean interface for the service layer.
- **Example**: `UserRepository` has methods for `add`, `find_by_email`, and `find_by_id` to handle user data in the database.

### Models (Entities and DTOs)

#### Entities
- **Purpose**: Represent database tables, mapping directly to tables.
- **Responsibilities**:
  - Define fields and relationships for database storage, handling data persistence.
  
#### DTOs (Data Transfer Objects)
- **Purpose**: Facilitate data transfer between frontend and backend, representing the json objects.
- **Responsibilities**:
  - Shape data sent to and from backend.
  - Include helper methods (e.g., `to_dict`, `from_dict`)
- **Example**: `UserDTO` structures user data for requests and responses.

### Middleware (JWT Authentication)
- **Purpose**: Filter requests to secure endpoints, allowing access only to authenticated users.
- **Responsibilities**:
  - Validate JWT tokens to protect routes.
  - Deny access or allow requests based on token validity.

---

## How It Works Together

1. **Request Handling**: Controllers receive and parse HTTP requests.
2. **Service Logic**: Controllers call service methods, which handle the logic.
3. **Data Access**: Services interact with repositories to retrieve and persist data.
4. **Data Modeling**: DTOs and Entities manage data structure for internal database storage and external responses.
5. **JWT Middleware**: Protects endpoints by validating tokens before granting access.

