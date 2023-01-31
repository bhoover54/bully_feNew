import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import BASE_URL from "../misc/url"
import { Button, Col, Row } from "reactstrap"
import { useState } from "react"
import { toast } from "react-toastify"

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const submit = async (data) => {
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
      const result = await response.json()
      if (response.status < 400) {
        navigate("/signin")
        toast("success")
        return
      } else toast(result.message)
    } catch (error) {
      //console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row style={{ minHeight: "70vh" }} className="d-flex justify-content-center align-items-center">
      <Col md="6" lg="4" className="mx-auto  p-5 shadow rounded">
        <form onSubmit={handleSubmit(submit)}>
          {/* <Icontroller
            type="text"
            name="first_name"
            placeholder="First Name"
            register={register}
            errors={errors}
            others={{
              required: true
            }}
            message="First name is required"
          />
          <Icontroller
            type="text"
            name="last_name"
            placeholder="Last Name"
            register={register}
            errors={errors}
            others={{
              required: true
            }}
          /> */}
          <Icontroller
            type="text"
            name="username"
            placeholder="Username"
            register={register}
            errors={errors}
            others={{
              required: true
            }}
          />
          <Icontroller
            type="email"
            name="email"
            placeholder="Email"
            register={register}
            errors={errors}
            others={{
              required: true,
              // eslint-disable-next-line no-useless-escape
              pattern: /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g
            }}
            message="Please use a valid email format"
          />
          {/* <Icontroller
            type="number"
            name="phone"
            placeholder="Phone"
            register={register}
            errors={errors}
            others={{
              pattern: /[0-9]/,
              maxLength: 10,
              minLength: 10
            }}
            message="input a valid phone number"
          /> */}
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

          <Button color="dark" className="shadow-none mb-3 form-control" type="submit" disabled={loading}>
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

export const Icontroller = ({ register, others, errors, name, message, placeholder, ...rest }) => {
  return (
    <div className="mb-2">
      <label className="py-1">{placeholder}</label>
      <input className="mb-1 form-control shadow-none" {...register(name, { ...others })} {...rest} />
      {errors[name] ? <p className="text-danger">{message || "required"}</p> : ""}
    </div>
  )
}

// /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g
