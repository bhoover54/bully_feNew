import { Row, Col } from "reactstrap"

const Media = () => {
  return (
    <Row>
      <p className="text-center">
        Please choose from the videos below to obtain the information that you are seeking.
      </p>
      <Col xs="12" md="6">
        {" "}
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/P4EDSU8rQHc"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <p>Realtor Message</p>
      </Col>
      <Col xs="12" md="6">
        {" "}
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/P4EDSU8rQHc"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <p>Media Message</p>
      </Col>
      <Col xs="12" md="6">
        {" "}
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/P4EDSU8rQHc"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <p>Other Message</p>
      </Col>
    </Row>
  )
}

export default Media
