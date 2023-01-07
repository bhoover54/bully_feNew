import { useForm, Controller } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import BASE_URL from "../misc/url"
import { Button, Col, Input, Row } from "reactstrap"
import { useState } from "react"
import { toast } from "react-toastify"

const Register = () => {
  const { handleSubmit, control } = useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const submit = async (data) => {
    setLoading(true)
    const response = await fetch(`${BASE_URL}signup`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    await response.json()
    if (response.status < 400) {
      navigate("/sign up success")
      toast("success")
      return
    }
    toast("problem signing up! try again latter")
    setLoading(false)
  }

  return (
    <Row
      style={{ minHeight: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Col md="6" lg="3" className="mx-auto h-100 p-5 shadow rounded">
        <Link to="/" className="btn btn-info btn-sm text-dark fw-bold mb-3">
          home
        </Link>
        <form onSubmit={handleSubmit(submit)}>
          <Icontroller name="first_name" placeholder="First Name" control={control} />
          <Icontroller name="last_name" placeholder="Last Name" control={control} />
          <Icontroller name="email" placeholder="Email" type="email" control={control} />
          <Icontroller name="phone" placeholder="Phone" type="number" control={control} />
          <Icontroller name="password" placeholder="Password" type="password" control={control} />
          <Button
            color="dark"
            className="shadow-none mb-3 form-control"
            type="submit"
            disabled={loading}
          >
            {loading ? "loading... " : "  Sign up"}
          </Button>
          <p className="py-2 text-center">
            Already have an account?{" "}
            <Link to="/signin" className="text-secondary btn p-0">
              Sign in
            </Link>
          </p>
        </form>
      </Col>
    </Row>
  )
}

export default Register

export const Icontroller = ({ name, placeholder, control, type = "text", opt, defaultV }) => {
  return (
    <>
      <div className="mb-2">
        <label className="py-1">{placeholder}</label>
        <Controller
          name={name}
          defaultValue={defaultV || ""}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              // onChange={event}
              bsSize="sm"
              // placeholder={placeholder}
              className="shadow-none"
              type={type}
            >
              {opt}
            </Input>
          )}
        />
      </div>
    </>
  )
}
