import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { useGlobalData } from "../utils/GlobalDataContext";
import { useNavigate } from "react-router-dom";

const GET_FEEDBACK = gql `
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
}`
const Feedback = () => {
  const [getFeedback, { data, loading, error}] = useMutation(GET_FEEDBACK);
  const navigate = useNavigate();

  const { updateGlobalData, globalData } = useGlobalData();

const showFeedback = async () => {
  const { data } = await getFeedback({ 
    variables: {
      id: globalData._id
    }
  })
  updateGlobalData(data.getFeedback)
}

  useEffect(() => {
  showFeedback()
  }, []);

  if (loading) {
    return <h2>Loading...</h2>
  }


return(
  
  <div>
    <h2>Feedback:</h2>
    <p>{globalData.feedback}</p>
    <Button>
      <Link to='/form'>Ask another question...</Link>
    </Button>
    <Button>
      <Link to='/home'>Exit:</Link>
    </Button>
  </div>
  )
};

export default Feedback;
