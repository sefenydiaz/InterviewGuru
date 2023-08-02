import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Input,
  Button,
} from "@chakra-ui/react";

import { useGlobalData } from "../utils/GlobalDataContext";
import { useNavigate } from "react-router-dom";

const ADD_QUESTION = gql`
  mutation AddQuestion(
    $industry: String!
    $role: String!
    $experience: String!
  ) {
    addQuestion(industry: $industry, role: $role, experience: $experience) {
      _id
      question
      industry
      role
      experience
    }
  }
`;

const Form = () => {
  // store form input values
  const [formData, setFormData] = useState({
    industry: "",
    role: "",
    experience: "",
  });

  const [addQuestion, { data, loading, error }] = useMutation(ADD_QUESTION);
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const { updateGlobalData } = useGlobalData();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Form data submitted: ", formData);
    const { data } = await addQuestion({
      variables: {
        industry: formData.industry,
        role: formData.role,
        experience: formData.experience,
      },
    });
    console.log(data);

    updateGlobalData(data.addQuestion);

    navigate("/questions");
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <FormControl id="industry" isRequired>
          <FormLabel>Industry</FormLabel>
          <Select
            placeholder="Select Industry"
            onChange={handleInputChange}
            name="industry"
            value={formData.industry}
          >
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
        <FormControl id="role" isRequired>
          <FormLabel>Role</FormLabel>
          <Input
            placeholder="Role"
            onChange={handleInputChange}
            name="role"
            value={formData.role}
          />
        </FormControl>
        <FormControl id="experience" isRequired>
          <FormLabel>Experience</FormLabel>
          <Select
            placeholder="Select Experience Level"
            onChange={handleInputChange}
            name="experience"
            value={formData.experience}
          >
            <option>Internship</option>
            <option>Entry Level</option>
            <option>Associate</option>
            <option>Senior</option>
            <option>Director</option>
            <option>Executive</option>
          </Select>
        </FormControl>
        <Button type="submit" size="lg">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;
