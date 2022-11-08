import * as React from 'react';
import Container from 'react-bootstrap/Container';

export class ComputerFormPrinting extends React.PureComponent {

  constructor(props) {
      super(props);

  }render() {

        const { computer } = this.props;

  return (
      <Container>
          <table>
            <tr>
              <th>Numer seryjny</th>
              <th>Producent</th>
              <th>Model</th>
              <th>Numer inwentaryzacyjny</th>
            </tr>
            <tr>
              <td>{computer.serialNumber}</td>
              <td>{computer.company}</td>
              <td>{computer.model}</td>
              <td>{computer.materialIndex}</td>
            </tr>
            <tr>
                <th>Podpis Administratora Lokalnego</th>
                <th>Podpis użytkownika</th>
            </tr>
              <td>..................................</td>
              <td>..................................</td>
          </table>
      </Container>
  );
}}

    export const Print = React.forwardRef((props, ref) => {
    return <ComputerFormPrinting ref={ref} computer={props.computer} />;
});