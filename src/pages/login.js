/* eslint-disable no-useless-escape */
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import BASE_URL from "../misc/url"
import { Button, Col, Row } from "reactstrap"
import { Icontroller } from "./signup"
import { useContext, useEffect, useState } from "react"
import AppContext from "../misc/appContext"
import { toast } from "react-toastify"

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()
  const [loading, setLoading] = useState(false)
  const { login: loggedIn, token } = useContext(AppContext)
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
    if (response.status < 400) {
      loggedIn(result)
      toast("login successful")
      navigate("/", { replace: true })
      return
    }
    toast("invalid username or password")
    setLoading(false)
  }

  useEffect(() => {
    if (token) navigate("/")
  })

  return (
    <Row style={{ minHeight: "70vh" }} className="d-flex justify-content-center align-items-center">
      {loading ? <Loader /> : <></>}

      <Col md="6" lg="4" className="mx-auto  p-5 shadow rounded">
        {/* <Link to="/" className="btn btn-info btn-sm text-dark fw-bold mb-3">
          home
        </Link> */}
        <form onSubmit={handleSubmit(login)}>
          <Icontroller
            type="email"
            name="email"
            placeholder="Email"
            register={register}
            errors={errors}
            others={{
              required: true,
              pattern: /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g
            }}
            message="Please use a valid email format"
          />
          <Icontroller
            type="password"
            name="password"
            placeholder="Password"
            register={register}
            errors={errors}
            others={{
              required: true
            }}
            message="password is required"
          />

          <Button color="dark" type="submit" className="form-control shadow-none" disabled={loading}>
            {loading ? "loading... " : "  Sign In"}
          </Button>

          <p className="mt-2 p-0 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-secondary btn p-0">
              Sign up
            </Link>
          </p>
          <p className="p-0 text-center">
            <Link to="/forgot-password" className="text-secondary btn p-0">
              Forgot Password?
            </Link>
          </p>
        </form>
      </Col>
    </Row>
  )
}

export default Login

export const Loader = () => (
  <div className="loader">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
)
