import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SubmitBtn, TextInput } from '../../Styles';

const RegistForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  background-color: #eeeff1;
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  padding: 20px;
  text-align: center;
  border: none;
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin-bottom: 20px;
  .message {
    font-weight: 500;
    font-size: 10px;
    line-height: 24px;
    letter-spacing: -1px;
    position: absolute;
    bottom: -15px;
    left: 0;
    &.success {
      color: #1bbc9b;
    }
    &.error {
      color: #ff2727;
    }
  }
  .submitBtn {
    &.success {
      background-color: #1bbc9b;
    }
    &.error {
      background-color: red;
    }
  }
`;

const CheckButton = styled.button`
  font-size: 13px;
  border: none;
  background-color: #1bbc9b;
  color: white;
  height: 45px;
`;

function Register() {
  let navigate = useNavigate();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [nameMessage, setNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setpasswordConfirmMessage] = useState('');

  const [isAccount, setIsAccount] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const onChangeId = (e) => {
    setAccount(e.target.value);
  };
  const onChangeName = useCallback((e) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMessage('2?????? ?????? 5?????? ???????????? ??????????????????.');
      setIsName(false);
    } else {
      setNameMessage('????????? ?????? ???????????????');
      setIsName(true);
    }
  }, []);
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);
    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('???????????? ?????? ????????? ???????????????.');
      setIsEmail(false);
    } else {
      setEmailMessage('????????? ????????? ???????????????.');
      setIsEmail(true);
    }
  }, []);
  const onChangePassword = useCallback((e) => {
    const passwrodRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwrodCurrent = e.target.value;
    setPassword(passwrodCurrent);
    if (!passwrodRegex.test(passwrodCurrent)) {
      setPasswordMessage(
        '??????+?????????+???????????? ???????????? 8?????? ?????? ??????????????????.'
      );
      setIsPassword(false);
    } else {
      setPasswordMessage('????????? ???????????? ?????????.');
      setIsPassword(true);
    }
  }, []);
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);
      if (password === passwordConfirmCurrent) {
        setpasswordConfirmMessage('??????????????? ???????????????.');
        setIsPasswordConfirm(true);
      } else {
        setpasswordConfirmMessage('??????????????? ???????????? ????????????.');
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );
  const url = '210.91.148.88';
  //210.91.148.88
  const checkAccountDuplicate = useCallback(async () => {
    await axios
      .get(`http://${url}:3000/member/checkAccount/${account}`)
      .then((res) => {
        if (!res.data.result) {
          alert('????????? ?????? ?????????.');
        } else alert('?????? ????????? ?????? ?????????.');
        setIsAccount(res.data.result);
      });
  }, [account]);
  const onSubmitRegist = useCallback(async () => {
    await axios
      .post(`http://${url}:3000/member/join`, {
        name: name,
        account: account,
        password: password,
        email: email,
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data) {
          alert('??????????????? ?????????????????????.');
        }
        navigate('/Login', { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [name, account, password, email, navigate]);
  return (
    <RegistForm>
      <h2>????????????</h2>
      <FormBox>
        <TextInput
          type="text"
          name="account"
          placeholder="?????????"
          autoComplete="off"
          onChange={onChangeId}
          style={{
            width: '70%',
            marginRight: '10px',
          }}
        />
        <CheckButton onClick={checkAccountDuplicate}>????????????</CheckButton>
      </FormBox>
      <FormBox>
        <TextInput
          type="password"
          name="password"
          placeholder="????????????"
          onChange={onChangePassword}
          style={{ border: `1px solid ${account.color}` }}
        />
        {password.length > 0 && (
          <span className={`message ${isPassword ? 'success' : 'error'}`}>
            {passwordMessage}
          </span>
        )}
      </FormBox>
      <FormBox>
        <TextInput
          type="password"
          name="password"
          placeholder="???????????? ??????"
          onChange={onChangePasswordConfirm}
        />
        {passwordConfirm.length > 0 && (
          <span
            className={`message ${isPasswordConfirm ? 'success' : 'error'}`}
          >
            {passwordConfirmMessage}
          </span>
        )}
      </FormBox>
      <FormBox>
        <TextInput
          type="text"
          name="name"
          placeholder="??????"
          autoComplete="off"
          onChange={onChangeName}
        />
        {name.length > 0 && (
          <span className={`message ${isName ? 'success' : 'error'}`}>
            {nameMessage}
          </span>
        )}
      </FormBox>

      <FormBox>
        <TextInput
          type="email"
          name="email"
          placeholder="e-mail"
          autoComplete="off"
          onChange={onChangeEmail}
        />
        {email.length > 0 && (
          <span className={`message ${isEmail ? 'success' : 'error'}`}>
            {emailMessage}
          </span>
        )}
      </FormBox>
      <FormBox>
        <SubmitBtn
          type="submit"
          value="REGIST"
          disabled={
            !(isName && isEmail && isPassword && isPasswordConfirm && isAccount)
          }
          className={`submitBtn ${
            !(isName && isEmail && isPassword && isPasswordConfirm && isAccount)
              ? 'error'
              : 'success'
          }`}
          onClick={onSubmitRegist}
        />
      </FormBox>
    </RegistForm>
  );
}

export default React.memo(Register);
