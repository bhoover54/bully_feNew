import { useForm } from "react-hook-form"
import { setItem } from "../misc/helper"
import BASE_URL from "../misc/url"

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const login = async (data) => {
    console.log(data)
    const response = await fetch(`${BASE_URL}signin`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    const result = await response.json()
    if (response.status === 201) {
      setItem("bly_token", result.token)
      console.log(result, response.status)
      return
    }
    console.log(result.message)
  }

  return (
    <form onSubmit={handleSubmit(login)}>
      <input
        type="text"
        name="email"
        placeholder="email"
        {...register("email", {
          pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        })}
      />
      {errors.email && "invalid email format"}
      <br />
      <input type="password" name="password" placeholder="password" {...register("password")} />
      <br />
      <button type="submit">Sign In</button>
      {/* <input type="submit" value="Sign In" /> */}
    </form>
  )
}

export default Login
