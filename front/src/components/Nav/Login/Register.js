import React from 'react';
import styled from 'styled-components';

const RegistForm = styled.div`
  width: 300px;
  background-color: #eeeff1;
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  padding: 20px;
  text-align: center;
  border: none;
`;

function Register() {
  return (
    <RegistForm>
      <h2>회원가입</h2>
    </RegistForm>
  );
}

export default Register;
