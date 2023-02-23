import DataTable from "react-data-table-component"
import useSchool from "../hooks/school.hook"
import { Badge, Button, Modal, ModalHeader, ModalBody } from "reactstrap"

import BASE_URL from "../misc/url"
import { useContext, useEffect, useState } from "react"
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
  const [approved, setApproved] = useState("")
  const [search, setSearch] = useState()
  const navigate = useNavigate()

  if (!token || role !== "ADMIN") navigate("/")
  const approve = async (id, deny = "") => {
    const url = deny ? `${id}?type=deny` : id

    const response = await fetch(`${BASE_URL}approve/school/${url}`, {
      method: "PUT",
      body: JSON.stringify({}),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getItem("bly_token")}`
      })
    })

    await response.json()
    if (response.status < 400) {
      if (!deny) setApproved("Approved")
      else setApproved("Denied")

      await sendEmail(deny)
      toast("success")
      getSchools()
      return
    }
    toast("approval fails")
  }

  const toggle = () => {
    setModal(!modal)
    setApproved("")
  }

  const sendEmail = async (sent = "") => {
    if (sent.length) return
    const response = await fetch(`${BASE_URL}send/mail`, {
      method: "POST",
      body: JSON.stringify({
        to: report.business_email,
        subject: "Sponsorship Approval",
        html: `Dear  ${report?.realtor_name || report.user.first_name} <br/><br/>
        Thank you for stepping up for your community by serving as a Bully Shut Down Ambassador. Your Sponsorship request for ${report.school_name} with zip code ${report.zip_code}  has been approved. <br/><br/>

        Private donations ranging from $300 - $650 may already be in your school’s wallet depending on the demographics and location of your school. You can determine this by simply entering your school and it’s zip code in the search engine on the Get Your School Protected tab on the home page of bullybloxx.com <br/><br/>

        Now that you are approved as a Bully Shutdown Ambassador please go to the home page of bullybloxx.com , click on the more tab at the top and then click on the Bully Shutdown Ambassador tab that drops dow to access all information for moving forward.<br/><br/>
        
        Your Sponsorship request for ${report.school_name} with zip code ${report.zip_code} has been approved`
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getItem("bly_token")}`
      })
    })
    const j = await response.json()
    if (j.message === "success") toast(`email sent @${report?.user?.username || ""} `)
    else toast("error sending mail")
  }

  const filter = (dt) => () => {
    if (dt === "all") {
      setSearch(school)
      return
    }
    const filterd = school.filter((e) => e.approved === dt)
    setSearch(filterd)
  }

  useEffect(() => {
    setSearch(school)
  }, [school])

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
            setApproved(false)
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
      <div className="text-center gap-3 py-2">
        <Button className="btn-primary" onClick={filter("all")}>
          All
        </Button>
        <Button className="btn-success mx-3" onClick={filter("approved")}>
          Approved
        </Button>
        <Button className="btn-danger" onClick={filter("pending")}>
          Pending
        </Button>
      </div>

      {token ? <DataTable columns={columns} title="Sponsored Scools" pagination data={search} /> : ""}
      <Modal isOpen={modal} toggle={toggle} backdrop={backdrop}>
        {Object.keys(report).length ? (
          <>
            <ModalHeader toggle={toggle}>
              {report?.school_name.toUpperCase()} - <small className="text-muted">{report.zip_code}</small> <br />
              {report.approved === "pending" && !approved.length ? (
                <>
                  <Button onClick={() => approve(report.id)} className="rounded-pill" size="sm">
                    Approve
                  </Button>
                  <Button onClick={() => approve(report.id, "denied")} className="rounded-pill btn-danger ms-3" size="sm">
                    Deny
                  </Button>
                </>
              ) : (
                <Badge color="success" pill>
                  <span style={{ fontSize: ".6rem" }}>{approved || report?.approved}</span>
                </Badge>
              )}
            </ModalHeader>
            <ModalBody>
              <p>
                {report.realtor_name}
                <small className="text-muted d-block">Sponsor Name</small>
              </p>
              <p>
                {report?.business_name}
                <small className="text-muted d-block">Business Name</small>
              </p>
              <p>
                {report?.user?.username || "Not avalible"}
                <small className="text-muted d-block">User Name</small>
              </p>
              <p>
                {report?.business_email}
                <small className="text-muted d-block">Business Email</small>
              </p>
              <p>
                {report?.business_mobile}
                <small className="text-muted d-block">Business contact</small>
              </p>
              <p>
                {report?.business_website}
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
