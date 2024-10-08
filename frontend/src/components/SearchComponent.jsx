import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Table, Container } from 'react-bootstrap';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('APPROVED');
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState('name');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const performSearch = async () => {
    let apiUrl = '';
    let params = {};

    if (searchType === 'name') {
      apiUrl = 'http://localhost:4000/api/search/applicant';
      params = { name: query };
    } else if (searchType === 'address') {
      apiUrl = 'http://localhost:4000/api/search/address';
      params = { address: query };
    } else if (searchType === 'location') {
      apiUrl = 'http://localhost:4000/api/foodtrucks/nearest';
      params = { latitude, longitude, status };
    }

    try {
      const response = await axios.get(apiUrl, { params });
      setResults(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderSearchFields = () => {
    if (searchType === 'location') {
      return (
        <>
          <Form.Group controlId="latitude" className="form-group">
            <Form.Label className="form-label">Latitude</Form.Label>
            <Form.Control
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Enter latitude"
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="longitude" className="form-group">
            <Form.Label className="form-label">Longitude</Form.Label>
            <Form.Control
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="Enter longitude"
              className="form-control"
            />
          </Form.Group>
        </>
      );
    } else {
      return (
        <Form.Group controlId="query" className="form-group">
          <Form.Label className="form-label">Search Query</Form.Label>
          <Form.Control
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search by ${searchType}`}
            className="form-control"
          />
        </Form.Group>
      );
    }
  };

  return (
    <Container className="form-container">
      <Form>
        <Form.Group controlId="searchType" className="form-group">
          <Form.Label className="form-label">Search By</Form.Label>
          <Form.Control
            as="select"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="form-control"
          >
            <option value="name">Applicant Name</option>
            <option value="address">Street Address</option>
            <option value="location">Latitude & Longitude</option>
          </Form.Control>
        </Form.Group>
        {renderSearchFields()}
        {searchType === 'location' && (
          <Form.Group controlId="status" className="form-group">
            <Form.Label className="form-label">Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-control"
            >
              <option value="APPROVED">Approved</option>
              <option value="ALL">All</option>
            </Form.Control>
          </Form.Group>
        )}
        <Button variant="primary" onClick={performSearch}>
          Search
        </Button>
      </Form>
      <div id="results" className="mt-4">
        {results.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Address</th>
                <th>Status</th>
                <th>Distance</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr key={index}>
                  <td>{item.Applicant}</td>
                  <td>{item.Address}</td>
                  <td>{item.Status}</td>
                  <td>{item.distance || '-'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </Container>
  );
};

export default SearchComponent;
