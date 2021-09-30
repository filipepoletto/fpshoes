import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;

  footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: #0c853e;
      color: #fff;
      border: 0;
      border-radius: 32px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.06, '#0c853e')};
      }
    }
  }

  @media (max-width: 600px) {
    footer {
      flex-direction: column-reverse;
      gap: 20px;
    }
  }
`;

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  img {
    height: 100px;
  }

  strong {
    color: #333;
    display: block;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 6px;

    svg {
      color: #0c853e;
      transition: color 0.2s;
    }

    &:hover {
      svg {
        color: ${darken(0.06, '#0c853e')};
      }
    }

    &:disabled {
      svg {
        color: ${lighten(0.25, '#0c853e')};
        cursor: not-allowed;
      }
    }
  }

  @media (max-width: 600px) {
    thead {
      display: none;
    }

    tbody tr {
      display: flex;
      flex-direction: column;
      text-align: center;
    }

    div {
      justify-content: center;

      input {
        text-align: center;
      }
    }
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    color: #ccc;
    font-weight: bold;
  }

  strong {
    font-size: 28px;
    margin-left: 5px;
  }
`;
