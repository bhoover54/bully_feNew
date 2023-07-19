import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { Col, Row, ModalBody, Modal } from "reactstrap"
import banner from "../assets/images/banner.jpeg"
import AppContext from "../misc/appContext"
const Home = () => {
  const { logout } = useContext(AppContext)
  const [modal, setModal] = useState(false)

  const session = () => {
    const getSession = sessionStorage.getItem("welcome")
    if (!getSession) {
      logout()
      sessionStorage.setItem("welcome", true)
      return
    }
  }

  const toggle = () => setModal(!modal)

  useState(() => {
    session()
  }, [])

  return (
    <Row>
      <Col md="6">
        <div className="banner">
          <img src={banner} width="100%" alt="" />
        </div>
      </Col>
      <Col md="6" className="d-flex flex-column justify-content-center p-3">
        <h3 className=""> Once The Bully Periscope “locks in” on a bully, it’s OVER!
The Bully Periscope immediately intervenes and quickly shuts down any bully.
          {/* Once The Bully Periscope “locks in” on a bully, it’s OVER!
The Bully Periscope immediately intervenes and quickly shuts down any bully. */}
        </h3>
        <div className="">
          <Link className="rounded p-2 d-block my-1" onClick={() => toggle()}>
            Teachers and Staff Members
          </Link>
          {/*<Link className="rounded p-2 d-block my-1" to="/summary" onClick={() => toggle()}>
            BullyBloxx Quick Summary
          </Link> */}
          <Link to="/report" className="rounded p-2 d-block my-1">
            Report Bullying / Threats / Weapons
          </Link>
          <Link to="/sponsor" className="rounded p-2 d-block my-1">
            CONTRIBUTE for your school's Bully Periscope protection
          </Link>
          <Link className="rounded p-2 d-block my-1" to="/media">
            BullyBloxx Video Library
          </Link>
          <Link className="rounded p-2 d-block my-1" to="/walk-through">
            BullyBloxx Detailed Tutorial
          </Link>
        </div>
      </Col>

      <Col md={8} lg={7} className="mx-auto my-3">
        {/* <iframe width="100%" height="400" src="https://www.youtube.com/embed/-3HWAP4MXU8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
        {/* <iframe width="100%" height="400" src="https://www.youtube.com/embed/P4EDSU8rQHc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
        <h3>THE BULLY PERISCOPE- WHAT IS IT? </h3>
        <p className="">
           The Bully Periscope is a new, parent developed, “super-weapon”, that has been created to bring to an end to our long, losing and disastrous war against bullying in our schools. That, in a nutshell, is what The Bully Periscope is.        
        </p>
        <p className="">
    Our surveys and studies revealed that parents overwhelmingly agree that a “red line” must be drawn for bullies. A line giving them 3 strikes during the school year, with a 4th strike resulting in the bully being removed from the campus and transferred to an alternative school, home school, etc. 
        </p>
        <p className="">
          Parents also agree that this “4 strike” standard is more than fair to any bully; giving them repeated opportunities to stop abusing their schoolmates.
        </p>
        <p className="">
          The Bully Periscope, by design, allows communities and parents to implement and enforce this “4 strikes and you’re out” standard for bullying in their schools. 
        </p>
        <p className="">
      At the same time, The Bully Periscope also quickly shuts down bullies who are abusing others. Here is how:
          </p>
        <p className="">
    Inside this system is a special function called The Bully Periscope Report. This report, for the FIRST TIME EVER, gives parents of bully victims full access to all other bully reports that have been filed against their bully, this school year. Making this bullying information public forces everyone who has any responsibility or role in the situation to be fully accountable for their negligence or failure. When the bully’s record isn’t hidden, everything changes 180 degrees; and quickly.
       </p> 
        <p className="">
        Please view this video link below detailing the valuable information that a Bully Periscope Report provides you and then please review the TORPEDO YOUR BULLY tab for step by step, easy to follow instructions for utilizing this information from your bully’s Periscope Report to quickly stop their abuse.
       </p> 
          <p className="">
          Any parent who has suffered through useless meetings with school administrators attempting to stop the bullying of their child and sleepless nights feeling the guilt of forcing their child to go to school and face this abuse can testify as to how important and valuable this information is.
             </p> 
          <p className="">
       If you are a parent or youth leader of any kind, please review the information in the MESSAGES TO MOMS tab, it is vitally important that youth leaders and parents follow the instructions provided there.
        </p> 
        <p className="">
       And please remember, The Bully Periscope doesn’t charge a direct fee for all it provides, it relies on contributions to function. Please contribute 
          so your school’s students can continue to have this great protection.
        </p>
        <p className="">
        
        </p> 
        <p className="">
        </p>
        <p className="">
        </p>
        <p className="">
          
        </p>
        <p className="">
        
        </p>
      </Col>

      

      <h2 className="text-center p-3">
        Ask yourself............would your child be safer at school with or without The Bully Periscope?
        {/* To learn how BullyBloxx shuts down bullying in your schools{" "}
        <Link to="/media">CLICK HERE</Link>{" "} */}
      </h2>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <b>Teachers and Staff Members</b>
          <br />
          Through the development of The Bully Periscope system we interviewed countless teachers and staff memeber who worked in schools that turned a blind eye to bullying. 
          These teachers and staff were broken hearted by what they have seen and the helplessness they have felt to do anything but try and comfort the victims. Those days 
          are over. 
          <br />
          Teachers and staff members can report bullying or threats through The Bully Periscope just like students can.  If you are a teacher or staff member, over 21 years of age
          here is what to do:
          <br />
          <br />
          Have a trusted relative or friend create a Bully Periscope account and click on the Report Bullying tab and upload a verification video for you.  They can send you
          the username and password for the account as well as a copy of the video and you can submit and your trusted friend or relative will not have to bothered with any
          of it.  Your identity will be 100% protected and you can file a reprt on every bully incident that you see.
        </ModalBody>
      </Modal>
    </Row>
  )
}

export default Home
