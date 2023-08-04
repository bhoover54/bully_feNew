/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import { Icontroller } from "./signup"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { getItem } from "../misc/helper"
import BASE_URL from "../misc/url"
import DataTable from "react-data-table-component"
import StripeCheckout from "react-stripe-checkout"
import { bullyTemplate2, templateSchoolThreat2, templateWeaponThreat2 } from "../misc/report-template"

const Periscope = () => {
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors }
  } = useForm()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState([])
  const [final, setFinal] = useState([])
  const [dataR, setData] = useState({})
  const [report, setReport] = useState(false)
  const [pay, setPay] = useState(false)
  const [message, setMessage] = useState("")
  const [modal, setModal] = useState(false)
  const [backdrop, setBackdrop] = useState(true)

  const submit = async (data) => {
    const key = document.getElementsByClassName("stripe-key")[0]
    setData(data)
    setLoading(true)
    setMessage("Searching Report once the report is found, accessing the report costs $12.85")
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
        key.click()
        setPay(true)
        setResult(res.data)
      } else setMessage("No report found")
    } catch (error) {
      //console.log(error)
    } finally {
      setLoading(false)
      reset()
    }
  }

  const search = async (token) => {
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
      //console.log(res)
      if (res.message === "success") {
        setReport(true)
        setMessage("")
        //console.log(res, final)
      }
    } catch (error) {
      //console.log(error)
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

  const reportTenplate = (reqBody) => {
    let html = ""
    if (reqBody.report_type === "bullying") html = bullyTemplate2(reqBody, true)
    if (reqBody.report_type === "weapon in school") html = templateWeaponThreat2(reqBody, true)
    if (reqBody.report_type === "threats against school") html = templateSchoolThreat2(reqBody, true)

    return html
  }
  return (
    <Row>
      <Col md="6" className="mx-auto mb-5">
        <form onSubmit={handleSubmit(submit)}>
          {!pay ? (
            <>
              <Icontroller
                name="bully_fname"
                type="text"
                placeholder="Bully's First Name"
                register={register}
                errors={errors}
                others={{
                  required: true
                }}
              />
              <Icontroller
                name="bully_lname"
                type="text"
                placeholder="Bully's Last Name"
                register={register}
                errors={errors}
                others={{
                  required: true
                }}
              />
              <Icontroller
                name="bully_teacher"
                type="text"
                placeholder="Homeroom teacher"
                register={register}
                errors={errors}
                others={{
                  required: true
                }}
              />
              <Icontroller
                name="bully_grade"
                type="text"
                placeholder="Bully's grade"
                register={register}
                errors={errors}
                others={{
                  required: true
                }}
              />
              <Icontroller
                name="school_name"
                type="text"
                placeholder="School Name"
                register={register}
                errors={errors}
                others={{
                  required: true
                }}
              />
              <Icontroller
                name="zip_code"
                type="text"
                placeholder="Zip code"
                register={register}
                errors={errors}
                others={{
                  required: true,
                  maxLength: 5,
                  minLength: 5
                }}
                message="Input a valid zip code"
              />
            </>
          ) : (
            ""
          )}

          {pay ? (
            ""
          ) : (
            <>
              <Button bsSize="sm" disabled={loading} color="dark" className="my-3 shadow-none form-control" type="submit">
                Access Report
              </Button>
              <p className="text-center p-2 text-dark fw-bold">{message}</p>
              <StripeCheckout onSubmit={submit} className="form-control stripe-key invisible" allowRememberMe stripeKey="pk_live_51KOluiEvT7coUybkk0w1l1FcznFHxuMwtNmvB0a3Km9RROS2ZRehenWquqIQAqEBDNtjnVBadiKSVrMIGY16S9yY00LRMjIpdf" amount={12.85 * 100} label="Checkout" token={search} name="checkout" />
            </>
          )}
        </form>
        {pay ? <StripeCheckout className="form-control  stripe-key invisible" allowRememberMe stripeKey="pk_live_51KOluiEvT7coUybkk0w1l1FcznFHxuMwtNmvB0a3Km9RROS2ZRehenWquqIQAqEBDNtjnVBadiKSVrMIGY16S9yY00LRMjIpdf" amount={12.85 * 100} label="Checkout" token={search} name="checkout" /> : ""}
      </Col>
      {result.length && report ? (
        <Col md="6">
          <DataTable columns={columns} data={result} />
        </Col>
      ) : (
        ""
      )}

      <Modal isOpen={modal} toggle={report?.report_type && toggle} backdrop={backdrop}>
        {Object.keys(report).length ? (
          <>
            <ModalHeader toggle={toggle}>{report.report_type}</ModalHeader>
            <ModalBody>
              <div dangerouslySetInnerHTML={{ __html: reportTenplate(report) }} />
            </ModalBody>
          </>
        ) : (
          <ModalBody>
            {/* A Periscope Report provides valuable information to a parent/person: 1- Who has a child that is being bullied by one or more bullies at school. 2- Who has reported this abuse to school administrators but administrators have not stopped the abuse. A Periscope Report provides a information
            sheet showing every time the bully has been reported and certain information regarding the abuse involved in the incident; it is a complete history of the bully’s behavior. It shows just how many strikes this bully has against them and the level of bullying the administrators are
            tolerating from this bully. The Periscope Report is one of the main functions in BullyBloxx that separates BullyBloxx from all other anti-bullying systems. It literally allows parents to look over the wall of the school and see everything regarding bullying in the school. It provides
            parents with valuable evidence that has never been available to them before now due to FERPA laws. With this information and evidence parents have what they need to get abuse of their child stopped. By viewing the “How to Quickly Shut Down a Bully with BullyBloxx” video you will be
            provided step by step instructions for using a Periscope Report. Please{" "} */}
            <iframe width="300px" height="400" src={`https://www.youtube.com/embed/STiksvFv9KQ`} title="periscope" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <span className="text-primary d-block" onClick={() => setModal(false)} role="button">
              CLICK HERE
            </span>{" "}
            to request A Periscope Report.
          </ModalBody>
        )}
      </Modal>
    </Row>
  )
}

export default Periscope
