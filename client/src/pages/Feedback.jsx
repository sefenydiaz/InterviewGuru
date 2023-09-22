import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useGlobalData } from "../utils/GlobalDataContext";
import { useNavigate } from "react-router-dom";

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

const GET_FEEDBACK = gql`
  mutation GetFeedback($id: String!) {
    getFeedback(_id: $id) {
      _id
      question
      answer
      industry
      role
      experience
      feedback
    }
  }
`;

const Feedback = () => {
  const [getFeedback, { data, loading, error }] = useMutation(GET_FEEDBACK);

  const { updateGlobalData, globalData } = useGlobalData();

  const showFeedback = async () => {
    const { data } = await getFeedback({
      variables: {
        id: globalData._id,
      },
    });
    updateGlobalData(data.getFeedback);
  };

  useEffect(() => {
    showFeedback();
  }, []);

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
      <h2 data-test="feedback-header">Feedback:</h2>
      <p data-test="feedback-data">{globalData.feedback}</p>
      <Button data-test="submit-button">
        <Link to="/home">Exit to Home</Link>
      </Button>
    </div>
  );
};

export default Feedback;
