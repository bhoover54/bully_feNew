/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Button } from "reactstrap"
import { Icontroller } from "./signup"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { getItem } from "../misc/helper"
import BASE_URL from "../misc/url"
import DataTable from "react-data-table-component"
import StripeCheckout from "react-stripe-checkout"

const Periscope = () => {
  const { handleSubmit, control, reset } = useForm()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState([])
  const [final, setFinal] = useState([])
  const [dataR, setData] = useState({})
  const [report, setReport] = useState(false)
  const [pay, setPay] = useState(false)
  const [message, setMessage] = useState("")
  const [modal, setModal] = useState(false)

  const submit = async (data) => {
    setData(data)
    setLoading(true)
    setMessage("wait why will get report, You will require to pay a $25 to view report")
    try {
      const response = await fetch(`${BASE_URL}periscope`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getItem("bly_token")}`
        })
      })
      const res = await response.json()
      if (res.data) setResult(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      reset()
    }
  }

  const search = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/pay/periscope`, {
        method: "POST",
        body: JSON.stringify(token),
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getItem("bly_token")}`
        })
      })
      const res = await response.json()
      if (res.message === "success") {
        setReport(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const findMatch = (e) => {
    console.log(e, "39")
    const sort = result.filter((dt) => {
      const regex = new RegExp(e, "gi")
      let answer = ""
      if (dt.fname) answer = dt?.bully_lname.match(regex)
      if (dt.bully_lname) answer = dt?.bully_lname.match(regex)
      if (dt.threat_name) answer = dt?.threat_name.match(regex)
      if (dt.w_name) answer = dt?.w_name.match(regex)

      return answer
    })
    if (sort.length > 0) setPay(true)
    else setMessage("No match for report")
    setFinal(sort)
    console.log(sort)
  }

  useEffect(() => {
    if (result.length) {
      findMatch(dataR.bully_name)
    }
  }, [result])

  const toggle = () => setModal(!modal)

  const columns = [
    {
      name: "Student Name",
      // selector: (row) =>
      //   `${row?.bully_fname + " " + row?.bully_lname + row.w_name + row.threat_name}`,
      cell: (row) => (
        <>
          {row?.bully_fname && (
            <>
              {row?.bully_fname} {row?.bully_lname}{" "}
            </>
          )}
          {row?.w_name && row.w_name}
          {row.threat_name && row.threat_name}
        </>
      )
    },
    // {
    //   name: "Reporter",
    //   selector: (row) => row.user.fullName
    // },
    {
      name: "Bully Type",
      selector: (row) => row.report_type
    },
    {
      name: "School Name",
      selector: (row) => row.school_name
    },
    {
      name: "School Grade",
      selector: (row) => row.threat_grade
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Button
            color="dark"
            size="sm"
            onClick={() => {
              toggle()
              setReport(row)
            }}
          >
            Detail
          </Button>
        </>
      )
    }
  ]

  return (
    <Row>
      <Col md="6" className="mx-auto mb-5">
        <form onSubmit={handleSubmit(submit)}>
          <Icontroller name="bully_name" placeholder="Bully's Name" control={control} />
          <Icontroller name="homeroom_teacher" placeholder="Homeroom teacher" control={control} />
          <Icontroller name="grade" placeholder="Bully's grade" control={control} />
          <Icontroller name="school_name" placeholder="School Name" control={control} />
          <Icontroller name="zip_code" placeholder="Zip code" control={control} />

          {pay ? (
            <StripeCheckout
              className="form-control"
              allowRememberMe
              stripeKey="pk_test_51KOluiEvT7coUybkV5V9bsEwzMG1GStiV16pTbXwRj0BIuWtNoIcE2PVF0ImnIfVCxV7h7d8IIHcd7d8CmnWqWtu00yMhvuQJZ"
              amount={25 * 100}
              label="Donate"
              token={search}
              name="Donate"
            />
          ) : (
            <>
              <Button
                bsSize="sm"
                disabled={loading}
                color="dark"
                className="mb-3 shadow-none form-control"
                type="submit"
              >
                Pay
              </Button>
            </>
          )}
          <p>{message}</p>
        </form>
      </Col>
      {result.length && report ? (
        <Col md="6">
          <DataTable columns={columns} data={final} />
        </Col>
      ) : (
        ""
      )}
    </Row>
  )
}

export default Periscope
