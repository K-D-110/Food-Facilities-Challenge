import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';
import app from '../server.mjs';
import { use, expect } from 'chai'
import chaiHttp from 'chai-http'
const chai = use(chaiHttp)



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let foodTruckData = [];

before((done) => {
    const csvFilePath = path.join(__dirname, '../Mobile_Food_Facility_Permit.csv');
    createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            foodTruckData.push(row);
        })
        .on('end', () => {
            console.log("CSV data is loaded for tests");
            done();
        });
});

describe('Server API Routes', () => {

    // Test the food trucks endpoint
    describe('GET /api/foodtrucks', () => {
        it('should return the list of food trucks', (done) => {
            chai.request(app)
                .get('/api/foodtrucks')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    // Test search by applicant
    describe('GET /api/search/applicant', () => {
        it('should return food trucks by applicant name', (done) => {
            const name = 'Reecees Soulicious';
            chai.request(app)
                .get(`/api/search/applicant?name=${name}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it('should return 400 if name parameter is missing', (done) => {
            chai.request(app)
                .get('/api/search/applicant')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });
    });

    // Test search by address
    describe('GET /api/search/address', () => {
        it('should return food trucks by address', (done) => {
            const address = 'folsom';
            chai.request(app)
                .get(`/api/search/address?address=${address}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    // Test nearest food trucks
    describe('GET /api/foodtrucks/nearest', () => {
        it('should return the 5 nearest food trucks', (done) => {
            const latitude = '37.7852719490667';
            const longitude = '-122.422603585164';
            chai.request(app)
                .get(`/api/foodtrucks/nearest?latitude=${latitude}&longitude=${longitude}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array').that.has.lengthOf(5);
                    done();
                });
        });

        it('should return 400 if latitude or longitude is missing', (done) => {
            chai.request(app)
                .get('/api/foodtrucks/nearest')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });
});
