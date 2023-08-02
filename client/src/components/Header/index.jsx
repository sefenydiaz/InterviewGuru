// INCLUDE NAVIGATION THAT INCLUDES: Stats, Home, Form(New Interview)

import { Button, ButtonGroup, chakra } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import '../../assets/header.css'

import Auth from "../../utils/auth";

  const imgStyle = {
    width: '450px',
    height: 'auto',
    borderRadius: '8px',
  }

  const HoverColorButton = chakra(Button, {
    baseStyle: {
      transition: 'background-color 0.3s ease',
      _hover: { backgroundColor: '#96D1AD' }, 
    },
  });


const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header id="header" className="bg-secondary text-light mb-4 py-3 flex-row align-center" >
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/form">
            <img src={logo} alt="InterviewGuru" style={imgStyle} />
          </Link>
          <p className="m-0" id="slogan">
            AI generated interview questions to land your next gig.
          </p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              {/* <span>Hey there, {Auth.getProfile().data.username}!</span> */}
              <Link to="/login">
                <button className="btn btn-lg btn-light m-2" onClick={logout}>
                  Logout
                </button>
              </Link>
            </>
          ) : (
            <>
              <ButtonGroup variant="outline" spacing="6">
                <HoverColorButton colorScheme="6B818C">
                  <Link to="/login">Login</Link>
                </HoverColorButton>
                <HoverColorButton colorScheme="6B818C">
                  <Link to="/signup">Signup</Link>
                </HoverColorButton>
              </ButtonGroup>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
