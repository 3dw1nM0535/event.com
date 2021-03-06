import React from "react";
import { Form, Button, Message, Card, Header } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import PropTypes from "prop-types";

import InlineError from "../messages/InlineError";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
      },
      loading: false,
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch(err =>
        this.setState({ errors: err.response.data.errors, loading: false }));
    }
  }

  validate = (data) => {
    const errors = {};

    if (!data.email) errors.email = "Can't be Blank";
    if (!isEmail(data.email)) errors.email = "Invalid Email";
    if (!data.password) errors.password = "Can't be Blank";

    return errors;
  }

  render() {
    const { data, loading, errors } = this.state;
    return (
			<Card fluid centered>
        <Card.Content>
          <Card.Header>Login</Card.Header>
        </Card.Content>
				<Card.Content>
          <Form unstackable={false} onSubmit={this.onSubmit} loading={loading} size="small">
            {errors.global && <Message negative>
                <Message.Header>Something went wrong</Message.Header>
                <p>{errors.global}</p>
              </Message>}
            <Form.Field error={!!errors.email}>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder="example@email.com" onChange={this.onChange} value={data.email} />
              {errors.email && <InlineError text={errors.email} />}
            </Form.Field>
            <Form.Field error={!!errors.password}>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} value={data.password} />
              {errors.password && <InlineError text={errors.password} />}
            </Form.Field>
            <Button size="small" color="green">Login</Button>
          </Form>
        </Card.Content>
			</Card>
		);
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default LoginForm;
