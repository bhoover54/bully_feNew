import { Row, Col } from "reactstrap"

const Verification = () => {
  return (
    <Row>
      <h3 className="text-center mb-3">Sample Verification Video</h3>
      <p className="text-center">Below is a sample verification video for BullyBloxx so you can see how simple and easy this very important feature is to use</p>

      <Col xs="12" md="6" className="mx-auto my-2">
        <iframe width="100%" height="400" src="https://youtube.com/embed/pH4yDjpuM0Y" title="description" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Col>
    </Row>
  )
}

export default Verification
