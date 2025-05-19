import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0d1b2a;
`;

const LoginCard = styled.div`
  background-color: #1b263b;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  text-align: center;
  color: #e0e1dd;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #e0e1dd;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #415a77;
  border-radius: 5px;
  background-color: #0d1b2a;
  color: #e0e1dd;
  outline: none;
  
  &:focus {
    border-color: #778da9;
  }
`;

const Button = styled.button`
  padding: 0.8rem;
  background-color: #415a77;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 0.5rem;
  
  &:hover {
    background-color: #778da9;
  }
`;

const ErrorMessage = styled.p`
  color: #e63946;
  font-size: 0.9rem;
  text-align: center;
`;

const RegisterLink = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #e0e1dd;
  font-size: 0.9rem;
  
  a {
    color: #778da9;
    text-decoration: none;
    font-weight: bold;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/");
      } else {
        setError("Login gagal. Periksa email dan password Anda.");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi nanti.");
      console.error(err);
    }
  };

  return (
    <Container>
      <LoginCard>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </InputGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Login</Button>
        </Form>
        <RegisterLink>
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </RegisterLink>
      </LoginCard>
    </Container>
  );
};

export default LoginPage;