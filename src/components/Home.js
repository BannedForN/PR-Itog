import React from 'react';
import ProductList from './ProductList';
import ContactForm from './ContactForm';
import { Container, Row, Col } from 'react-bootstrap';

function Home() {
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Добро пожаловать в магазин акриловых красок для моделизма</h2>
          <p>Мы предлагаем широкий выбор красок разных производителей.</p>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <h3>Популярные товары</h3>
          <ProductList limit={10} />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
