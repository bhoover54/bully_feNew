import { useForm } from "react-hook-form"
import BASE_URL from "../misc/url"
import { getItem, setItem } from "../misc/helper"
import { useContext, useState } from "react"
import { Button, Col, Row } from "reactstrap"
import { Icontroller } from "./signup"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AppContext from "../misc/appContext"

const Sponsor = () => {
  const { handleSubmit, reset, control } = useForm()
  const navigate = useNavigate()
  const { handleSubmit: handleSubmit2, reset: reset2, control: control2 } = useForm()
  const [message, setMessage] = useState("")
  const [found, setFound] = useState({})
  const [loading, setLoading] = useState(false)
  const { token } = useContext(AppContext)
  const search = async (data) => {
    setLoading(true)
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
      if (!result.data) setMessage("school not sponsored by any business")
      else {
        setFound(result)
      }
      reset()
      toast.info("success")
      setLoading(false)
      return
    }
    setLoading(false)
    toast.info("not found")
  }

  const submitData = async (data) => {
    if (!token) {
      toast("sign in to sponsor a school")
      return
    }
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
      setMessage("school sponsored successful, awaiting approvals")
      reset2()
    }
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
        {Object.keys(found).length ? (
          <div className="text-center p-3 mb-5 shadow rounded">
            {found.data.approved === "pending" ? (
              <> {found.data.school_name.toUpperCase()} is pending approval</>
            ) : (
              <>
                {found.data.school_name.toUpperCase()} with zip code {found.data.zip_code} is
                already sponsored by {found.data.business_name} with sponsor balance of $
                {found.data?.wallet?.balance}. <br />
                <Button
                  className="text-decoration-none bg-transparent text-primary border-0"
                  onClick={() => {
                    setItem("s_sch", JSON.stringify(found.data))
                    navigate("/donate")
                    // console.log(found.data)
                  }}
                  disabled={loading}
                >
                  Donate{" "}
                </Button>
              </>
            )}
            to school
          </div>
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
            <Icontroller
              name="business_type"
              placeholder="Business Type"
              control={control2}
              type="select"
              opt={
                <>
                  <option></option>
                  <option value="real estate">Real Estate</option>
                </>
              }
            />
            <Icontroller
              name="business_email"
              type="email"
              placeholder="Business Email"
              control={control2}
            />
            <Icontroller
              name="business_mobile"
              type="number"
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
