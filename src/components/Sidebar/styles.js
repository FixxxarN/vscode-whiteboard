import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;
  padding: 0.5rem;
  top: 50%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  left: 0px;
  transform: translate(0px, -50%);
  z-index: 3;
  background: #fff;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`;