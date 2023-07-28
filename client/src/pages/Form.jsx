import { useState } from 'react';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select
} from '@chakra-ui/react'


const Form = () => {
 //store form input values
 const [formData, setFormData] = useState({
  industry: '',
  role: '',
  experience: '',
 })

 const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
 }

 const handleFormSubmit = (event) => {
  event.preventDefault();
  console.log('Form data submitted: ', formData)
 }
  return(
    <div>
      <form onSubmit={handleFormSubmit}>
        <FormControl id="industry" isRequired>
          <FormLabel>Industry</FormLabel>
            <Select placeholder='Select Industry'>
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Finance</option>
              <option>Education</option>
              <option>Retail</option>
              <option>Manufactoring</option>
              <option>Energy</option>
              <option>Media & Entertainment</option>
              <option>Government & Public Services</option>
            </Select>
        </FormControl>
      </form>
    </div>
    )


}



export default Form;
/*
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_TECH } from '../utils/queries';
import { CREATE_MATCHUP } from '../utils/mutations';

const Matchup = () => {
  const { loading, data } = useQuery(QUERY_TECH);

  const techList = data?.tech || [];

  const [formData, setFormData] = useState({
    tech1: 'JavaScript',
    tech2: 'JavaScript',
  });
  let navigate = useNavigate();

  const [createMatchup, { error }] = useMutation(CREATE_MATCHUP);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createMatchup({
        variables: { ...formData },
      });

      navigate(`/matchup/${data.createMatchup._id}`);
    } catch (err) {
      console.error(err);
    }

    setFormData({
      tech1: 'JavaScript',
      tech2: 'JavaScript',
    });
  };

  return (
    <div className="card bg-white card-rounded w-25">
      <div className="card-header bg-dark text-center">
        <h1>Let's create a matchup!</h1>
      </div>
      <div className="card-body m-5">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <label>Tech 1: </label>
            <select name="tech1" onChange={handleInputChange}>
              {techList.map((tech) => {
                return (
                  <option key={tech._id} value={tech.name}>
                    {tech.name}
                  </option>
                );
              })}
            </select>
            <label>Tech 2: </label>
            <select name="tech2" onChange={handleInputChange}>
              {techList.map((tech) => {
                return (
                  <option key={tech._id} value={tech.name}>
                    {tech.name}
                  </option>
                );
              })}
            </select>
            <button className="btn btn-danger" type="submit">
              Create Matchup!
            </button>
          </form>
        )}
      </div>
      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default Matchup;

*/
