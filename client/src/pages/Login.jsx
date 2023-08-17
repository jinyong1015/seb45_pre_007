import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import OAuthLogin from '../components/login/OAuthLogin.jsx';
import LoginForm from '../components/login/LoginForm.jsx';
import LoginDown from '../components/login/LoginDown.jsx';
import { Link } from 'react-router-dom';
import logo1 from '../assert/logo1.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLawById } from '../redux/api/example.js';

export const Login = () => {
  // const url = process.env.REACT_APP_API_URL;

  // //! http 요청 테스트
  // useEffect(() => {
  //   axios.get(`${url}/designer`).then((res) => console.log(res.data));
  // }, []);

  const { koreaLaws } = useSelector((state) => state.laws);
  console.log(koreaLaws);
  const dispatch = useDispatch();
  const id = 1;

  useEffect(() => {
    dispatch({ type: 'laws/resetLaws' });
    dispatch(fetchLawById(id));
  }, [id, dispatch]);

  return (
    <LoginBox>
      <Logo to="/">
        <img src={logo1} alt="logo" />
      </Logo>
      <div>
        {koreaLaws
          .filter((cur) => cur.id === id)
          .map((cur, idx) => (
            <div key={idx}>
              <div>{cur.content.slice(0, 42)}</div>
            </div>
          ))}
      </div>

      {/* OAuth Login */}
      <OAuthLogin />

      {/* Login Form */}
      <LoginForm />

      {/* Login footer */}
      <LoginDown />
    </LoginBox>
  );
};

const Logo = styled(Link)`
  img {
    cursor: pointer;
    width: 37px;
    height: 37px;

    margin: 0 0 15px 0;
  }
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  padding: 24px;
  background-color: #f2f2f3;
`;

// depth: html, body, #root, App.js, Login
