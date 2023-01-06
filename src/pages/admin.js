import DataTable from "react-data-table-component"
import { Col, Row, Button } from "reactstrap"
import useSchool from "../hooks/school.hook"
import BASE_URL from "../misc/url"

const Admin = () => {
  const { school, getSchools } = useSchool()

  const approve = async (id) => {
    //console.log(id)
    const response = await fetch(`${BASE_URL}approve/school/${id}`, {
      method: "PUT",
      body: JSON.stringify({}),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    await response.json()
    if (response.status < 400) {
      //console.log(result)
      getSchools()
      return
    }
    //console.log(result)
  }

  const columns = [
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
      name: "Business Type",
      selector: (row) => row.business_type
    },
    {
      name: "Business Website",
      selector: (row) => row.business_website
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          {row.approved === "pending" ? (
            <Button color="dark" onClick={() => approve(row.id)}>
              Approve
            </Button>
          ) : (
            row.approved
          )}
        </>
      )
    }
  ]

  return (
    <Row>
      <Col md="2">menu</Col>
      {/* <Col md="1"></Col> */}
      <Col md="10" className=" px-0 rounded shadow overflow-hidden">
        <DataTable columns={columns} title="Registered Scools" pagination data={school} />
      </Col>
    </Row>
  )
}

export default Admin
