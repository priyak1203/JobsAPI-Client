import { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import FormRow from '../components/FormRow';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    isMember: true,
  });

  const handleChange = (e) => {
    console.log(e.target);
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className="page full-page">
      <form className="form">
        <img src={logo} alt="jobio" className="logo" />
        <h4>{values.isMember ? 'Login' : 'Register'}</h4>
        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        {/* password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;

  .form {
    max-width: 400;
    border-top: 5px solid var(--primary-500);
  }
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  h4 {
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
  }
`;

export default Register;
