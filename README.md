# CISC327 Group 34

## How to run the app

To run project with both the fronend and backend, follow these steps:

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
2. Ensure you are in the repo directory.
3. Build the containers: `docker compose build`.
4. Run your container: `docker run compose up -d`.
5. Ensure both the frontend and backend containers are running `docker ps`.
5. Open your browser and navigate to `http://localhost:3000` to see the webpage.
6. To run the tests see the instructions below.

You can view your docekr images created with `docker images`.


## Frontend

- Navigate into the `roam-fronend` directory.

### Prerequisites
- Node.js installed
- `npm` or `pnpm` package manager installed

### Step-by-Step Setup

#### Step 1: Install Node.js

##### Option 1: Using `nvm` (Node Version Manager)
Using `nvm` allows you to easily manage multiple Node.js versions on your machine.

**macOS/Linux:**
1. Install `nvm` by running the following command in your terminal:
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    ```
2. Reload your terminal or run the following command to activate `nvm`:
    ```bash
    source ~/.nvm/nvm.sh
    ```
3. Install the required Node.js version (check the `.nvmrc` file in the project if it exists or use the latest stable version):
    ```bash
    nvm install node
    ```
4. Use the installed Node.js version:
    ```bash
    nvm use node
    ```

**Windows:**
1. Install `nvm-windows` by downloading the installer from the [nvm-windows GitHub repository](https://github.com/coreybutler/nvm-windows/releases).
2. Follow the setup instructions to complete the installation.
3. Install the required Node.js version:
    ```bash
    nvm install latest
    ```
4. Use the installed Node.js version:
    ```bash
    nvm use latest
    ```

#### Step 2: Install Dependencies
Once Node.js is installed, navigate to the `roam-frontend` directory:

```bash
cd roam-frontend
```

Now, you can install the dependencies using either `npm` or `pnpm`.

##### Option 1: Using `npm` (default Node.js package manager)
1. Install the required packages:
    ```bash
    npm install
    ```

##### Option 2: Using `pnpm` (alternative package manager)
1. If `pnpm` is not installed, you can install it globally:
    ```bash
    npm install -g pnpm
    ```
2. Install the required packages:
    ```bash
    pnpm install
    ```

#### Step 3: Run the Development Server
After installing the dependencies, run the following command to start the development server:

##### Using `npm`:
```bash
npm run dev
```

##### Using `pnpm`:
```bash
pnpm run dev
```

This will start the development server. You can access the application in your browser at `http://localhost:3000`.

#### Tesing the frontend
- To test the application:
    ```bash
    npm test
    ```
    or
    ```bash
    pnpm test
    ```

#### Building the frontend
- To build the application:
    ```bash
    npm run build
    ```
    or
    ```bash
    pnpm run build
    ```

## Backend

- Navigate into the `roam-backend` directory.

### Prerequisites
- Python installed.

### Step-by-Step Setup

#### Step 1: Set up Virtual Environment

1. Create a virtual environment in the `roam-backend` directory:
   ```bash
   python -m venv venv
   ```

2. Activate the virtual environment:

   - **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```
   - **Windows**:
     ```bash
     .\venv\Scripts\activate
     ```

3. Once activated, your terminal prompt will show `(venv)` at the beginning.

#### Step 2: Install Dependencies

After activating the virtual environment, install the required packages listed in `requirements.txt`:

```bash
pip install -r requirements.txt
```

#### Step 3: Run the Application

Start the Flask backend.

1. Run the application:
   ```bash
   python run.py
   ```

2. The app will be available at `http://127.0.0.1:5000` by default. You can change the host or port by updating the environment variables `FLASK_RUN_HOST` and `FLASK_RUN_PORT` if needed.

### Testing the Backend

To run tests for the backend, use `pytest`:

```bash
pytest
```