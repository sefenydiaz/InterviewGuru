import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

import { useGlobalData } from "../utils/GlobalDataContext";
import { useNavigate } from "react-router-dom";

const GET_FEEDBACK = gql `
mutation getFeedback(
  
)`
const Feedback = () => {
  <div>
    <h2>Feedback:</h2>
    <p>This is the feedback.</p>
    <Button>
      <Link>Ask another question...</Link>
    </Button>
    <Button>
      <Link>Exit:</Link>
    </Button>
  </div>;
};

export default Feedback;
