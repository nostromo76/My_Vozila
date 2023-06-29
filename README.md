Note: The above instructions assume that you have already set up the Vozila website on a local or remote server and have the necessary access to test it.

---

## Vozila Website Test Suite

This test suite is designed to test the functionality of the Vozila website, a simple parking management system that allows users to register their vehicle, including their name, car model, license plate, and date and time when the car enters and leaves the parking lot.

### Technologies Used

This test suite uses the following technologies:

- Cypress
- Mocha
- Chai

### Running the Tests

To run the test suite, follow the steps below:

1. Install the required dependencies:

```
npm install
```

2. Start the Vozila website locally or use the URL of the remote website, and update the `baseUrl` in the `cypress.json` file with the URL of the website.

3. Open Cypress by running the following command:

```
npm run cypress:open
```

4. This will launch the Cypress Test Runner, where you can select the test(s) you want to run.

5. To run all tests in the suite, click on the "Run all specs" button in the top right corner of the Test Runner.

6. Once the tests are complete, you can view the test results in the Test Runner UI, or by checking the `mochawesome-report` folder in the project directory for the HTML report.

### Test Coverage

This test suite covers the following scenarios:

- User can successfully register their vehicle
- User cannot submit registration form with missing or invalid data
- Time-based parking fee calculation is accurate


### Contributing

If you want to contribute to this test suite, feel free to submit pull requests or contact the developer for more information.

### License

This project is licensed under the MIT License - see the LICENSE file for details.