import { useForm, Controller } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import BASE_URL from "../misc/url"
import { Button, Col, Input, Row } from "reactstrap"

const Register = () => {
  const { handleSubmit, control } = useForm()
  const navigate = useNavigate()
  const submit = async (data) => {
    const response = await fetch(`${BASE_URL}signup`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    const result = await response.json()
    if (response.status < 400) {
      console.log(result)
      navigate("/signin")
    }
    console.log(result)
  }

  return (
    <Row
      style={{ minHeight: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Col md="6" lg="3" className="mx-auto h-100 p-5 shadow rounded">
        <form onSubmit={handleSubmit(submit)}>
          <Icontroller name="fullName" placeholder="Fullname" control={control} />
          <Icontroller name="email" placeholder="Email" type="email" control={control} />
          <Icontroller name="country" placeholder="Country" control={control} />
          <Icontroller name="phone" placeholder="Phone" type="number" control={control} />
          <Icontroller name="password" placeholder="Password" type="password" control={control} />

          <Button className="shadow-none mb-3 form-control" type="submit">
            Sign In
          </Button>
        </form>
      </Col>
    </Row>
  )
}

export default Register

export const Icontroller = ({ name, placeholder, control, type = "text" }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder={placeholder} className="shadow-none mb-3" type={type} />
        )}
      />
    </>
  )
}
