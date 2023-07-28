import { Col, Row } from "reactstrap"
import { Link } from "react-router-dom"

const Torpedo = () => {
  return (
    <Row>
      <Col xs="12" md="8" className="mx-auto">
        <h3 className="mb-3">Torpedo Your Bully</h3>
        <p className="">
            The following procedures empowers parents, single or otherwise, to quickly end any abuse their child is enduring from bullying at school, and to stop this harm without needing assistance from anyone. We call this action Torpedoing Your Bully.             
        </p>
        <p className="">
            <b>The First Time the Bully Strikes:</b>
        </p>
        <p className="">
            The Bully Periscope has its own bully, threat and weapons reporting system. When any bully strikes, go to the Bully Reporting Form tab and report the incident; 
            in fact, do this every time a bully strikes. In most cases reports are submitted for students by trusted adults. This provides 100% protection for the reporting student’s identity; 
            not even the principal knows who they are. Please click on the TRUSTED ADULTS tab to learn all details involved in being a trusted adult.
            Every bully report is downloaded in both the bully’s database as well as the school’s database. A copy of the bully report is sent to the principal with instructions to immediately 
            shut the abuse from this bully down.    
        </p>
        <p className="">
              <b>The Second Time the Bully Strikes:</b>
        </p>
        <p className="">
              If the bully strikes a second time, whether against your student or another student, this tells you that you are dealing with a repeat offender bully. This is a bully that abuses again and again. At this point you should take 
              a step back and allow The Bully Periscope System to intervene and take over the situation. To do this take these 2 simple actions:
        </p>
          <p className="">
              1st - File a 2nd bully report, just like you filed the first report. ALWAYS file a bully report.<br />
              2nd – Obtain a  Bully Periscope Report on your bully. This is your bully’s complete record of abusing and bullying others. 
              Once you have this Bully Periscope Report the information in the report will determine and dictate what actions you take next to shut down this abuse.<br />
                    Please click <a href="/periscope"><b>HERE</b></a> to order a Bully Periscope Report on your bully.
          </p>
          <p className="">
              After receiving the Bully Periscope Report on your bully, choose and click on which of the 3 situations below applies to you and then take the action provided:
          </p>
          <p className="">
              <b>Situation #1</b> - If The Bully Periscope Report shows that this bully has only been reported by you, your 2 reports are the only incidents against the bully please click <a href="/letter1"><b>HERE</b></a>.
          </p>
          <p className="">
              <b>Situation #2</b> - The Bully Periscope Report shows that in addition to your 2 reports this bully has been reported one other time by someone else, making a total number of 3 
              reports against this bully please click HERE.
          </p>
          <p className="">
              <b>Situation #3</b> - The Bully Periscope Report shows that in addition to your 2 reports this bully has been reported for 2 or more other incidents of bullying, 
              making a total number of reports against this bully 4 or more please click HERE.
          </p>
      </Col>
    </Row>
  )
}

export default Torpedo

