import styled from 'styled-components';

const Orb = styled.div`
  display: block;
  position: relative;
  cursor: above;
  width: 15em;
  height: 15em;
  top: 50%;
  margin: -7.5em auto;
  border-radius: 50%;
  box-shadow: 0 3em 2.5em -2.5em rgba(53, 64, 73, 0.6),
    0 0 1em -0.35em rgba(255, 255, 255, 0.2),
    0 -1em 1.1em 0 rgba(255, 255, 255, 0.5) inset,
    0 0 2.5em 0 rgba(0, 0, 0, 0.4) inset;
  background: radial-gradient(
      circle at 33% -25%,
      rgba(255, 255, 255, 0) 40%,
      rgba(0, 0, 0, 0.07) 50%
    ),
    radial-gradient(
      circle at 50% 135%,
      rgba(0, 0, 0, 0.23) 43%,
      rgba(255, 255, 255, 0)
    ),
    radial-gradient(
      circle at 50% -35%,
      rgba(255, 255, 255, 0.8) 45%,
      rgba(255, 255, 255, 0)
    ),
    radial-gradient(circle at 50% 0, #ffffff, #d5d5d5);
  background-size: 150%, 100%, 100%, 100%;

  &:hover {
    transform: scale(1.2, 1.2);
  }
`;

export default Orb;
