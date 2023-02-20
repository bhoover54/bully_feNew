import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import BASE_URL from "../misc/url"
import { Button, Col, Row } from "reactstrap"
import { useState } from "react"
import { toast } from "react-toastify"
import { Loader } from "./login"

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
        setLoading(false)
        return
      }
      setLoading(false)
      toast(result.message)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row style={{ minHeight: "70vh" }} className="d-flex justify-content-center align-items-center">
      {loading ? <Loader /> : <></>}
      <Col md="6" lg="4" className="mx-auto  p-5 shadow rounded">
        <form onSubmit={handleSubmit(submit)}>
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

export const Icontroller = ({ register, others, errors, name, message, placeholder, num = false, ...rest }) => {
  function isNumberKey(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false
    return true
  }
  return (
    <div className="mb-2">
      <label className="py-1">{placeholder}</label>
      {!num ? (
        <>
          <input className="mb-1 form-control shadow-none" {...register(name, { ...others })} {...rest} />
        </>
      ) : (
        <input className="mb-1 form-control shadow-none" {...register(name, { ...others })} {...rest} onKeyUp={isNumberKey} onKeyDown={isNumberKey} />
      )}

      {errors[name] ? <p className="text-danger">{message || "required"}</p> : ""}
    </div>
  )
}

// /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g
