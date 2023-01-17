/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { getItem } from "../misc/helper"
import BASE_URL from "../misc/url"
import { Button, Col, Input, Row } from "reactstrap"
import { Icontroller } from "./signup"
import useSchool from "../hooks/school.hook"
import { toast } from "react-toastify"
import AppContext from "../misc/appContext"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import { bullyTemplate, templateSchoolThreat, templateWeaponThreat } from "../misc/template"

const Report = () => {
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors }
  } = useForm()
  const [upload, setUpload] = useState("")
  const [loading, setLoading] = useState(false)
  const [blob, setBlob] = useState("")
  const { school, getSchools } = useSchool()
  const [schoolOPt, setOptions] = useState([])
  const [chosenSchool, setChosenSchool] = useState({})
  const { token, reporter } = useContext(AppContext)
  const [notify, setNotify] = useState(false)
  const [otherData, setOtherData] = useState({})
  const [reportType, setReportType] = useState("")
  const [sentReport, setSentReport] = useState("")
  const navigate = useNavigate()
  // const reporter =  user()

  const preview = (e) => {
    const url = e.target.files[0]
    const blobUrl = URL.createObjectURL(url)
    setBlob(blobUrl)
    setUpload(url)
  }

  const options = () => {
    const opt = []
    console.log(school)
    school.forEach((e) => {
      opt.push({
        value: e.zip_code,
        label: e.school_name + " (" + e.zip_code + ")",
        zap: e.school_name
      })
    })
    setOptions(opt)
  }

  const chooseSchool = (e) => {
    console.log(e)
    setChosenSchool(e)
  }

  const getSigned = () => {
    if (!token) {
      navigate("/signin")
      toast("login to send report")
    }
  }

  const report = async (data) => {
    // console.log(data)
    // return
    let html = ""

    const { email: reporterEmail, ...others } = reporter
    const templateRush = {
      ...data,
      ...otherData,
      ...chosenSchool,
      ...others,
      reporterEmail: reporterEmail
    }
    const bullyT = bullyTemplate(templateRush)
    const templateWeapon = templateWeaponThreat(templateRush)
    const threat = templateSchoolThreat(templateRush)

    if (reportType === "bullying") html = bullyT
    if (reportType === "weapon in school") html = templateWeapon
    if (reportType === "threats against school") html = threat

    console.log(templateRush)
    console.log(html)
    return

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("upload", upload)
      formData.append("school_name", chosenSchool.zap)
      formData.append("zip_code", chosenSchool.value)
      const j = Object.keys(data)
      const k = Object.keys(otherData)

      j.forEach((e) => formData.append(e, data[e]))
      k.forEach((e) => formData.append(e, otherData[e]))

      const response = await fetch(`${BASE_URL}report`, {
        method: "POST",
        body: formData,
        headers: new Headers({
          "Authorization": `Bearer ${getItem("bly_token")}`
        })
      })

      await response.json()

      if (response.status === 200) {
        setLoading(false)
        // setUpload("")
        reset()

        toast("report sent successfully")
        const mat = { to: data.email, subject: otherData.report_type, html: html }
        await sendEmail(mat)
        if (notify) {
          mat.to = reporterEmail
          await sendEmail(mat)
        }

        return
      }
      toast("unable to send report try again latter")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleEv = (e) => {
    if (e.target.name === "report_type") setReportType(e.target.value)
    setOtherData({ ...otherData, [e.target.name]: e.target.value })
  }

  const sendEmail = async (data) => {
    const response = await fetch(`${BASE_URL}send/mail`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getItem("bly_token")}`
      })
    })
    const j = await response.json()
    if (j.message === "success") toast("email sent")
    else toast("error sending mail")
  }

  useEffect(() => {
    getSigned()
    if (!schoolOPt.length) options()
  }, [school])

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
              <div className="my-2">
                <label>Report Type</label>
                <Input type="select" name="report_type" className="shadow-none" onChange={handleEv}>
                  <option value=""></option>
                  <option value="bullying">Bullying</option>
                  <option value="threats against school">Threats against school</option>
                  <option value="weapon in school">Weapon in school</option>
                </Input>
              </div>

              {!reportType ? (
                ""
              ) : (
                <>
                  {reportType === "bullying" && (
                    <p>
                      I have information involving bullying in your school. I am reporting this
                      information through The BullyBloxx system. If you are not familiar with The
                      BullyBloxx system please go to www.bullybloxx.com for details. Once you are on
                      the site if you will click on the School Administrator tab at the top of the
                      Home page complete instructions for BullyBloxx will be provided for you. On
                      the home page is a search bar where you can enter my username (provided below)
                      and review my identification video. Thank you I am a trustee reporting this
                      information for a student who requests to not be identified; however, I will
                      act as an intermediary so you can immediately access any additional
                      information that you may need.
                    </p>
                  )}

                  {reportType === "weapon in school" && (
                    <p>
                      To report a WEAPON IN THE SCHOOL complete the form below and click SUBMIT
                      REPORT. The report will automatically be sent by email to the principal: Dear
                      Principal, I have information involving a weapon in your school. I am
                      reporting this threat through The BullyBloxx system.
                    </p>
                  )}

                  {reportType === "threats against school" && (
                    <p>
                      To report a school shooter or any type threat against a school complete the
                      form below and click SUBMIT REPORT. The report will automatically be sent by
                      email to the principal: Dear Principal, I have information involving a threat
                      against your school. I am reporting this threat through The BullyBloxx system.
                    </p>
                  )}

                  <label className="py-1">
                    <Input
                      type="radio"
                      name="trustee"
                      className="me-2"
                      value="I am
                    a trustee reporting this information for another individual who requests to not
                    be identified; however, I will act as an intermediary so you can immediately
                    access any additional information you need."
                      onChange={handleEv}
                    />{" "}
                    I am a trustee reporting this information for another individual who requests to
                    not be identified; however, I will act as an intermediary so you can immediately
                    access any additional information you need.
                  </label>
                  <label className="py-1">
                    <Input
                      type="radio"
                      name="trustee"
                      className="me-2"
                      value="not a trustee for someone else, I am submitting this information on my own
                    behalf."
                      onChange={handleEv}
                    />{" "}
                    I am not a trustee for someone else, I am submitting this information on my own
                    behalf.
                  </label>

                  <Icontroller
                    type="email"
                    name="email"
                    placeholder="Principal Email"
                    errors={errors}
                    register={register}
                    others={{
                      required: true,
                      pattern: /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g
                    }}
                    message="Please use a valid email format"
                  />
                  {/* <Icontroller name="email" placeholder="Principal Email" control={control} /> */}

                  <div className="mb-2">
                    <label className="py-1">Name of School</label>
                    <Select options={schoolOPt} onChange={chooseSchool} />
                  </div>

                  <Icontroller
                    type="text"
                    placeholder="Bully First Name"
                    name="bully_fname"
                    errors={errors}
                    register={register}
                    others={{
                      required: true
                    }}
                    message="required"
                  />
                  <Icontroller
                    type="text"
                    placeholder="Bully last Name"
                    name="bully_lname"
                    errors={errors}
                    register={register}
                    others={{
                      required: true
                    }}
                    message="rquired"
                  />
                  <div className="mb-2">
                    <label className="py-1">Gender of bully</label>
                    <select
                      name="bully_gender"
                      className="mb-1 form-control shadow-none"
                      {...register("bully_gender", { required: true })}
                    >
                      <option></option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors["bully_gender"] ? <p className="text-danger">required</p> : ""}
                  </div>

                  <Icontroller
                    type="text"
                    placeholder="Grade of Bully"
                    name="bully_grade"
                    errors={errors}
                    register={register}
                    others={{
                      required: true
                    }}
                    message="required"
                  />

                  <Icontroller
                    type="text"
                    placeholder="Homeroom Teacher of bully"
                    name="bully_teacher"
                    errors={errors}
                    register={register}
                    others={{
                      required: true
                    }}
                  />
                  <Icontroller
                    type="date"
                    placeholder="Date of Incident"
                    name="incident_date"
                    errors={errors}
                    register={register}
                    others={{
                      required: true
                    }}
                  />
                  <Icontroller
                    type="time"
                    placeholder="Time of Incident"
                    name="incident_time"
                    errors={errors}
                    register={register}
                    others={{
                      required: true
                    }}
                  />
                  <Icontroller
                    type="text"
                    placeholder="Where did this incident occur? Be specific."
                    name="incident_place"
                    errors={errors}
                    register={register}
                    others={{
                      required: true
                    }}
                  />

                  {/* threat section */}
                  {reportType === "threats against school" && (
                    <>
                      <div className="mb-2">
                        <label className="py-1">
                          Do any other people/students have knowledge of this threat?{" "}
                        </label>
                        <select
                          name="threat_student_aware"
                          className="mb-1 form-control shadow-none"
                          {...register("threat_student_aware", { required: true })}
                        >
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors["threat_student_aware"] ? (
                          <p className="text-danger">required</p>
                        ) : (
                          ""
                        )}
                      </div>
                      <Icontroller
                        type="text"
                        placeholder="If yes, what are their names? (if more than one person, separate their names using commas)"
                        name="threat_other_student"
                        errors={errors}
                        register={register}
                      />
                      {/* <div className="mb-2">
                        <label className="py-1">
                          Do any other people/students have knowledge of this threat?{" "}
                        </label>
                        <textarea
                          name="threat_details"
                          className="mb-1 form-control shadow-none"
                          {...register("threat_details")}
                        />
                      </div> */}
                      <Icontroller
                        type="text"
                        placeholder="In complete detail provide all information you have on this threat."
                        name="threat_details"
                        errors={errors}
                        register={register}
                      />
                    </>
                  )}

                  {/* weapon section */}
                  {reportType === "weapon in school" && (
                    <>
                      <Icontroller
                        type="text"
                        placeholder="What type of weapon is this?"
                        name="w_type"
                        errors={errors}
                        register={register}
                        others={{
                          required: true
                        }}
                      />
                      <div className="mb-2">
                        <label className="py-1">
                          Do any other people/students have knowledge of this threat?
                        </label>
                        <select
                          name="w_student_aware"
                          className="mb-1 form-control shadow-none"
                          {...register("threat_student_aware")}
                        >
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      <div className="mb-2">
                        <label className="py-1">
                          If yes, what are their names? (if more than one person, separate their
                          names using commas)
                        </label>
                        <textarea
                          name="w_other_students"
                          className="mb-1 form-control shadow-none"
                          {...register("w_other_students")}
                        />
                      </div>

                      {/* <div className="mb-2">
                        <label className="py-1">
                          Do any other people/students have knowledge of this threat?
                        </label>
                        <select
                          name="w_sknow"
                          className="mb-1 form-control shadow-none"
                          {...register("w_sknow")}
                        >
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div> */}

                      <div className="mb-2">
                        <label className="py-1">
                          In complete detail provide all information you have on this threat. names
                          using commas)
                        </label>
                        <textarea
                          name="w_details"
                          className="mb-1 form-control shadow-none"
                          {...register("w_details")}
                        />
                      </div>
                    </>
                  )}

                  {/* bully section */}
                  {reportType === "bullying" && (
                    <>
                      <div className="mb-2">
                        <label className="py-1">
                          Did any teacher or staff member see this incident?
                        </label>
                        <select
                          name="staff_witnessed"
                          className="mb-1 form-control shadow-none"
                          {...register("staff_witnessed", { required: true })}
                        >
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors["staff_witnessed"] ? <p className="text-danger">required</p> : ""}
                      </div>

                      <Icontroller
                        type="text"
                        placeholder="If yes, who was the teacher / staff member?"
                        name="staff_witness"
                        errors={errors}
                        register={register}
                      />
                      <Icontroller
                        type="text"
                        placeholder="What actions did the teacher / staff member take?"
                        name="staff_action"
                        errors={errors}
                        register={register}
                      />

                      <div className="mb-2">
                        <label className="py-1">Did the bully physically abuse the victim?</label>
                        <select
                          name="physical_abuse"
                          className="mb-1 form-control shadow-none"
                          {...register("physical_abuse", { required: true })}
                        >
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors["physical_abuse"] ? <p className="text-danger">required</p> : ""}
                      </div>

                      <div className="mb-2">
                        <label className="py-1">Is the victim handicapped</label>
                        <select
                          name="victim_handicapped"
                          className="mb-1 form-control shadow-none"
                          {...register("victim_handicapped", { required: true })}
                        >
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors["victim_handicapped"] ? (
                          <p className="text-danger">required</p>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="mb-2">
                        <label className="py-1">Is the victim younger?</label>
                        <select
                          name="victim_younger"
                          className="mb-1 form-control shadow-none"
                          {...register("victim_younger", { required: true })}
                        >
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors["victim_younger"] ? <p className="text-danger">required</p> : ""}
                      </div>

                      <div className="mb-2">
                        <label className="py-1">
                          Have you witnessed this bully abusing this same victim/student in the
                          past?
                        </label>
                        <select
                          name="bully_witnessed"
                          className="mb-1 form-control shadow-none"
                          {...register("bully_witnessed", { required: true })}
                        >
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors["bully_witnessed"] ? <p className="text-danger">required</p> : ""}
                      </div>

                      <div className="mb-2">
                        <label className="py-1">
                          Have you witnessed this bully abusing this same victim/student in the
                          past?
                        </label>
                        <select
                          name="serail_bully"
                          className="mb-1 form-control shadow-none"
                          {...register("serail_bully", { required: true })}
                        >
                          <option></option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors["serail_bully"] ? <p className="text-danger">required</p> : ""}
                      </div>

                      {/* <Icontroller
                        name="serail_bully"
                        placeholder="Have you witnessed this bully abusing other students in the past?"
                        control={control}
                        type="select"
                        opt={
                          <>
                            <option></option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </>
                        }
                      /> */}
                      <div className="mb-2">
                        <label className="py-1">
                          If Yes, please provide any details of other bullying incidents that you
                          have witnessed or seen in the past involving this bully.
                        </label>
                        <textarea
                          name="details"
                          className="mb-1 form-control shadow-none"
                          {...register("details")}
                        />
                      </div>
                      <div className="mb-2">
                        <label className="py-1">
                          If more than one bully add their names here Names of any other students
                          that supported the bully’s actions
                        </label>
                        <textarea
                          name="other_incident"
                          className="mb-1 form-control shadow-none"
                          {...register("other_incident")}
                        />
                      </div>
                    </>
                  )}

                  {/* <div className="mb-2">
                    <label className="py-1">
                      <Input
                        type="checkbox"
                        className="me-2"
                        onChange={(e) => setNotify(e.target.checked)}
                      />
                      Please send me a reply email confirming that you have received this
                      information, this will allow me to know that the information that I have
                      submitted is being properly addressed. Thank you.
                    </label>
                  </div> */}

                  <Button
                    bsSize="sm"
                    disabled={loading}
                    color="dark"
                    className="mb-3 shadow-none form-control"
                    type="submit"
                  >
                    Send Report
                  </Button>
                </>
              )}
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
