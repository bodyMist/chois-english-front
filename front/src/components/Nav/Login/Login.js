import React from 'react';
import styled from 'styled-components';
import { useMenuDispatch } from '../../../MenuContext';
import { StyledLink, TextInput, SubmitBtn, SubmitForm } from '../../Styles';
const LoginForm = styled.div`
  width: 300px;
  background-color: #eeeff1;
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  padding: 20px;
  text-align: center;
  border: none;
`;
function Login() {
  const dispatch = useMenuDispatch();
  return (
    <LoginForm>
      <h2>Login</h2>
      <TextInput type="text" name="email" placeholder="ID"></TextInput>
      <TextInput type="text" name="email" placeholder="PW"></TextInput>
      <SubmitForm>
        <SubmitBtn type="submit" value="Login" />
        <StyledLink
          to="/register"
          style={{
            fontSize: '1rem',
            border: 'none',
            padding: '10px',
            backgroundColor: '#1bbc9b',
            marginBottom: '10px',
            color: 'white',
          }}
          onClick={() => dispatch({ type: 'RESET' })}
        >
          회원가입
        </StyledLink>
      </SubmitForm>
    </LoginForm>
  );
}

export default Login;
