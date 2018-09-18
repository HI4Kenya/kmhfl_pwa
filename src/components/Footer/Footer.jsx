import React from "react";
import { Container } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";
import logo from "kenya-coat-of-arms.png";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <nav>
            <ul>              
              <li>
                <a
                  href="https://kmhfl.health.go.ke"
                  className="simple-text logo-mini"
                >
                  <div className="logo-img">
                    <img src={logo} alt="coat-of-arms" />
                  </div>
                </a>
              </li>
              {/* <li>
                <a href="https://kmhfl.health.go.ke">Kenya Master Health Facility List</a>
              </li>
              <li>
                <a href="https://kmhfl.health.go.ke">Ministry of Health</a>
              </li> */}
              {/* <li>
                <a href="https://blog.creative-tim.com">Blog</a>
              </li> */}
            </ul>
          </nav>
          <div>
            {/* &copy; {1900 + new Date().getYear()}, Designed by{" "}
            <a
              href="https://www.invisionapp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Invision
            </a>. Coded by{" "}
            <a
              href="https://www.creative-tim.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Creative Tim
            </a>. */}
          </div>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
