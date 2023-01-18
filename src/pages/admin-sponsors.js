import DataTable from "react-data-table-component"
import useSchool from "../hooks/school.hook"
import { Badge, Button, Modal, ModalHeader, ModalBody } from "reactstrap"

import BASE_URL from "../misc/url"
import { useContext, useState } from "react"
import AppContext from "../misc/appContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getItem } from "../misc/helper"
const AdminSponsor = () => {
  const { school, getSchools } = useSchool()
  const { token, role } = useContext(AppContext)
  const [modal, setModal] = useState(false)
  const [backdrop] = useState(true)
  const [report, setReport] = useState({})
  const navigate = useNavigate()
  if (!token || role !== "ADMIN") navigate("/")
  const approve = async (id) => {
    const response = await fetch(`${BASE_URL}approve/school/${id}`, {
      method: "PUT",
      body: JSON.stringify({}),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })

    await response.json()
    if (response.status < 400) {
      await sendEmail()
      getSchools()
      return
    }
  }

  const toggle = () => setModal(!modal)

  const sendEmail = async () => {
    const response = await fetch(`${BASE_URL}send/mail`, {
      method: "POST",
      body: JSON.stringify({
        to: report.user.email,
        subject: "Sponsorship Approval",
        html: ` Dear  ${report.user.first_name} <br/>Your Sponsorship request for ${report.school_name} with zip code ${report.zip_code} has been approved`
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getItem("bly_token")}`
      })
    })
    const j = await response.json()
    if (j.message === "success") toast(`email sent ${report.user.fullName}`)
    else toast("error sending mail")
  }

  const columns = [
    {
      name: "S/N",
      cell: (row, i) => <>{i + 1}</>
    },
    {
      name: "School Name",
      selector: (row) => row.school_name
    },
    {
      name: "Zip Code",
      selector: (row) => row.zip_code
    },
    {
      name: "Business Name",
      selector: (row) => row.business_name
    },
    {
      name: "Business Email",
      selector: (row) => row.business_email
    },
    {
      name: "Business Mobile",
      selector: (row) => row.business_mobile
    },

    {
      name: "More",
      cell: (row) => (
        <Button
          size="sm"
          color="dark"
          className="rounded-pill px-3"
          onClick={() => {
            // console.log(row.id)
            toggle()
            setReport(row)
          }}
        >
          view
        </Button>
      )
    }
  ]

  return (
    <div className=" px-0 rounded shadow overflow-hidden">
      {token ? (
        <DataTable columns={columns} title="Sponsored Scools" pagination data={school} />
      ) : (
        ""
      )}
      <Modal isOpen={modal} toggle={toggle} backdrop={backdrop}>
        {Object.keys(report).length ? (
          <>
            <ModalHeader toggle={toggle}>
              {report?.school_name.toUpperCase()} -{" "}
              <small className="text-muted">{report.zip_code}</small> <br />
              {report.approved === "pending" ? (
                <Button onClick={() => approve(report.id)} className="rounded-pill" size="sm">
                  Approve
                </Button>
              ) : (
                <Badge color="success" pill>
                  <span style={{ fontSize: ".6rem" }}>approved</span>
                </Badge>
              )}
            </ModalHeader>
            <ModalBody>
              <p>
                {report.user.fullName}
                <small className="text-muted d-block">Sponsor Name</small>
              </p>
              <p>
                {report.business_name}
                <small className="text-muted d-block">Business Name</small>
              </p>
              <p>
                {report.business_email}
                <small className="text-muted d-block">Business Email</small>
              </p>
              <p>
                {report.business_mobile}
                <small className="text-muted d-block">Business contact</small>
              </p>
              <p>
                {report.business_website}
                <small className="text-muted d-block">Business Website</small>
              </p>
              <p>
                ${report.wallet?.balance || 0}
                <small className="text-muted d-block">Wallet Balance</small>
              </p>
            </ModalBody>
          </>
        ) : (
          ""
        )}
      </Modal>
    </div>
  )
}

export default AdminSponsor
