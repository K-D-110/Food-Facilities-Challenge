// create a server: done
// upload the mobile food csv:
// design API: 
/*
- search by name of applicant - optional filter on Status 
- partial search on address 
- Given a latitude and longitude, the API should return the 5 nearest food trucks. By default, this should only return food trucks with status "APPROVED", but the user should be able to override this and search for all statuses.
You can use any external services to help with this (e.g. Google Maps API).



*/


import express from "express";
import { createReadStream } from "fs";
import cors from "cors";
import csv from "csv-parser";

const app = express();
let foodTruckData = []
app.use(cors())

// read CSV data 
createReadStream('./Mobile_Food_Facility_Permit.csv')
    .pipe(csv())
    .on('data', (row) => {
    foodTruckData.push(row)
    })
    .on('end', () => {
    console.log("csv data is processed")
})

app.get("/", (request, response) => {
    response.json("Back end API is running");
});

app.get("/api/foodtrucks", (request, response) => {
    response.json(foodTruckData);
});
// search by applicant and optional status 
app.get("/api/search/applicant", (request, response) => {

    const { name, status } = request.query; 

    if (!name) {
        return response.status(400).json({error: "name parameter is required"})
    }

    // filter by the name and optional 
    let result = foodTruckData.filter(truck => truck.Applicant.toLowerCase().includes(name.toLowerCase()));
    if (status && status.toLowerCase() !== 'all') { 
        result = result.filter(truck=>truck.Status.toLowerCase() === status.toLowerCase())
    }

    response.json(result);
});

// search by address 
app.get("/api/search/address", (request, response) => {
    const { address } = request.query;
    let results = foodTruckData;

    if (address) {
        results = results.filter(truck => truck.Address.toLowerCase().includes(address.toLowerCase()));
    }

    response.json(results);
});

// search by lat + long
app.get("/api/foodtrucks/nearest", (request, response) => {
    const { latitude, longitude, status = 'APPROVED' } = request.query;
    const targetLat = parseFloat(latitude);
    const targetLon = parseFloat(longitude);

    if (!targetLat || !targetLon) {
        return response.status(400).send('Latitude and Longitude are required');
    }
   let results = foodTruckData.map(truck => {
        const truckLat = parseFloat(truck.Latitude);
        const truckLon = parseFloat(truck.Longitude);
        const distance = getDistanceFromLatLonInKm(targetLat, targetLon, truckLat, truckLon);
        return { ...truck, distance };
    });

    results.sort((a, b) => a.distance - b.distance);

    response.json(results.slice(0, 5));
})

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

app.listen(4000, () => {
    console.log("Listen on the port 4000...");
});

export default app;