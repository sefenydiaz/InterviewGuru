import Auth from "../../utils/auth"

const Footer = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <footer className="w-100 mt-auto p-4" >
        <div id="footer" className="container text-center mb-5">
        <h4 id="dino">
            Made with{' '}
            <span
              className="emoji"
              role="img"
              aria-label="dino"
              aria-hidden="false"
            >
              🦕
            </span>{' '}
            
          </h4>   
        </div>
    </footer>
  )
};

export default Footer;
