import { Link } from "react-router-dom"
import { Row } from "reactstrap"

const WalkThrough = () => {
  return (
    <Row>
      <h3 className="mb-3">BULLYBLOXX WALK THROUGH</h3>
      <p>
        Every day, 22 American students will take their own lives to end the abuse they suffer from bullies at school. Bullying is a very complex issue that has been almost impossible to resolve because of all of the underlying issues and problems connected to it. BullyBloxx is an easy to use, but
        broad reaching system, that addresses and resolves each of these underlying problems that have been standing in the way of transforming our schools from bully-laden back to bully-free, where they should be.
      </p>
      <p>Coincidentally, it takes about 22 minutes to complete this tutorial; please give 1 minute of your time for each child lost, just today, to learn how your community can end this harm to your children once and for all.</p>
      <p className="d-flex align-items-center">
        <Link to="/test-bullybloxx" className="p-0 me-1">
          Click HERE
        </Link>
        to begin the tutorial.
      </p>
    </Row>
  )
}

export default WalkThrough
