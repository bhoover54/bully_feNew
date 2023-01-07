// import { useState } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Col, Row, Button } from "reactstrap"
// import useSchool from "../hooks/school.hook"
import { getItem } from "../misc/helper"
import BASE_URL from "../misc/url"
import { Icontroller } from "./signup"

const Donate = () => {
  const { handleSubmit, control, reset } = useForm()
  const school = JSON.parse(getItem("s_sch"))
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const submit = async (data) => {
    setLoading(true)
    data.school_id = school.id
    const response = await fetch(`${BASE_URL}donate/school`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    await response.json()
    if (response.status < 400) {
      reset()
      setLoading(false)
      toast("donation successful")
      navigate("/")
      return
    }
    setLoading(false)
    toast("unable to send donation")
  }

  return (
    <Row>
      <Col md="6" className="mx-auto mb-5">
        <form onSubmit={handleSubmit(submit)}>
          <p>
            School Name: <span className="fw-bold text-uppercase"> {school.school_name} </span>
          </p>
          <Icontroller name="name" placeholder="Full Name" control={control} />
          <Icontroller name="email" placeholder="Email" control={control} />
          <Icontroller name="amount" placeholder="Amount" control={control} />

          <Button
            bsSize="sm"
            color="dark"
            className="mb-3 shadow-none form-control"
            type="submit"
            disabled={loading}
          >
            Donate
          </Button>
        </form>
      </Col>
    </Row>
  )
}

export default Donate
