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
  Spinner,
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

const ADD_QUESTION_TO_USER = gql`
  mutation AddQuestionToUser($userId: String!, $questionId: String!) {
    addQuestionToUser(userId: $userId, questionId: $questionId) {
      _id
      email
      name
      password
      questions {
        _id
        question
        answer
        feedback
        industry
        role
        experience
      }
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
  const [addQuestionToUser, { data, loading, error }] =
    useMutation(ADD_QUESTION_TO_USER);
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

  const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "10+"];

  if (loading) {
    return (
      <Spinner
        data-test="loading-spinner"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#96D1AD"
        size="xl"
      />
    );
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <FormControl data-test="industry-input" id="industry" isRequired>
          <FormLabel>Industry:</FormLabel>
          <Input
            placeholder="Select Industry"
            onChange={handleInputChange}
            name="industry"
            value={formData.industry}
          />
        </FormControl>
        <FormControl data-test="role-input" id="role" isRequired>
          <FormLabel>Role:</FormLabel>
          <Input
            placeholder="Role"
            onChange={handleInputChange}
            name="role"
            value={formData.role}
          />
        </FormControl>
        <FormControl data-test="experience-dropdown" id="experience" isRequired>
          <FormLabel>Years Experience:</FormLabel>
          <Select
            placeholder="Select Experience Level..."
            onChange={handleInputChange}
            name="experience"
            value={formData.experience}
          >
            {options.map((option, index) => {
              return (
                <option
                  data-test={`experience-option-${index}`}
                  key={index}
                  value={option}
                >
                  {option}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <Button data-test="submit-button" type="submit" size="lg" my={3}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;
