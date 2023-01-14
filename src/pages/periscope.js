/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Button } from "reactstrap"
import { Icontroller } from "./signup"
import { useForm } from "react-hook-form"
import { useState } from "react"
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
      if (res.data.length) {
        setPay(true)
        setResult(res.data)
      } else setMessage("No report found")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      reset()
    }
  }

  const search = async (token) => {
    console.log(token)
    try {
      const response = await fetch(`${BASE_URL}pay/periscope`, {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getItem("bly_token")}`
        })
      })
      const res = await response.json()
      console.log(res)
      if (res.message === "success") {
        setReport(true)
        setMessage("")
        console.log(res, final)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPay(false)
    }
  }

  const toggle = () => setModal(!modal)

  const columns = [
    {
      name: "Student Name",
      cell: (row) => (
        <>
          {row?.bully_fname} {row?.bully_lname}
        </>
      )
    },

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
      selector: (row) => row.bully_grade
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
          {!pay ? (
            <>
              {" "}
              <Icontroller name="bully_fname" placeholder="Bully's First Name" control={control} />
              <Icontroller name="bully_lname" placeholder="Bully's Last Name" control={control} />
              <Icontroller name="bully_teacher" placeholder="Homeroom teacher" control={control} />
              <Icontroller name="bully_grade" placeholder="Bully's grade" control={control} />
              <Icontroller name="school_name" placeholder="School Name" control={control} />
              <Icontroller name="zip_code" placeholder="Zip code" control={control} />
            </>
          ) : (
            ""
          )}

          {pay ? (
            ""
          ) : (
            <>
              <Button
                bsSize="sm"
                disabled={loading}
                color="dark"
                className="my-3 shadow-none form-control"
                type="submit"
              >
                Pay
              </Button>
              <p className="text-center p-2 text-dark fw-bold">{message}</p>
            </>
          )}
        </form>
        {pay ? (
          <StripeCheckout
            className="form-control"
            allowRememberMe
            stripeKey="pk_test_51KOluiEvT7coUybkV5V9bsEwzMG1GStiV16pTbXwRj0BIuWtNoIcE2PVF0ImnIfVCxV7h7d8IIHcd7d8CmnWqWtu00yMhvuQJZ"
            amount={25 * 100}
            label="Checkout"
            token={search}
            name="checkout"
          />
        ) : (
          ""
        )}
      </Col>
      {result.length && report ? (
        <Col md="6">
          <DataTable columns={columns} data={result} />
        </Col>
      ) : (
        ""
      )}
    </Row>
  )
}

export default Periscope
