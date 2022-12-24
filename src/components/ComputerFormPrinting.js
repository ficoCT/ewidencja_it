import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

export class ComputerFormPrinting extends React.PureComponent {

  constructor(props) {
      super(props);

  }render() {

        const { computer } = this.props;

  return (
      <Container className="FormPrint">
          <h1>FORMULARZ STACJI ROBOCZEJ</h1>
          <h4 className="mt-4">STACJA ROBOCZA</h4>
          <Table striped bordered hover size="sm" className="mt-4">
              <thead>
              <tr>
                  <th>Numer seryjny</th>
                  <th>Producent</th>
                  <th>Model</th>
                  <th>Numer inwentaryzacyjny</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td>{computer.serialNumber}</td>
                  <td>{computer.company}</td>
                  <td>{computer.model}</td>
                  <td>{computer.materialIndex}</td>
              </tr>
              </tbody>
          </Table>
          <h4 className="mt-4">UŻYTKOWNIK</h4>
          <Table striped bordered hover size="sm" className="mt-4">
              <thead>
              <tr>
                  <th>Imię i nazwisko</th>
                  <th>Dział</th>
                  <th>Email</th>
                  <th>Telefon</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td>Imię i nazwisko</td>
                  <td>Dział</td>
                  <td>Email</td>
                  <td>Telefon</td>
              </tr>
              </tbody>
          </Table>
          <h4 className="mt-4">PODPISY</h4>
          <Table striped bordered hover size="sm" className="mt-4">
              <thead>
              <tr>
                  <th>Podpis Administratora Lokalnego</th>
                  <th>Podpis użytkownika</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td>..................................</td>
                  <td>{computer.username}</td>
              </tr>
              </tbody>
          </Table>
      </Container>
  );
}}

    export const Print = React.forwardRef((props, ref) => {
    return <ComputerFormPrinting ref={ref} computer={props.computer} />;
});