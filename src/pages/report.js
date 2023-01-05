import { useState } from "react"
import { useForm } from "react-hook-form"
import { getItem } from "../misc/helper"
import BASE_URL from "../misc/url"
import { Button, Col, Input, Row } from "reactstrap"

const Report = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()
  const [upload, setUpload] = useState("")
  const [blob, setBlob] = useState("")

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

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="email"
                name="email"
                placeholder="email"
                {...register("email", {
                  pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                })}
              />
              {errors.email && "invalid email format"}

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="text"
                placeholder="Report Type"
                {...register("report_type")}
              />

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="text"
                placeholder="Scool Name"
                {...register("school_name")}
              />

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="text"
                placeholder="Zip code"
                {...register("zip_code")}
              />

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="text"
                placeholder="Bully Teaher"
                {...register("bully_teacher")}
              />

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="text"
                placeholder="Bully First Name"
                {...register("bully_fname")}
              />

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="text"
                placeholder="Bully Last Name"
                {...register("bully_lname")}
              />

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="text"
                placeholder="Bully Gender "
                {...register("bully_gender")}
              />

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="text"
                placeholder="Bully Grade "
                {...register("bully_grade")}
              />

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="date"
                placeholder="Incident Date"
                {...register("incident_date")}
              />

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="time"
                placeholder="Incident Time"
                {...register("incident_time")}
              />

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="text"
                placeholder="Staff Presence?"
                {...register("staff_witnessed")}
              />

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="text"
                placeholder="Staff Name?"
                {...register("staff_witness")}
              />

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="text"
                placeholder="Staff Action?"
                {...register("staff_action")}
              />

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="text"
                placeholder="Incident Place?"
                {...register("inceident_place")}
              />

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="text"
                placeholder="Pysical Abused? "
                {...register("physical_abuse")}
              />

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="text"
                placeholder="Victim Hhandicapped? "
                {...register("victim_handicapped")}
              />

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="text"
                placeholder="Victim Younger? "
                {...register("victim_younger")}
              />

              <Input
                bsSize="sm"
                className="mb-3 shadow-none"
                type="text"
                placeholder="Details? "
                {...register("details")}
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
