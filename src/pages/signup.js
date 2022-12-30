import { useForm } from "react-hook-form"
import BASE_URL from "../misc/url"

const Register = () => {
  const { register, handleSubmit } = useForm()
  const submit = async (data) => {
    const response = await fetch(`${BASE_URL}signup`, {
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
      <input type="text" placeholder="Fullname" {...register("fullName")} />
      <br />
      <input type="email" placeholder="email" {...register("email")} />
      <br />
      <input type="text" placeholder="country" {...register("country")} />
      <br />
      <input type="number" placeholder="Phone" {...register("phone")} />
      <br />
      <input type="password" placeholder="password" {...register("password")} />
      <br />
      {/* <input type="password" placeholder="confirm password" {...register} /> */}
      <br />
      <input type="submit" value="Sign In" />
    </form>
  )
}

export default Register
