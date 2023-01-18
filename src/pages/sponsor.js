/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import { useForm } from "react-hook-form"
import BASE_URL from "../misc/url"
import { getItem, setItem } from "../misc/helper"
import { useContext, useState } from "react"
import { Button, Col, Input, Modal, ModalBody, Row } from "reactstrap"
import { Icontroller } from "./signup"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AppContext from "../misc/appContext"

const Sponsor = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors }
  } = useForm()
  const navigate = useNavigate()
  const {
    handleSubmit: handleSubmit2,
    reset: reset2,
    register: register2,
    formState: { errors: error2 }
  } = useForm()
  const [message, setMessage] = useState("")
  const [found, setFound] = useState({})
  const [loading, setLoading] = useState(false)
  const { token } = useContext(AppContext)
  const [blob, setBlob] = useState("")
  const [upload, setUpload] = useState("")
  const [modal, setModal] = useState(false)
  const [backdrop, setBackdrop] = useState(true)

  const [stage, setStage] = useState("intro")

  const search = async (data) => {
    setLoading(true)
    const response = await fetch(`${BASE_URL}school/filter`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getItem("bly_token")}`
      })
    })
    const result = await response.json()
    if (response.status < 400) {
      if (!result.data) {
        setMessage(
          "Your school is currently not protected by the BullyBloxx System. To get this protection for your school please contact a local real estate professional and have them sign up as the Bully Shut Down Ambassador for your school by going to bullybloxx.com and clicking on the Real Estate Pros tab on the home page."
        )
      } else {
        setFound(result)
        setMessage("")
      }
      toggle()
      reset()
      toast.info("success")
      setLoading(false)
      return
    }
    setLoading(false)
    toast.info("not found")
  }

  const submitData = async (data) => {
    // console.log(data)
    // return
    if (!token) {
      toast("sign in to sponsor a school")
      return
    }

    const formData = new FormData()
    formData.append("upload", upload)
    formData.append("business_type", "real estate")
    const j = Object.keys(data)
    j.forEach((e) => formData.append(e, data[e]))
    //console.log(data)
    const response = await fetch(`${BASE_URL}sponsor/school`, {
      method: "POST",
      body: formData,
      headers: new Headers({
        // "Content-Type": "application/json",
        "Authorization": `Bearer ${getItem("bly_token")}`
      })
    })

    await response.json()
    if (response.status === 409) {
      toast("school already sponsored")
      setMessage("school already sponsored by another company")
      toggle()
      setUpload("")
      setBlob("")
      return
    }
    if (response.status < 400) {
      setMessage(
        "Thank you for stepping up for your community by serving as a Bully Shut Down Ambassador. Your application is pending and you will be contacted by email as soon as our staff approves your application. You can serve as a Bully Shut Down Ambassador for up to 3 schools, simply submit a separate application for each school. Once you are approved will receive instructions for moving forward through your email. Thank you."
      )
      toggle()
      reset2()
    }
  }

  const toggle = () => setModal(!modal)

  const preview = (e) => {
    const url = e.target.files[0]
    const blobUrl = URL.createObjectURL(url)
    setBlob(blobUrl)
    setUpload(url)
    setStage("form")
  }

  const changeStage = (value) => setStage(value)
  return (
    <>
      <Row>
        <Col md="5" className="mb-5">
          <h4 className="mb-3">Is your school protected? search to see.</h4>
          <form onSubmit={handleSubmit(search)}>
            <Icontroller
              type="text"
              name="school_name"
              placeholder="School name"
              register={register}
              errors={errors}
              others={{
                required: true
              }}
              message="School name is required"
            />
            <Icontroller
              type="number"
              name="zip_code"
              placeholder="Zip code"
              register={register}
              errors={errors}
              others={{
                required: true,
                maxLength: 5,
                minLength: 5
              }}
              message="Input a valid zip code"
            />

            <Button type="submit" color="dark" size="sm">
              Search
            </Button>
          </form>
        </Col>

        <Col md="1" />

        <Col md="6">
          <h4 className="mb-3">Get your school protected</h4>
          <form onSubmit={handleSubmit2(submitData)}>
            {stage === "intro" && (
              <div>
                Real Estate Professionals can serve as a Bully Shut Down Ambassador for up to 3
                different schools in their area. To apply to be a Bully Shutdown Ambassador please{" "}
                <br />
                <span role="button" className="text-primary" onClick={() => changeStage("upload")}>
                  CLICK HERE
                </span>
              </div>
            )}

            {(stage === "upload" || stage === "form") && (
              <>
                <p>
                  The first step to becoming a Bully Shut Down Ambassador for a school is creating a
                  verification video confirming who you are. Please upload a "selfie" video of
                  yourself clearly showing your face with no hats, sun glasses or anything else that
                  may obstruct your face. Please make the following statement in your video. My name
                  is __________________ and the name of the business that i work for is
                  __________________.
                </p>
                <label className="py-1">Video Intro</label>
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
                {upload && (
                  <video width="100%" controls className="mb-3">
                    <source src={blob} />
                    Your browser does not support HTML5 video.
                  </video>
                )}
              </>
            )}

            {stage === "form" && (
              <>
                <Icontroller
                  type="text"
                  name="business_name"
                  placeholder="Business Name"
                  register={register2}
                  errors={error2}
                  others={{
                    required: true
                  }}
                  message="required"
                />
                <Icontroller
                  type="email"
                  name="business_email"
                  placeholder="Business Email"
                  register={register2}
                  errors={error2}
                  others={{
                    required: true,
                    pattern: /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g
                  }}
                  message="Please use a valid email format"
                />
                <Icontroller
                  type="number"
                  name="business_mobile"
                  placeholder="Business Mobile Number"
                  register={register2}
                  errors={error2}
                  others={{
                    required: true,
                    pattern: /[0-9]/,
                    maxLength: 10,
                    minLength: 10
                  }}
                  message="input a valid phone number"
                />
                <Icontroller
                  type="text"
                  name="business_website"
                  placeholder="Business Website where your picture and identity is displayed."
                  register={register2}
                  errors={error2}
                  others={{
                    required: true
                  }}
                />
                <Icontroller
                  type="text"
                  name="school_name"
                  placeholder="School name"
                  register={register2}
                  errors={error2}
                  others={{
                    required: true
                  }}
                  message="required"
                />
                <Icontroller
                  type="number"
                  name="zip_code"
                  placeholder="Zip code"
                  register={register2}
                  errors={error2}
                  others={{
                    required: true,
                    maxLength: 5,
                    minLength: 5
                  }}
                  message="Input a valid zip code"
                />
                <Button type="submit" color="dark" size="sm">
                  SUBMIT
                </Button>
              </>
            )}
          </form>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={toggle} backdrop={backdrop}>
        <ModalBody>
          {message && message}
          {Object.keys(found).length ? (
            <div className="text-center p-3 mb-5 shadow rounded">
              {found.data.approved === "pending" ? (
                <> {found.data.school_name.toUpperCase()} is pending approval</>
              ) : (
                <>
                  {found.data.school_name.toUpperCase()} with zip code {found.data.zip_code} is
                  already sponsored by {found.data.business_name} BullyBloxx is owned, controlled
                  and funded by the parents in the school and citizens in the community. The cost of
                  protecting any school, regardless of size, with BullyBloxx is just $300 per month
                  and is paid for yearly by donations from the parents and community. Currently
                  there is $535 in donations with a total of $3,600 needed to fund BullyBloxx for a
                  complete year of protection.
                  <Button
                    className="text-decoration-none bg-transparent text-primary border-0"
                    onClick={() => {
                      setItem("s_sch", JSON.stringify(found.data))
                      navigate("/donate")
                    }}
                    disabled={loading}
                  >
                    Donate
                  </Button>
                  so our students can continue to have this protection.
                </>
              )}
            </div>
          ) : (
            ""
          )}
        </ModalBody>
      </Modal>
    </>
  )
}
export default Sponsor
