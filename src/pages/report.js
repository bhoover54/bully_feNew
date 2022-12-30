import { useForm } from "react-hook-form"

const Report = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const login = (data) => console.log(data)
  return (
    <form onSubmit={handleSubmit(login)}>
      <input type="text" name="video" placeholder="Video Evidence? " />
      <br />
      <input
        type="text"
        placeholder="email"
        {...register("email", {
          pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        })}
      />
      {errors.email && "invalid email format"}
      <br />

      <input type="text" placeholder="Report Type" {...register("report_type")} />
      <br />
      <input type="text" placeholder="Scool Name" {...register("school_name")} />
      <br />
      <input type="text" placeholder="Zip code" {...register("zip_code")} />
      <br />
      <input type="text" placeholder="Bully Teaher" {...register("bully_teacher")} />
      <br />
      <input type="text" placeholder="Bully First Name" {...register("bully_fname")} />
      <br />
      <input type="text" placeholder="Bully Last Name" {...register("bully_lname")} />
      <br />
      <input type="text" placeholder="Bully Gender " {...register("bully_gender")} />
      <br />
      <input type="text" placeholder="Bully Grade " {...register("bully_grade")} />
      <br />
      <input type="text" placeholder="Incident Date" {...register("incident_date")} />
      <br />
      <input type="text" placeholder="Incident Time" {...register("incident_time")} />
      <br />
      <input type="text" placeholder="Staff Presence?" {...register("staff_witnessed")} />
      <br />
      <input type="text" placeholder="Staff Name?" {...register("staff_witness")} />
      <br />
      <input type="text" placeholder="Staff Action?" {...register("staff_action")} />
      <br />
      <input type="text" placeholder="Incident Place?" {...register("inceident_place")} />
      <br />
      <input type="text" placeholder="Pysical Abused? " {...register("physical_abuse")} />
      <br />
      <input type="text" placeholder="Victim Hhandicapped? " {...register("victim_handicapped")} />
      <br />
      <input type="text" placeholder="Victim Younger? " {...register("victim_younger")} />
      <br />
      <input type="text" placeholder="Details? " {...register("details")} />
      <br />

      <br />
      <input type="submit" value="Send Report" />
    </form>
  )
}

export default Report
