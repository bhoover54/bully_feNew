import { Row, Col } from "reactstrap"

const Media = () => {
  const video = [
    { path: "zgqFsb_GemA", name: "Real estate Pros" },
    { path: "qj0d9M3Uj2c", name: "The Switch" },
    { path: "EX9oDLxDtMA", name: "Why police will never blame bullying" },
    { path: "fziG3WmNjkY", name: "How bullybloxx works?" }
  ]

  return (
    <Row>
      <p className="text-center">Please choose from the videos below to obtain the information that you are seeking.</p>
      {video.map((e) => (
        <Col xs="12" md="6">
          <iframe width="100%" height="400" src={`https://www.youtube.com/embed/${e.path}`} title={e.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <p>{e.name}</p>
        </Col>
      ))}
    </Row>
  )
}

export default Media
