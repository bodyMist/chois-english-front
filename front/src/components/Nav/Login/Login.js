import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useMenuDispatch } from '../../../MenuContext';
import { useUserDispatch } from '../../../UserContext';
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
  const menuDispatch = useMenuDispatch();
  const userDispatch = useUserDispatch();
  const [account, setAccount] = useState({
    account: '',
    password: '',
  });

  const navigate = useNavigate();

  const onChangeAccount = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitAccount = useCallback(async () => {
    await axios
      .post('http://localhost:3000/member/login', {
        account: account.account,
        password: account.password,
      })
      .then((res) => {
        const data = res.data;
        if (data) {
          userDispatch({ type: 'LOGIN', data });
          navigate('/', { replace: true });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, [account]);

  return (
    <LoginForm>
      <h2>Login</h2>
      <TextInput
        type="text"
        name="account"
        placeholder="ID"
        onChange={onChangeAccount}
      ></TextInput>
      <TextInput
        type="password"
        name="password"
        placeholder="PW"
        onChange={onChangeAccount}
      ></TextInput>
      <SubmitForm>
        <SubmitBtn type="submit" value="Login" onClick={onSubmitAccount} />
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
          onClick={() => menuDispatch({ type: 'RESET' })}
        >
          Regist
        </StyledLink>
      </SubmitForm>
    </LoginForm>
  );
}

export default React.memo(Login);
