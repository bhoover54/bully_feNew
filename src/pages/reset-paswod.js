/* eslint-disable no-useless-escape */
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import BASE_URL from "../misc/url"
import { Button, Col, Row } from "reactstrap"
import { Icontroller } from "./signup"
import { useContext, useEffect, useState } from "react"
import AppContext from "../misc/appContext"
import { toast } from "react-toastify"

const ResetPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const resetCode = async (data) => {
    setLoading(true)
    const response = await fetch(`${BASE_URL}reset/password`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    const result = await response.json()
    if (response.status === 201) {
      toast(result.message || "succes")
      navigate("/signin", { replace: true })
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
        <form onSubmit={handleSubmit(resetCode)}>
          <Icontroller
            type="text"
            name="code"
            placeholder="Reset Code"
            register={register}
            errors={errors}
            others={{
              required: true
            }}
          />

          <Icontroller
            type="password"
            name="password"
            placeholder="New Password"
            register={register}
            errors={errors}
            others={{
              required: true
            }}
          />

          {/* <Icontroller
            type="password"
            name="cpassword"
            placeholder="Confirm Password"
            register={register}
            errors={errors}
            others={{
              required: true
            }}
          /> */}

          <Button color="dark" type="submit" className="form-control shadow-none" disabled={loading}>
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

export default ResetPassword
