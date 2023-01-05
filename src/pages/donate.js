// import { useState } from "react"
import { useForm } from "react-hook-form"
import { Col, Row, Input, Button } from "reactstrap"
import useSchool from "../hooks/school.hook"
import BASE_URL from "../misc/url"

const Donate = () => {
  const { register, handleSubmit } = useForm()
  const { school } = useSchool()

  const submit = async (data) => {
    const response = await fetch(`${BASE_URL}donate/school`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    const result = await response.json()
    if (response.status < 400) {
      console.log(result)
      return
    }
    console.log(result)
  }

  return (
    <Row>
      <Col md="6" className="mx-auto mb-5">
        <form onSubmit={handleSubmit(submit)}>
          <Input type="select" {...register("school_id")} className="shadow-none mb-3 ">
            <option>select</option>
            {school.length
              ? school.map(
                  (e) =>
                    e.approved === "approved" && (
                      <option value={e.id}>
                        {e.school_name} {e.zipCode}
                      </option>
                    )
                )
              : ""}
          </Input>
          <Input
            bsSize="sm"
            className="mb-3 shadow-none"
            type="text"
            placeholder="Full Name"
            {...register("name")}
          />
          <Input
            bsSize="sm"
            className="mb-3 shadow-none"
            type="email"
            placeholder="email"
            {...register("email")}
          />
          <Input
            bsSize="sm"
            className="mb-3 shadow-none"
            type="text"
            placeholder="Amount"
            {...register("amount")}
          />

          <Button bsSize="sm" color="dark" className="mb-3 shadow-none form-control" type="submit">
            Donate
          </Button>
        </form>
      </Col>
    </Row>
  )
}

export default Donate
