import { useState } from "react"
import { useForm } from "react-hook-form"
import { getItem } from "../misc/helper"
import BASE_URL from "../misc/url"
import { Button, Col, Input, Row } from "reactstrap"
import { Icontroller } from "./signup"
import useSchool from "../hooks/school.hook"

const Report = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm()
  const [upload, setUpload] = useState("")
  const [blob, setBlob] = useState("")
  const { school, getSchools } = useSchool()
  console.log(school)
  const preview = (e) => {
    const url = e.target.files[0]
    const blobUrl = URL.createObjectURL(url)
    setBlob(blobUrl)
    setUpload(url)
  }

  const report = async (data) => {
    const formData = new FormData()
    formData.append("upload", upload)
    const j = Object.keys(data)
    j.forEach((e) => formData.append(e, data[e]))
    console.log(formData)
    const response = await fetch(`${BASE_URL}report`, {
      method: "POST",
      body: formData,
      headers: new Headers({
        "Authorization": `Bearer ${getItem("bly_token")}`
      })
    })
    const result = await response.json()
    if (response.status === 200) {
      console.log(result, response.status)
      setUpload("")
      reset()
    }
    console.log(response.status)
  }

  return (
    <Row>
      <Col md="6" className="mx-auto mb-5">
        <form onSubmit={handleSubmit(report)} encType="multipart/form-data">
          <p>Upload a video evidence to proceed</p>
          <Input
            bsSize="sm"
            className="mb-3 shadow-none"
            type="file"
            name="video"
            placeholder="Video Evidence? "
            onChange={preview}
            accept="video/*"
            role="button"
          />

          {upload ? (
            <>
              <video width="100%" controls className="mb-3">
                <source src={blob} />
                Your browser does not support HTML5 video.
              </video>

              <Icontroller name="email" placeholder="Email" control={control} />
              <Icontroller name="report_type" placeholder="Report Type" control={control} />
              <Icontroller
                name="school_name"
                placeholder="School name"
                control={control}
                type="select"
                opt={
                  <>
                    <option>select</option>
                    {school.map((e) => (
                      <option value={e.school_name}>
                        {e.school_name} (zip code: {e.zip_code})
                      </option>
                    ))}
                  </>
                }
              />
              {/* <Icontroller name="zip_code" placeholder="Zip code" control={control} /> */}
              <Icontroller name="bully_teacher" placeholder="Bully Teacher" control={control} />
              <Icontroller name="bully_fname" placeholder="Bully First Name" control={control} />
              <Icontroller name="bully_lname" placeholder="Bully Last Name" control={control} />
              <Icontroller name="bully_gender" placeholder="Bully Gender" control={control} />
              <Icontroller name="bully_grade" placeholder="Bully Grade" control={control} />
              <Icontroller
                name="incident_date"
                type="date"
                placeholder="Incident date"
                control={control}
              />
              <Icontroller
                name="incident_time"
                type="time"
                placeholder="Incident time"
                control={control}
              />
              <Icontroller name="staff_witness" placeholder="Staff Name" control={control} />
              <Icontroller name="staff_action" placeholder="Staff Action" control={control} />
              <Icontroller name="inceident_place" placeholder="Incident Place?" control={control} />
              <Icontroller name="physical_abuse" placeholder="Pysical Abused? " control={control} />
              <Icontroller
                name="victim_handicapped"
                placeholder="Victim Hhandicapped? "
                control={control}
              />
              <Icontroller
                name="victim_younger"
                placeholder=" Victim Younger?  "
                control={control}
              />
              <Icontroller
                name="details"
                placeholder="Details?"
                type="textarea"
                control={control}
              />
              <Icontroller
                name="other_incident"
                placeholder="Other Incident?"
                type="textarea"
                control={control}
              />

              <Button
                bsSize="sm"
                color="dark"
                className="mb-3 shadow-none form-control"
                type="submit"
              >
                Send Report
              </Button>
            </>
          ) : (
            ""
          )}
        </form>
      </Col>
    </Row>
  )
}

export default Report
