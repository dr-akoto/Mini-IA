const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');
const PatientController = require('../../src/controllers/patientController');
const Patient = require('../../src/models/Patient');

chai.use(chaiHttp);
const should = chai.should();

describe('Patient Controller', () => {
  beforeEach(async () => {
    // Clear the database or perform any necessary setup before each test
    await Patient.deleteMany({});
  });

  describe('POST /patients', () => {
    it('should register a new patient', async () => {
      const newPatientData = {
        patientID: '123',
        surname: 'kwame',
        otherNames: 'sekyi',
        time: 18/10/2023,
        gender: 'Male',
        phoneNumber: '1234567890',
        residentialAddress: 'Legon street',
        emergency: { name: 'Emergency Contact', contact: '9876543210', relationship: 'son' }
      };

      const response = await chai.request(app).post('/patients').send(newPatientData);

      response.should.have.status(201);
      response.body.should.be.an('object');
      response.body.should.have.property('message').eql('Patient registered successfully');
      response.body.should.have.property('patient');

      const { patient } = response.body;
      patient.should.have.property('patientID').eql(newPatientData.patientID);
      // Add more assertions for other properties as needed
    });

    // Add more test cases for error scenarios, validation checks, etc.
  });

  // Add more describe blocks for other controller methods as needed

});
