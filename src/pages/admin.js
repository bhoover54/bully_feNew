import DataTable from "react-data-table-component"
import useSchool from "../hooks/school.hook"
import BASE_URL from "../misc/url"

const Admin = () => {
  const { school, getSchools } = useSchool()

  const approve = async (id) => {
    console.log(id)
    const response = await fetch(`${BASE_URL}approve/school/${id}`, {
      method: "PUT",
      body: JSON.stringify({}),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    const result = await response.json()
    if (response.status < 400) {
      console.log(result)
      getSchools()
      return
    }
    console.log(result)
  }

  const columns = [
    {
      name: "School Name",
      selector: (row) => row.school_name
    },
    {
      name: "ZipCode",
      selector: (row) => row.zipCode
    },
    {
      name: "Status",
      //   selector: (row) => row.year,
      cell: (row) => (
        <>
          {row.approved === "pending" ? (
            <button onClick={() => approve(row.id)}>approve</button>
          ) : (
            row.approved
          )}
        </>
      )
    }
  ]

  return (
    <div>
      <DataTable columns={columns} data={school} />
    </div>
  )
}

export default Admin
