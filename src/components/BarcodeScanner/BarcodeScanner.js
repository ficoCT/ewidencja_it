import React, { Component } from 'react'
import Scanner from '../Scanner'
import {Form} from "react-bootstrap";

class BarcodeScanner extends Component {
    state = {
        results: [],
    }

    _scan = () => {
        this.setState({ scanning: !this.state.scanning })
    }

    _onDetected = result => {
        this.setState({ results: [] })
        this.setState({ results: this.state.results.concat([result]) })
    }

    render() {
        return (
            <div>
                <Scanner onDetected={this._onDetected} />
                <Form>
                    <Form.Control
                        as="textarea"
                        defaultValue={'No data scanned'}
                        value={this.state.results[0] ? this.state.results[0].codeResult.code : 'No data scanned'}
                        rows={3}
                    />
                </Form>
            </div>
        )
    }
}

export default BarcodeScanner
