import { Row } from "reactstrap"
import audio from "../assets/audio/audio.mp3"
const TestBullyBlox = () => {
  return (
    <Row>
      <h3 className="mb-4">Test BullyBloxx</h3>
      <p>For a guided walk through of the BullyBloxx system please click on the audio below.</p>
      <audio controls>
        <source src={audio} type="audio/wav" />
      </audio>
    </Row>
  )
}

export default TestBullyBlox
