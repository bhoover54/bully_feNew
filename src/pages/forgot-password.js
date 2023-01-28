/* eslint-disable no-useless-escape */
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import BASE_URL from "../misc/url"
import { Button, Col, Row } from "reactstrap"
import { Icontroller } from "./signup"
import { useState } from "react"
import { toast } from "react-toastify"

const ForgotPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const forgotPassword = async (data) => {
    setLoading(true)
    const response = await fetch(`${BASE_URL}forgot/password`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    const result = await response.json()
    if (response.status === 200) {
      toast(result.message)
      navigate(`/reset-password?email=${data.email}`, { replace: true })
      return
    }
    toast("invalid username or password")
    setLoading(false)
  }

  return (
    <Row style={{ minHeight: "70vh" }} className="d-flex justify-content-center align-items-center">
      <Col md="6" lg="4" className="mx-auto  p-5 shadow rounded">
        <form onSubmit={handleSubmit(forgotPassword)}>
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
            message="Invalid email address"
          />

          <Button color="dark" type="submit" className="form-control shadow-none" disabled={loading}>
            {loading ? "loading... " : "  Submit"}
          </Button>
        </form>
      </Col>
    </Row>
  )
}

export default ForgotPassword
