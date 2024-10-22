# CISC327 Group 34

## How to run the (Next.js) front-end

To run the front-end project located in the `roam-frontend` folder, follow these steps:

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
2. Navigate into the front-end project: `cd roam-frontend`.
3. Build your container: `docker build -t roam-frontend .`.
4. Run your container: `docker run -p 3000:3000 roam-frontend`.
5. Open your browser and navigate to `http://localhost:3000` to see the webpage.
6. To run the tests see the instructions below to setup the dev dependencies and then run: `npm test`.

You can view your images created with `docker images`.

### Prerequisites
- Node.js installed
- `npm` or `pnpm` package manager installed

## Using Node.js
### Step 1: Install Node.js

#### Option 1: Using `nvm` (Node Version Manager)
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

### Step 2: Install Dependencies
Once Node.js is installed, navigate to the `roam-frontend` directory:

```bash
cd roam-frontend
```

Now, you can install the dependencies using either `npm` or `pnpm`.

#### Option 1: Using `npm` (default Node.js package manager)
1. Install the required packages:
    ```bash
    npm install
    ```

#### Option 2: Using `pnpm` (alternative package manager)
1. If `pnpm` is not installed, you can install it globally:
    ```bash
    npm install -g pnpm
    ```
2. Install the required packages:
    ```bash
    pnpm install
    ```

### Step 3: Run the Development Server
After installing the dependencies, run the following command to start the development server:

#### Using `npm`:
```bash
npm run dev
```

#### Using `pnpm`:
```bash
pnpm run dev
```

This will start the development server. By default, you can access the application in your browser at `http://localhost:3000`.

### Additional Commands
- To test the application:
    ```bash
    npm test
    ```
    or
    ```bash
    pnpm test
    ```

- To build the application for production:
    ```bash
    npm run build
    ```
    or
    ```bash
    pnpm run build
    ```

- To start the production server:
    ```bash
    npm start
    ```
    or
    ```bash
    pnpm start
    ```
