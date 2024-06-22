import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';

function Footer() {
  return (
    <motion.footer className="footer" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <Container>
        <p>&copy; 2024 Магазин акриловых красок. Все права защищены.</p>
        <Nav>
          <Nav.Link as={Link} to="/ContactForm">Обратная связь</Nav.Link>
        </Nav>
      </Container>
    </motion.footer>
  );
}

export default Footer;