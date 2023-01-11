import DataTable from "react-data-table-component"
import useSchool from "../hooks/school.hook"
import { Button } from "reactstrap"

import BASE_URL from "../misc/url"
const AdminSponsor = () => {
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
      name: "Wallet Balance",
      selector: (row) => row.wallet.balance
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
    <div className=" px-0 rounded shadow overflow-hidden">
      <DataTable columns={columns} title="Sponsored Scools" pagination data={school} />
    </div>
  )
}

export default AdminSponsor
