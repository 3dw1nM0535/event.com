// Authenticated & Unauthenticated user top bar navigation
import React from "react";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import * as actions from "../../actions/authUser";

class TopNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "Home",
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { logout, user } = this.props;
    const { activeItem } = this.state;

    const trigger = (
      <Image avatar src={user.imageURL} />
    );

    const text = (
      <span>Signed in as <strong>{user.fullname}</strong></span>
    );

    return (
      <Menu secondary>
          <Menu.Menu position="right">
            <Menu.Item as={Link} active={activeItem === "Home"} to="/dashboard" name="Home" onClick={this.handleItemClick} />
            <Dropdown trigger="Notifications" pointing="top right" className="link item" icon={null} />
            <Dropdown trigger={trigger} pointing="top right" className="link item" icon={null}>
              <Dropdown.Menu>
                <Dropdown.Item text={text} disabled />
                <Dropdown.Item as={Link} to="/profile" text="Profile" icon="user" name="Profile" active={activeItem === "Profile"} onClick={this.handleItemClick} />
								<Dropdown.Item as={Link} to="/profile/settings" text="Settings" icon="settings" name="Settings" active={activeItem === "Settings"} onClick={this.handleItemClick} />
                <Dropdown.Item text="Logout" onClick={() => logout()} icon="sign out"/>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

TopNavigation.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    imageURL: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, { logout: actions.logout })(TopNavigation);
