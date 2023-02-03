import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';
import styled from 'styled-components';
import FormRow from '../components/FormRow';
import Navbar from '../components/Navbar';

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    company: '',
    position: '',
    status: '',
  });
  const {
    fetchSingleJob,
    editItem,
    isLoading,
    singleJobError: error,
    editComplete,
    editJob,
    showAlert,
    alertMessage,
    user,
  } = useGlobalContext();

  useEffect(() => {
    fetchSingleJob(id);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (editItem) {
      const { company, position, status } = editItem;
      setValues({ company, position, status });
    }
  }, [editItem]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [user]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { company, position, status } = values;
    if (company && position) {
      editJob(id, { company, position, status });
    }
  };

  if (isLoading && !editItem) {
    return <div className="loading"></div>;
  }

  if (!editItem || error) {
    return (
      <ErrorContainer className="page">
        <h5>There was an error, please double check your job ID</h5>
        <Link to="/dashboard" className="btn">
          dashboard
        </Link>
      </ErrorContainer>
    );
  }

  return (
    <>
      <Navbar />
      <Container className="page">
        {showAlert && (
          <div className="alert alert-danger">
            {alertMessage || 'there was an error, please try again'}
          </div>
        )}
        <header>
          <Link to="/dashboard" className="btn btn-block back-home">
            back home
          </Link>
        </header>
        <form className="form" onSubmit={handleSubmit}>
          <p>{editComplete && !showAlert && 'Success! Edit Complete'}</p>
          <h4>Update Job</h4>
          {/* position field */}
          <div className="form-container">
            <FormRow
              type="text"
              name="position"
              value={values.position}
              handleChange={handleChange}
            />
            {/* company field */}
            <FormRow
              type="text"
              name="company"
              value={values.company}
              handleChange={handleChange}
            />
            <div className="form-row">
              <label htmlFor="status" className="form-label">
                status
              </label>
              <select
                name="status"
                id="status"
                value={values.status}
                onChange={handleChange}
                className="status"
              >
                <option value="pending">pending</option>
                <option value="interview">interview</option>
                <option value="declined">declined</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Editing...' : 'Edit'}
            </button>
          </div>
        </form>
      </Container>
    </>
  );
}

const ErrorContainer = styled.section`
  text-align: center;
  padding-top: 6rem;
`;

const Container = styled.section`
  header {
    margin-top: 4rem;
  }
  .back-home {
    text-align: center;
    display: block;
    width: 100%;
    font-size: 1rem;
    line-height: 1.15;
    background: var(--black);
  }
  .back-home:hover {
    background: var(--grey-500);
  }
  .form {
    max-width: var(--max-width);
    margin-top: 2rem;
  }
  .form > p {
    text-align: center;
    color: var(--green-dark);
    letter-spacing: var(--letterSpacing);
    margin-top: 0;
  }
  .form > h4 {
    text-align: center;
  }
  .status {
    background: var(--grey-100);
    border-radius: var(--borderRadius);
    border-color: transparent;
    padding: 0.25rem;
  }

  @media (min-width: 768px) {
    .back-home {
      width: 200px;
    }
    .form > h4,
    .form > p {
      text-align: left;
    }

    .form-container {
      display: grid;
      grid-template-columns: 1fr 1fr 100px auto;
      column-gap: 0.5rem;
      align-items: center;
    }
    .form-row {
      margin-bottom: 0;
    }
    .submit-btn {
      align-self: end;
    }
  }
`;

export default Edit;
