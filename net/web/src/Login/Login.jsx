import React from 'react'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useLogin } from './useLogin.hook';
import { LoginWrapper, LoginInput, LoginPassword, LoginCreate, LoginEnter, LoginSpin } from './Login.styled';

export function Login(props) {

  const { state, actions } = useLogin()

  return(
    <LoginWrapper>
      <div class="container">
        <div class="header">indicom</div>
        <div class="subheader">
          <span class="subheader-text">Communication for the Decentralized Web</span>
        </div>
        <LoginInput size="large" spellCheck="false" placeholder="username" prefix={<UserOutlined />}
          onChange={(e) => actions.setUsername(e.target.value)} value={state.username} />
        <LoginPassword size="large" spellCheck="false" placeholder="password" prefix={<LockOutlined />}
          onChange={(e) => actions.setPassword(e.target.value)} value={state.password} />
        <LoginEnter type="primary" onClick={() => actions.onLogin()} disabled={actions.isDisabled()}>
          <span>Sign In</span>
        </LoginEnter>
      </div>
      <LoginCreate type="link" onClick={() => actions.onCreate()} disabled={!state.available}>
        <span>Create Account</span>
      </LoginCreate>
      <LoginSpin size="large" spinning={state.spinning} />
    </LoginWrapper>
  );
}
