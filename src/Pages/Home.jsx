import React from "react";
import Button from 'react-bootstrap/Button';

import Navigation from "../Components/Common/Navbar";
import { Table } from "react-bootstrap";

const Home = () => {
    return (
        <>
            <Navigation />
            <div className="centered-div">
                <Button variant="link" onClick={() => window.location.href="/catalogue"}>Go to catalogue</Button>
                <br />
                <p style={{ fontSize: "20px" }}>We are always available at <b>pincopallino@gmail.com</b></p>
                <br/><br/>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ margin: "0px 20px" }}>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Time tables</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Monday</td>
                                    <td>10-12 // 15.30-17.30</td>
                                </tr>
                                <tr>
                                    <td>Tuesday</td>
                                    <td>10-12 // 15.30-17.30</td>
                                </tr>
                                <tr>
                                    <td>Wednesday</td>
                                    <td>10-12 // 15.30-17.30</td>
                                </tr>
                                <tr>
                                    <td>Thursday</td>
                                    <td>10-12 // 15.30-17.30</td>
                                </tr>
                                <tr>
                                    <td>Friday</td>
                                    <td>10-12 // 15.30-17.30</td>
                                </tr>
                                <tr>
                                    <td>Saturday</td>
                                    <td>10-12</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div style={{ margin: "0px 20px" }}>
                        <h4 style={{ fontSize: "20px" }}>Opening days for september</h4>
                        <br/>
                        <p><b>Book retrieve: </b> from 01/09 to 04/09</p>
                        <p><b>Book sell: </b> from 06/09 to 09/09</p>
                        <p><b>Money retrieve: </b> 10/09 and 11/09</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
