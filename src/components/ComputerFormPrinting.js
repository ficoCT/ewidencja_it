import * as React from 'react';

export class ComputerFormPrinting extends React.PureComponent {
  constructor(props) {
      super(props);

      this.state = { checked: false };

  }render() {
        const { text } = this.props;

  return (
      <table>
        <tr>
          <th>Company</th>
          <th>Contact</th>
          <th>Country</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr>
      </table>
  );
}}

    export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
    // eslint-disable-line max-len
    return <ComputerFormPrinting ref={ref} text={props.text} />;
});