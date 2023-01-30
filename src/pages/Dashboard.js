import { useState } from 'react';
import Navbar from '../components/Navbar';
import Jobs from '../components/Jobs';
import FormRow from '../components/FormRow';
import styled from 'styled-components';

function Dashboard() {
  const [values, setValues] = useState({ position: '', company: '' });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <Wrapper className="page">
        <form className="job-form">
          {/* position field */}
          <FormRow
            type="text"
            name="position"
            value={values.position}
            handleChange={handleChange}
            horizontal
            placeholder="Position"
          />
          {/* company field */}
          <FormRow
            type="text"
            name="company"
            value={values.company}
            handleChange={handleChange}
            horizontal
            placeholder="Company"
          />
          <button className="btn">Add Job</button>
        </form>
        <Jobs />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  padding: 3rem 0;

  .job-form {
    background: var(--white);
    display: grid;
    row-gap: 1rem;
    column-gap: 0.5rem;
    align-items: center;
    margin-bottom: 3rem;
    border-radius: var(--borderRadius);
    padding: 1.5rem;

    .form-input {
      padding: 0.75rem;
    }
    .form-input:focus {
      outline: 1px solid var(--primary-500);
    }
    .form-row {
      margin-bottom: 0;
    }
    .btn {
      padding: 0.75rem;
    }

    @media (min-width: 776px) {
      grid-template-columns: 1fr 1fr auto;
      .btn {
        height: 100%;
        padding: 0 2rem;
      }
      column-gap: 2rem;
    }
  }
`;

export default Dashboard;
