import { Container, Row, Col, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import axios from 'axios';

function Catalog() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/products').then((response) => {
      const products = response.data;
      const uniqueCategories = [...new Set(products.map(product => product.category))];
      setCategories(uniqueCategories);
    });
  }, []);

  return (
    <Container>
      <Row className="my-4" >
        <Col>
          <h2>Каталог</h2>
          <Form>
            <Form.Group controlId="search" className="mt-3">
              <Form.Label>Поиск</Form.Label>
              <Form.Control type="text" placeholder="Найти..." value={searchTerm} onChange={e =>
                  setSearchTerm(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="category" className="mt-3">
              <Form.Label>Категория</Form.Label>
              <Form.Control as="select" value={selectedCategory} onChange={e =>
                  setSelectedCategory(e.target.value)}>
                <option value="">Все</option> {categories.map((category, index) =>
                    (<option key={index} value={category}>{category}</option>))}
              </Form.Control>
            </Form.Group>
          </Form>
          <ProductList searchTerm={searchTerm} category={selectedCategory}/>
        </Col>
      </Row>
    </Container>
  );
}

export default Catalog;
