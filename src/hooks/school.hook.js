import { useEffect, useState } from "react"
import BASE_URL from "../misc/url"

const useSchool = () => {
  const [school, setSchools] = useState([])
  const getSchools = async (data) => {
    const response = await fetch(`${BASE_URL}schools`, {
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    const result = await response.json()
    if (response.status < 400) {
      // //console.log(result)
      setSchools(result.data)
      return
    }
    // //console.log(result)
  }

  useEffect(() => {
    getSchools()
  }, [])
  return { school, getSchools }
}

export default useSchool
