import { Row, Col } from "reactstrap"

const Media = () => {
  const video = [
    { path: "L0IkAdTtuhM", name: "Real estate Pros" },
    { path: "qj0d9M3Uj2c", name: "The Switch" },
    { path: "EX9oDLxDtMA", name: "Why police will never blame bullying" },
    { path: "fziG3WmNjkY", name: "What is bullybloxx?" }
  ]

  return (
    <Row>
      <p className="text-center">Please choose from the videos below to obtain the information that you are seeking.</p>
      {video.map((e) => (
        <Col xs="12" md="6">
          <iframe width="100%" height="400" src={`https://www.youtube.com/embed/${e.path}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <p>{e.name}</p>
        </Col>
      ))}
    </Row>
  )
}

export default Media
