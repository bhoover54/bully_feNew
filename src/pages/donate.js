// import { useState } from "react"
import { useForm } from "react-hook-form"
import { Col, Row, Input, Button } from "reactstrap"
import useSchool from "../hooks/school.hook"
import BASE_URL from "../misc/url"
import { Icontroller } from "./signup"

const Donate = () => {
  const { register, handleSubmit, control, reset } = useForm()
  const { school } = useSchool()

  const submit = async (data) => {
    console.log(data)
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
      reset()
      return
    }
    console.log(result)
  }

  return (
    <Row>
      <Col md="6" className="mx-auto mb-5">
        <form onSubmit={handleSubmit(submit)}>
          <Icontroller
            name="school_id"
            placeholder=""
            control={control}
            type="select"
            opt={
              <>
                <option>School Name</option>
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
              </>
            }
          />
          <Icontroller name="name" placeholder="Full Name" control={control} />
          <Icontroller name="email" placeholder="Email" control={control} />
          <Icontroller name="amount" placeholder="Amount" control={control} />

          <Button bsSize="sm" color="dark" className="mb-3 shadow-none form-control" type="submit">
            Donate
          </Button>
        </form>
      </Col>
    </Row>
  )
}

export default Donate
