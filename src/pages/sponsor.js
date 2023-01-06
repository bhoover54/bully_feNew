import { useForm } from "react-hook-form"
import BASE_URL from "../misc/url"
import { getItem } from "../misc/helper"
import { useState } from "react"
import { Button, Col, Row } from "reactstrap"
import { Icontroller } from "./signup"

const Sponsor = () => {
  const { handleSubmit, reset, control } = useForm()
  const { handleSubmit: handleSubmit2, reset: reset2, control: control2 } = useForm()
  const [message, setMessage] = useState("")

  const search = async (data) => {
    //console.log(data, "working")
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
      //console.log(result)
      if (!result.data) setMessage("school not sponsored by any business")
      else
        setMessage(
          `${result.data.school_name} with zip code ${result.data.zip_code} is already sponsored by ${result.data.business_name}`
        )
      reset()
    }
    //console.log(result)
  }

  const submitData = async (data) => {
    //console.log(data)
    const response = await fetch(`${BASE_URL}sponsor/school`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getItem("bly_token")}`
      })
    })
    await response.json()
    if (response.status < 400) {
      //console.log(result)
      setMessage("school sponsored successful, awaiting approvals")
      reset2()
    }
    //console.log(result)
  }

  return (
    <>
      <Row>
        {message ? (
          <Col xs="12">
            <p className="my-3 text-center">{message}</p>
          </Col>
        ) : (
          ""
        )}

        <Col md="3" className="mb-5">
          <h4 className="mb-3">Search Sponsored School</h4>
          <form onSubmit={handleSubmit(search)}>
            <Icontroller name="schoolName" placeholder="School name" control={control} />
            <Icontroller name="zip_code" placeholder="Zip code" control={control} />

            <Button type="submit" color="dark" size="sm">
              Search
            </Button>
          </form>
        </Col>

        <Col md="3" />

        <Col md="6">
          <h4 className="mb-3">Sponsor School</h4>
          <form onSubmit={handleSubmit2(submitData)}>
            <Icontroller name="business_name" placeholder="Company name" control={control2} />
            <Icontroller name="business_type" placeholder="Business Type" control={control2} />
            <Icontroller
              name="business_email"
              type="email"
              placeholder="Business Email"
              control={control2}
            />
            <Icontroller
              name="business_mobile"
              placeholder="Business phone number"
              control={control2}
            />
            <Icontroller
              name="business_website"
              placeholder="Business website"
              control={control2}
            />

            <Icontroller name="school_name" placeholder="School name" control={control2} />
            <Icontroller name="zip_code" type="number" placeholder="Zip code" control={control2} />

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
