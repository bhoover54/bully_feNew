export const bullyTemplate = (
  reqBody
) => `I have information involving bullying in your school. I am reporting this information through The Bullybloxx system. If you are not
familiar with The Bullybloxx system please go to www.bullybloxx.com for details. Once you are on the site if you will click on the School
Administrator tab at the top of the Home page complete instructions for Bullybloxx will be provided for you. At the bottom of this page is
a link where you can review my identification video. Thank you
	<br />
	${reqBody.trustee}<br />
	If you have any further questions or need to immediately verify this
	information please contact me and I will provide the answers for
	you. <br />
	Your Full Name ${reqBody.fullName}<br />
	Your cell phone number ${reqBody.phone}<br />
	My e-mail address ${reqBody.reporterEmail}<br />
	Name of School ${reqBody.zap}<br />
	zip of School ${reqBody.value}<br />
	Principal’s email address ${reqBody.email}<br />
	Full name of bully ${reqBody.bully_fname} ${reqBody.bully_lname}<br />
	Gender of bully: ${reqBody.bully_gender}<br />
	Grade of bully. ${reqBody.bully_grade}<br />
	Homeroom Teacher of bully ${reqBody.bully_teacher}<br />
	Date of incident ${reqBody.incident_date}<br />
	Time of incident ${reqBody.incident_time}<br />
	Names of any other students that supported the bully’s actions ${reqBody.other_incidents}
	<br />
	Did any teacher or staff member see this incident? ${reqBody.staff_witnessed}<br />
	If yes, who was the teacher / staff member? ${reqBody.staff_witness || "no witness"}
	<br />
	What actions did the teacher / staff member take? ${reqBody.staff_action || "no action"}<br />
	Where did this incident occur? ${reqBody.incident_place}<br />
	Did the bully physically abuse the victim? ${reqBody.physical_abuse}<br />
	Was the victim a handicapped student? ${reqBody.victim_handicapped}<br />
	Was the victim a
	younger or smaller student than the bully? ${reqBody.victim_younger}<br />
	In complete detail provide all information you have on this threat. ${reqBody.details}
	<br />
	Have you witnessed this bully abusing other students in the past? ${reqBody.serail_bully}
	<br />
	If Yes, please provide any details of other bullying incidents that
	you have witnessed or seen in the past involving this bully. ${
    reqBody.other_incident || "none"
  }<br />
	Please send me a reply email confirming that you have received this
	information, this will allow me to know that the information that I
	have submitted is being properly addressed. Thank you.<br />
`

export const templateWeaponThreat = (reqBody) => `
I have information concernating a threat against your school. I am reporting this information through The Bullybloxx system. If you are not
familiar with The Bullybloxx system please go to www.bullybloxx.com for details. Once you are on the site if you will click on the School
Administrator tab at the top of the Home page complete instructions for Bullybloxx will be provided for you. At the bottom of this page is
a link where you can review my identification video. Thank you
<br />
${reqBody.trustee}<br />
If you have any further questions or need to immediately verify this
information please contact me and I will provide the answers for
you. <br />

My Full Name ${reqBody.fullName}<br />
My cell phone number ${reqBody.phone}<br />
My e-mail address ${reqBody.reporterEmail}<br />
Name of School ${reqBody.zap}<br />
zip of School ${reqBody.value}<br />
Principal’s email address ${reqBody.email}<br />
Full name of student/person bringing weapon to school  ${reqBody.bully_fname} ${
  reqBody.bully_lname
}<br />
Gender of student/person bringing weapon to school: ${reqBody.bully_gender}<br />
Grade of student/person bringing weapon to school: ${reqBody.bully_grade}<br />
If a student is bringing weapon to school, homeroom Teacher of student making threat  <br/>
Date you learned about the weapon at school ${reqBody.incident_date}<br />
Time you learned about threat ${reqBody.incident_time}<br />
In complete detail provide all information you have on this threat ${
  reqBody.other_incident || "none"
}<br />
Dear Principal, please send me a reply email confirming that you have received this information, this will allow me to know that the information that I have submitted is being properly addressed. Thank you. <br />`

export const templateSchoolThreat = (reqBody) => `
Dear Principal, <br/>
I have information concernating a threat against your school. I am reporting this information through The Bullybloxx system. If you are not
familiar with The Bullybloxx system please go to www.bullybloxx.com for details. Once you are on the site if you will click on the School
Administrator tab at the top of the Home page complete instructions for Bullybloxx will be provided for you. 

${reqBody.trustee}<br />
If you have any further questions or need to immediately verify this
information please contact me and I will provide the answers for
you. <br />
My Full Name ${reqBody.fullName}<br />
My cell phone number ${reqBody.phone}<br />
My e-mail address ${reqBody.reporterEmail}<br />
Name of School ${reqBody.zap}<br />
zip of School ${reqBody.value}<br />
Principal’s email address ${reqBody.email}<br />
Full name of student/person making threat   ${reqBody.bully_fname} ${reqBody.bully_lname}<br />
Gender of student/person making threat : ${reqBody.bully_gender}<br />
Grade of student/person making threat . ${reqBody.bully_grade}<br />
Homeroom Teacher of bully ${reqBody.bully_teacher}<br />
Date of incident ${reqBody.incident_date}<br />
Time of incident ${reqBody.incident_time}<br />

In complete detail provide all information you have on this threat ${reqBody.other_incidents}<br />
Dear Principal, please send me a reply email confirming that you have received this information, this will allow me to know that the information that I have submitted is being properly addressed. Thank you. <br />`
