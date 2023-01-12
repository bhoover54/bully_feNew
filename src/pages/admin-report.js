/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Col } from "reactstrap"
import BASE_URL from "../misc/url"
import { getItem } from "../misc/helper"
import DataTable from "react-data-table-component"

const AdminReport = () => {
  const [reports, setReports] = useState([])
  const [report, setReport] = useState("")

  const [modal, setModal] = useState(false)
  const [backdrop, setBackdrop] = useState(true)
  const [keyboard, setKeyboard] = useState(true)

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
    {
      name: "Reporter",
      selector: (row) => row.user.fullName
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

  const reportTenplate = (reqBody) => `  
  report type ${reqBody.report_type}
  Your Full Name ${reqBody.user?.fullName}<br />
  Your cell phone number ${reqBody.user?.phone}<br />
  My e-mail address ${reqBody.user?.email}<br />
  Name of School ${reqBody.school_name}<br />
  zip of School ${reqBody.zip_code}<br />
  Principal’s email address ${reqBody.admin_email}<br />

  Full name of bully ${reqBody.bully_fname + " " + reqBody.bully_lname}<br />
  Gender of bully: ${reqBody.gender}<br />
  Grade of bully. ${reqBody.bully_grade}<br />
  Homeroom Teacher of bully ${reqBody.bully_teacher}<br />
  Date of incident ${reqBody.incident_date}<br />
  Time of incident ${reqBody.incident_time}<br />
  If more than one bully add their names here ${reqBody.more_bullies}<br />
  Names of any other students that supported the bully’s actions ${reqBody.other_incidents}
  <br />
  Did any teacher or staff member see this incident? ${reqBody.staff_witnessed}<br />
  If yes, who was the teacher / staff member? ${reqBody.staff_witness}
  <br />
  What actions did the teacher / staff member take? ${reqBody.staff_action}<br />
  Where did this incident occur? ${reqBody.incident_place}<br />
  Did the bully physically abuse the victim? ${reqBody.physically_abused}<br />
  Was the victim a handicapped student? ${reqBody.victim_handicapped}<br />
  Was the victim a
  younger or smaller student than the bully? ${reqBody.victim_younger}<br />
  In complete detail provide all information you have on this threat. ${reqBody.details}
  <br />
  Have you witnessed this bully abusing other students in the past? ${reqBody.serial_bully}
  <br />
  If Yes, please provide any details of other bullying incidents that
  you have witnessed or seen in the past involving this bully. ${reqBody.other_incidents}<br />
  Please send me a reply email confirming that you have received this
  information, this will allow me to know that the information that I
  have submitted is being properly addressed. Thank you.<br />`

  useEffect(() => {
    getReport()
  }, [])
  return (
    <Row>
      <Col className=" px-0 rounded shadow overflow-hidden">
        <DataTable columns={columns} data={reports} title="Reports" />
      </Col>
      <Modal isOpen={modal} toggle={toggle} backdrop={backdrop}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <div dangerouslySetInnerHTML={{ __html: reportTenplate(report) }} />
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>
    </Row>
  )
}

export default AdminReport
