# CISC327 Group 34

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
