import { useEffect, useState } from "react"
import { Col, Input, Row, InputGroup, InputGroupText, Button } from "reactstrap"
import { getItem } from "../misc/helper"
import BASE_URL from "../misc/url"

const Upload = () => {
  const [filters, setFilter] = useState([])
  const [video, setVideos] = useState([])
  const [search, setSearch] = useState([])
  const [details, setDetails] = useState({})
  const [searchtest, setSearcTest] = useState("")
  const getAllUsers = async () => {
    const response = await fetch(`${BASE_URL}users`, {
      headers: new Headers({
        "Authorization": `Bearer ${getItem("bly_token")}`
      })
    })
    if (response.status < 400) {
      const result = await response.json()
      setFilter(result.data)
      ////console.log(result)
      return
    }
    ////console.log("error")
  }

  const findMatches = (e) => {
    setSearch([])
    setVideos([])
    if (e.length > 0) {
      const sort = filters.filter((dt) => {
        const regex = new RegExp(e, "gi")
        return dt?.username?.match(regex) || dt?.fullName?.match(regex)
      })
      setSearch(sort)
    } else setSearch([])
  }

  const showVideos = (e) => {
    setDetails({
      name: e.fullName,
      email: e.email
    })
    setVideos(e.reports)
  }

  useEffect(() => {
    getAllUsers()
  }, [])
  return (
    <Row>
      <Col lg="4" md="6" className="mx-auto">
        <InputGroup className="mb-3">
          <InputGroupText>@</InputGroupText>
          <Input type="search" className="shadow-none" onChange={(e) => setSearcTest(e.target.value)} placeholder="Search videos with Username" />
          <Button onClick={() => findMatches(searchtest)}>Search</Button>
        </InputGroup>

        {search.length && !video.length
          ? search.map((e) => (
              <div className="p-3 my-3 d-flex justify-content-between align-items-center shadow rounded " role="button" onClick={() => showVideos(e)}>
                {/* {e.fullName} */}@{e?.username || ""}
              </div>
            ))
          : ""}
        {video.length ? (
          <>
            <div className="p-3 my-3 d-flex justify-content-between align-items-center shadow rounded " role="button">
              {details.username}
              {/* <small>{details.email}</small> */}
            </div>
            {video.map((e) => (
              <div className="mb-3">
                <video width="100%" controls>
                  <source src={`${BASE_URL}${e.video_link}`} />
                  Your browser does not support HTML5 video.
                </video>
                Date uploaded : {new Date(e.createdAt).toDateString()}
              </div>
            ))}
          </>
        ) : (
          ""
        )}
      </Col>
    </Row>
  )
}

export default Upload
