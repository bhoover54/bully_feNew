import { Row } from "reactstrap"
import audio from "../assets/audio/BullyBloxx-Ruth_Rosen.wav"
const TestBullyBlox = () => {
  return (
    <Row>
      <h3 className="mb-4">Test BullyBloxx</h3>
      <audio controls>
        <source src={audio} type="audio/wav" />
      </audio>
    </Row>
  )
}

export default TestBullyBlox
