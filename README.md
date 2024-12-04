# CISC327 Group 34


## How to run End To End Tests

To test the E2E tests for this project, make sure you are in the `roam-end2end-tests` directory.

1. **Navigate to the `roam-end2end-tests` Directory**:
   - Open a terminal and navigate to the `roam-end2end-tests` directory:
     ```bash
     cd roam-end2end-tests
     ```

2. Create a virtual environment in the `roam-backend` directory:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```
   - **Windows**:
     ```bash
     .\venv\Scripts\activate
     ```

4. Once activated, your terminal prompt will show `(venv)` at the beginning.

5. After activating the virtual environment, install the required packages listed in `requirements.txt`:
    ```bash
    pip install -r requirements.txt
    ```

6. Run the webapplication by following the steps outline in [How to run the app](#how-to-run-the-app)

7. Run the End To End Tests from the `roam-end2end-tests` directory:
   ```bash
   pytest -n auto -v tests
   ```

8. An alternative is to run `run.py` or `run_pytest`
   - **Manual**:
     ```bash
     python run.py
     ```
   - **Pytest**:
     ```bash
     python run_pytest.py
     ```

## How to Test Integration Tests

To test integration tests for this project, make sure you are in the `roam-frontend` directory.

1. **Navigate to the `roam-frontend` Directory**:
   - Open a terminal and navigate to the `roam-frontend` directory:
     ```bash
     cd roam-frontend
     ```

2. **Run Jest**:
   - Execute Jest tests:
     ```bash
     npx jest --testPathPattern="__integration__tests__"
     ```
   - This command will run only the tests in the `__integration__tests__` directory.

## How to Test Frontend Code Coverage

To test frontend code coverage for this project, make sure you are in the `roam-frontend` directory.

### Using VS Code

1. **Install Jest Extension**: 
   - Ensure you have the [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) extension installed.
   - This extension will automatically run Jest tests and display code coverage information within the editor.

2. **Enable Code Coverage Display**:
   - Once the Jest extension is installed, open the command palette (`Ctrl + Shift + P` or `Cmd + Shift + P` on Mac).
   - Search for and select **Jest: Toggle Coverage Overlay**.
   - This will show the inline code coverage overlay, which highlights tested and untested lines of code in the editor.

3. **Execute Tests**:
    - From the VS Code Testing side nav bar, you can execute all Jest tests.

4. **View Coverage Summary**:
   - The Jest extension should display a coverage summary in the VS Code side nav bar, providing an overview of the test coverage across all the files.

### Using Jest Terminal Command

To manually run Jest and view a detailed code coverage report:

1. **Navigate to the `roam-frontend` Directory**:
   - Open a terminal and navigate to the `roam-frontend` directory:
     ```bash
     cd roam-frontend
     ```

2. **Run Jest with Coverage Option**:
   - Execute Jest tests and generate a code coverage report by running:
     ```bash
     npx jest --coverage
     ```
   - This command will display coverage information in the terminal and generate a `coverage` folder containing an HTML report.

3. **View Detailed HTML Report**:
   - To view the HTML report, open `coverage/lcov-report/index.html` in a browser.


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