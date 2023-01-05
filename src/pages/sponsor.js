import { useForm } from "react-hook-form"
import BASE_URL from "../misc/url"
import { getItem } from "../misc/helper"
import { useState } from "react"
import { Button, Col, Input, Row } from "reactstrap"

const Sponsor = () => {
  const { register, handleSubmit, reset } = useForm()
  const [message, setMessage] = useState("")

  const search = async (data) => {
    console.log(data, "working")
    const response = await fetch(`${BASE_URL}school/filter`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getItem("bly_token")}`
      })
    })
    const result = await response.json()
    if (response.status < 400) {
      console.log(result)
      if (!result.data) setMessage("school not sponsored by any business")
      else
        setMessage(
          `${result.data.school_name} with zip code ${result.data.zipCode} is already sponsored`
        )
      reset()
    }
    console.log(result)
  }

  const submit = (data) => console.log(data)

  return (
    <>
      <Row>
        <Col md="6" className="mb-5">
          <form onSubmit={handleSubmit(search)}>
            <Input
              type="text"
              bsSize="sm"
              className="mb-3 shadow-none"
              placeholder="School name"
              {...register("schoolName")}
            />
            <Input
              type="text"
              bsSize="sm"
              className="mb-3 shadow-none"
              placeholder="Zip code"
              {...register("zip_code")}
            />

            <Button type="submit" color="dark" size="sm">
              Search
            </Button>
            <p className="my-3">{message}</p>
          </form>
        </Col>

        <Col md="6">
          <form onSubmit={handleSubmit(submit)}>
            <Input
              bsSize="sm"
              className="mb-3 shadow-none"
              type="text"
              placeholder="BullyVaxx Username"
              {...register("username")}
            />

            <Input
              bsSize="sm"
              className="mb-3 shadow-none"
              type="text"
              placeholder="Your name"
              {...register("name")}
            />

            <Input
              bsSize="sm"
              className="mb-3 shadow-none"
              type="text"
              placeholder="Company Name"
              {...register("company_name")}
            />

            <Input
              bsSize="sm"
              className="mb-3 shadow-none"
              type="email"
              placeholder="Business Email"
              {...register("zipCode")}
            />

            <Input
              bsSize="sm"
              className="mb-3 shadow-none"
              type="text"
              placeholder="Business Phone Number"
              {...register("zipCode")}
            />

            <Input
              bsSize="sm"
              className="mb-3 shadow-none"
              type="text"
              placeholder="Business website"
              {...register("zipCode")}
            />

            <Input
              bsSize="sm"
              className="mb-3 shadow-none"
              type="text"
              placeholder="School name"
              {...register("school_name")}
            />

            <Input
              bsSize="sm"
              className="mb-3 shadow-none"
              type="text"
              placeholder="Zip code"
              {...register("zipCode")}
            />

            <Button type="submit" color="dark" size="sm">
              Sponsor
            </Button>
          </form>
        </Col>
      </Row>
    </>
  )
}

export default Sponsor
