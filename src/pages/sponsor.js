import { useForm } from "react-hook-form"
import BASE_URL from "../misc/url"

const Sponsor = () => {
  const { register, handleSubmit } = useForm()
  const submit = async (data) => {
    const response = await fetch(`${BASE_URL}sponsor/school`, {
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
      <input type="text" placeholder="School name" {...register("school_name")} />
      <br />
      <input type="text" placeholder="email" {...register("zipCode")} />
      <br />

      <br />

      <input type="submit" value="Sponsor" />
    </form>
  )
}

export default Sponsor
