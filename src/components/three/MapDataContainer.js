import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row} from "react-bootstrap";

import referenceImg from './reference.png'
import Map from "./Map";
import DataVisualization from "./DataVisualization";
import BarChart from "../charts/BarChart";
import AreaChartCustom from "../charts/AreaChartCustom";
import PieChartCustom from "../charts/PieChartCustom";

function MapContainer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);
  const getData = () => {
    fetch("Final_data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        // console.log(response)
        return response.json();
      })
      .then(function (myJson) {
        // console.log(myJson);
        setData(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Card className="my-3 mx-4 text-white bg-dark three-js-card">
      <Card.Header>Dashboard</Card.Header>
      <Card.Body>
        <Card.Title> </Card.Title>
        <div
        id="three-root"
        className="justify-content-md-center three-container"
      >
        {data &&
          data.length > 0 &&
          data.map((item, i) => <p key={i}>{item.about}</p>)}
        {data && data.length > 0 && <Map data={data}></Map>}
      </div>
        <Row>
          <Col md={4}>
            <DataVisualization />
          </Col>
          <Col >

          </Col>
          <Col>
          <BarChart></BarChart>
          </Col>
        </Row>
        <Row>
        <Col md={4}>
          <AreaChartCustom></AreaChartCustom>
        </Col>
        <Col >

        </Col>
        <Col>
         <PieChartCustom></PieChartCustom>
        </Col>
      </Row>
      <Row>
          <Col xs={{span:2, offset:10}} style={{zIndex:10, fontWeight:500,fontStyle:'italic'}}> 
          <p> (Data as of 24 October 2021)</p>
          </Col>
      </Row>
      <Row>
          <Col xs={{span:10,offset:1}} style={{zIndex:10}}>
          <Button data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" style={{height:35+'px'}}> Reference and data source</Button>
         
          </Col>
      </Row>
      </Card.Body>
      

      <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasBottomLabel">Offcanvas bottom</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body small">
          <img src={referenceImg}></img>
        </div>
      </div>
    </Card>
  );
}

export default MapContainer;
