import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Jobs from '../components/Jobs';
import FormRow from '../components/FormRow';
import styled from 'styled-components';
import { useGlobalContext } from '../context/appContext';

function Dashboard() {
  const [values, setValues] = useState({ position: '', company: '' });

  const { isLoading, showAlert, alertMessage, fetchJobs, createjob } =
    useGlobalContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { company, position } = values;
    if (company && position) {
      createjob(values);
      setValues({ company: '', position: '' });
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <Navbar />
      <Wrapper className="page">
        {showAlert && <div className="alert alert-danger">{alertMessage}</div>}
        <form className="job-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? 'Adding New Job...' : 'Add Job'}
          </button>
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

  .alert {
    max-width: var(--max-width);
    margin-bottom: 1rem;
  }
`;

export default Dashboard;
