import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import BASE_URL from "../misc/url"
import { Button, Col, Row } from "reactstrap"
import { Icontroller } from "./signup"
import { useContext, useState } from "react"
import AppContext from "../misc/appContext"
import { toast } from "react-toastify"

const Login = () => {
  const { handleSubmit, control } = useForm()
  const [loading, setLoading] = useState(false)
  const { login: loggedIn } = useContext(AppContext)
  const navigate = useNavigate()

  const login = async (data) => {
    setLoading(true)
    const response = await fetch(`${BASE_URL}signin`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    const result = await response.json()
    if (response.status === 201) {
      loggedIn(result)
      navigate("/", { replace: true })
      toast("login successful")
      return
    }
    toast("invalid username or password")
    setLoading(false)
  }

  return (
    <Row style={{ minHeight: "70vh" }} className="d-flex justify-content-center align-items-center">
      <Col md="6" lg="4" className="mx-auto  p-5 shadow rounded">
        {/* <Link to="/" className="btn btn-info btn-sm text-dark fw-bold mb-3">
          home
        </Link> */}
        <form onSubmit={handleSubmit(login)}>
          <Icontroller name="email" type="email" placeholder="Email" control={control} />
          <Icontroller name="password" type="password" placeholder="Password" control={control} />

          <Button
            color="dark"
            type="submit"
            className="form-control shadow-none"
            disabled={loading}
          >
            {loading ? "loading... " : "  Sign In"}
          </Button>

          <p className="py-2 text-center">
            Dont't have an account?{" "}
            <Link to="/signup" className="text-secondary btn p-0">
              Sign up
            </Link>
          </p>
        </form>
      </Col>
    </Row>
  )
}

export default Login
