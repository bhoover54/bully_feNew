import { useState } from "react"
import { useForm } from "react-hook-form"
import BASE_URL from "../misc/url"

const Donate = () => {
  const { register, handleSubmit } = useForm()
  const [schoolId, setSchoolId] = useState("")

  const submit = async (data) => {
    const response = await fetch(`${BASE_URL}donate/school/${schoolId}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    const result = await response.json()
    if (response.status < 400) {
      console.log(result)
      return
    }
    console.log(result)
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <input type="text" placeholder="Full Name" {...register("name")} />
      <br />
      <input type="email" placeholder="email" {...register("email")} />
      <br />
      <input type="text" placeholder="Amount" {...register("amount")} />
      <br />

      <br />

      <input type="submit" value="Donate" />
    </form>
  )
}

export default Donate
