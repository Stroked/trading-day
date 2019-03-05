import React from "react";
import styled from "styled-components";
import { withScreenSize } from "@vx/responsive";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import { LinearGradient } from "@vx/gradient";

function Background({ width, height }) {
  return (
    <svg width={width} height={height}>
      <LinearGradient id='bg' vertical={false}>
        <stop stopColor='#a943e4' offset='0%' />
        <stop stopColor='#f55989' offset='50%' />
        <stop stopColor='#ffaf84' offset='100%' />
      </LinearGradient>
      <rect width={width} height={height} fill='url(#bg)' />
    </svg>
  );
}
const LoginStyleWrapper = styled.div`
  body > div,
  body > div > div,
  body > div > div > div.login-form {
    height: 100%;
  }
  .login-form,
  .center {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    display: flex;
    font-family: arial;
    flex-direction: column;
  }
  grid {
    color: white;
    background-color: #27273f;
    border-radius: 6px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
  }
`;
class Login extends React.Component {
  render() {
    const { screenWidth, screenHeight } = this.props;

    return (
      <LoginStyleWrapper className='login-form'>
        <Background width={screenWidth} height={screenHeight} />
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <div className='center'>
          {/* <BitcoinPrice
            data={data}
         
          />
          <p className='disclaimer'>{data.disclaimer}</p> */}
          <Grid
            textAlign='center'
            style={{ height: { screenHeight } }}
            verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                <Image src='/logo.png' /> Log-in to your account
              </Header>
              <Form size='large'>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='E-mail address'
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                  />

                  <Button color='teal' fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? <a href='#'>Sign Up</a>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </LoginStyleWrapper>
    );
  }
}
export default withScreenSize(Login);
