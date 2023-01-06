import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { setItem } from "../misc/helper"
import BASE_URL from "../misc/url"
import { Button, Col, Row } from "reactstrap"
import { Icontroller } from "./signup"

const Login = () => {
  const { handleSubmit, control } = useForm()
  const navigate = useNavigate()

  const login = async (data) => {
    const response = await fetch(`${BASE_URL}signin`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    const result = await response.json()
    if (response.status === 201) {
      setItem("bly_token", result.token)
      setItem("bly_role", result.role)
      //console.log(result, response.status)
      navigate("/sponsor", { replace: true })
      return
    }
    //console.log(result.message)
  }

  return (
    <Row
      style={{ minHeight: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Col md="6" lg="4" className="mx-auto h-100  p-5 shadow rounded">
        <form onSubmit={handleSubmit(login)}>
          <Icontroller name="email" type="email" placeholder="Email" control={control} />
          <Icontroller name="password" type="password" placeholder="Password" control={control} />
          <Button type="submit" className="form-control shadow-none">
            Sign In
          </Button>
        </form>
      </Col>
    </Row>
  )
}

export default Login
