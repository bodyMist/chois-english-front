import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    color: black;
    text-decoration: none;
  }
`;
export const TextInput = styled.input`
  font-size: 1rem;
  padding: 10px;
  border: none;
  width: 260px;
  margin-bottom: 10px;
`;
export const SubmitForm = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  border: none;
  padding: 10px;
  width: 280px;
  margin-bottom: 10px;
  color: white;
`;
export const SubmitBtn = styled.input`
  font-size: 1rem;
  border: none;
  padding: 10px;
  background-color: #1bbc9b;
  margin-bottom: 10px;
  color: white;
`;

export const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
