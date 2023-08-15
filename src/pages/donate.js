/* eslint-disable no-unused-vars */
// import { useState } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import StripeCheckout from "react-stripe-checkout"
import { toast } from "react-toastify"
import { Col, Row, Button, Input } from "reactstrap"
// import useSchool from "../hooks/school.hook"
import { getItem } from "../misc/helper"
import BASE_URL from "../misc/url"
import { Icontroller } from "./signup"

const Donate = () =>  {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors }
  } = useForm()
  //const { handleSubmit, control, reset } = useForm()
  const school = JSON.parse(getItem("s_sch"))
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [data, setData] = useState({})

  const submit = async (d) => {}

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value })

  const handleToken = async (token) => {
   setData({ ...data, school_id: school.id })

    const resData = data
    resData.school_id = school.id
    //console.log(resData, school)
    const response = await fetch(`${BASE_URL}donate/school`, {
      method: "POST",
      body: JSON.stringify({ token, ...resData }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    await response.json()
    if (response.status < 400) {
      reset()
      setLoading(false)
      toast("donation successful")
      navigate("/")
      return
    }
    if (response.status === 400) {
      toast("maximum sponsor reached")
      return
    }
    toast("sponsorhip fail")
  }

  return (
    <Row>
      <Col md="6" className="mx-auto mb-5">
        <form onSubmit={handleSubmit(submit)}>
          <p className="">
            Please remember, The Bully Periscope relies on your contributions to function. 
            Please contribute so your school’s students can continue to have this great protection.
          </p>
          <br />
          {/* <p>
            School Name: <span className="fw-bold text-uppercase"> {school.school_name} </span>
          </p> 
          <div className="mb-2">
            <label className="py-1">Your Email Address</label>
            <Input bsSize="sm" className="shadow-none" name="emailaddr" />
          </div>
          <div className="mb-2">
            <label className="py-1">School Name</label>
            <Input bsSize="sm" className="shadow-none" name="schoolname" />
          </div>
          <div className="mb-2">
            <label className="py-1">Zip Code</label>
            <Input bsSize="sm" className="shadow-none" name="zipcode" />
          </div>*/}

          <Icontroller
                  type="email"
                  name="business_email"
                  placeholder="Your Email Address"
                  register={register}
                  errors={errors}
                  others={{
                    required: true,
                    pattern: /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g
                  }}
                  message="Please use a valid email format"
                />

                <Icontroller
                  type="text"
                  name="school_name"
                  placeholder="School Name"
                  register={register}
                  errors={errors}
                  others={{
                    required: true
                  }}
                  message="required"
                />
                <Icontroller
                  type="number"
                  name="zip_code"
                  placeholder="School Zip code"
                  register={register}
                  errors={errors}
                  others={{
                    required: true,
                    maxLength: 5,
                    minLength: 5
                  }}
                  message="Input a valid zip code"
                />
          {/* <div className="mb-2">
            <label className="py-1">Full Name</label>
            <Input bsSize="sm" className="shadow-none" name="name" onChange={handleChange} />
          </div> */}
          <div className="mb-2">
            <label className="py-1">Amount</label>
            <Input bsSize="sm" className="shadow-none" name="amount" type="number" onChange={handleChange} />
          </div>
          {/* <Icontroller name="name" placeholder="Full Name" control={control} /> */}
          {/* <Icontroller name="email" placeholder="Email" control={control} /> */}
          {/* <Icontroller name="amount" placeholder="Amount" control={control} /> */}

          {/* <Button
            ref={btnCLick}
            bsSize="sm"
            color="dark"
            className="mb-3 shadow-none form-control"
            type="submit"
            disabled={loading}
          >
            Procced 
          </Button> */}
          <StripeCheckout className="form-control" onSubmit={submit} allowRememberMe stripeKey="pk_live_51KOluiEvT7coUybkk0w1l1FcznFHxuMwtNmvB0a3Km9RROS2ZRehenWquqIQAqEBDNtjnVBadiKSVrMIGY16S9yY00LRMjIpdf" amount={data.amount * 100} label="Donate" token={handleToken} name="Donate" />
        </form>
      </Col>
    </Row>
  )
}

export default Donate
