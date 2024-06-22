import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'creditCard'
  })
  const orderData = { cart, total, ...formData };

  useEffect(() => {
    axios.get('http://localhost:5000/cart')
      .then(response => {
        setCart(response.data);
        updateTotal(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  const updateTotal = (cartItems) => {
    const totalCost = cartItems.reduce((sum, product) => sum + (parseFloat(product.price) * parseInt(product.quantity, 10)), 0);
    setTotal(isNaN(totalCost) ? 0 : totalCost);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/submit-order', orderData)
      .then(response => {
        console.log('Order submitted:', response.data);
      })
      .catch(error => {
        console.error('Error submitting order:', error);
      });
  };
  
  emailjs.send('service_vz523qq', 'template_ri9a7is', orderData, 'VJivWFbU_W2hevYL9')
  .then((response) => {
    console.log('Сообщение отправлено успешно!', response.status, response.text);
  }, (error) => {
    console.error('Ошибка при отправке сообщения.', error);
  });

  return (
    <motion.div className="d-flex flex-column flex-grow-1"
      initial={{ y: '-100vh' }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 50, duration: 1.5 }}>
      <Container>
        <Row className="my-4 flex-grow-1">
          <Col>
            <h2>Оформление заказа</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Имя</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label>Адрес</Form.Label>
                <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formPaymentMethod">
                <Form.Label>Метод оплаты</Form.Label>
                <Form.Control as="select" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                  <option value="creditCard">Кредитная карта</option>
                  <option value="paypal">PayPal</option>
                  <option value="cashOnDelivery">Наложенный платеж</option>
                </Form.Control>
              </Form.Group>
              <h3>Итоговая сумма: ₽{total.toFixed(2)}</h3>
              <Button variant="primary" type="submit" className="mt-2">Подтвердить заказ</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default Checkout;
