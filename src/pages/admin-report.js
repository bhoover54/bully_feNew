/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { Row, Modal, ModalHeader, ModalBody, Button, Col } from "reactstrap"
import BASE_URL from "../misc/url"
import { getItem } from "../misc/helper"
import DataTable from "react-data-table-component"
import AppContext from "../misc/appContext"
import { useNavigate } from "react-router-dom"
import { bullyTemplate2, templateSchoolThreat2, templateWeaponThreat2 } from "../misc/report-template"

const AdminReport = () => {
  const [reports, setReports] = useState([])
  const [report, setReport] = useState("")

  const [modal, setModal] = useState(false)
  const [backdrop, setBackdrop] = useState(true)
  const { token, role } = useContext(AppContext)
  const navigate = useNavigate()
  if (!token || role !== "ADMIN") navigate("/")
  const columns = [
    {
      name: "S/N",
      cell: (row, i) => <>{row.id}</>
    },
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
    {
      name: "Reporter",
      selector: (row) => row?.user?.fullName || row?.first_name + " " + row?.last_name
    },
    {
      name: "Bully Type",
      selector: (row) => row?.report_type
    },
    {
      name: "School Name",
      selector: (row) => row.school_name
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
            View
          </Button>
        </>
      )
    }
  ]

  const toggle = () => setModal(!modal)

  const getReport = async () => {
    const response = await fetch(`${BASE_URL}reports`, {
      headers: new Headers({
        "Authorization": `Bearer ${getItem("bly_token")}`
      })
    })

    const result = await response.json()
    if (response.status === 200) {
      //   //console.log(result)
      setReports(result.data)
      //   //console.log(result, response.status)
    }
  }

  const reportTenplate = (reqBody) => {
    let html = ""
    if (reqBody.report_type === "bullying") html = bullyTemplate2(reqBody)
    if (reqBody.report_type === "weapon in school") html = templateWeaponThreat2(reqBody)
    if (reqBody.report_type === "threats against school") html = templateSchoolThreat2(reqBody)

    return html
  }
  useEffect(() => {
    getReport()
  }, [])

  return (
    <Row>
      <Col className=" px-0 rounded shadow overflow-hidden">
        <DataTable columns={columns} data={reports} title="Reports" pagination={true} paginationPerPage="10" />
      </Col>
      <Modal isOpen={modal} toggle={toggle} backdrop={backdrop}>
        <ModalHeader toggle={toggle}>{report.report_type}</ModalHeader>
        <ModalBody>
          <div dangerouslySetInnerHTML={{ __html: reportTenplate(report) }} />
        </ModalBody>
      </Modal>
    </Row>
  )
}

export default AdminReport
