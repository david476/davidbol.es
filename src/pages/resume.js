
import React from 'react';
import { createUseStyles } from "react-jss";
import { components } from '../styling';

const scaleFactor = 1.45;

const useStyles = createUseStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 262px',
    gridTemplateRows: 'auto 1fr',
    gridColumnGap: theme.sizing(16),
    padding: [theme.sizing(16), theme.sizing(16), theme.sizing(16), theme.sizing(16)],
  },
  head: {
    gridRow: 1,
    gridColumn: 1,
  },
  contact: {
    gridRow: 1,
    gridColumn: 2,
    ...theme.fonts.content,
    ...theme.colors.content,
    ...theme.sizing.content,
    textAlign: 'right',
    paddingTop: 16
  },
  body: {
    gridRow: 2,
    gridColumn: 1,
  },
  misc: {
    gridRow: 2,
    gridColumn: 2,
  },
  name: {
    ...theme.fonts.navigation,
    ...theme.colors.headings,
    fontSize: theme.sizing(20),
    marginBottom: theme.sizing(4),
  },
  synopsis: {
    ...theme.fonts.content,
    ...theme.colors.content,
    ...theme.sizing.content,
  },
  section: {
    ...theme.fonts.navigation,
    fontSize: theme.sizing(6),
    fontWeight: '400',
    color: theme.colors.accent,
    marginTop: theme.sizing(8),
    marginBottom: theme.sizing(4),
  },
  header: {
    ...theme.fonts.headings,
    fontSize: 22,
    marginTop: theme.sizing(4),
    marginBottom: theme.sizing(1.5),
  },
  date: {
    ...theme.fonts.navigation,
    fontSize: theme.sizing(4),
  },
  detail: {
    fontWeight: '300',
    fontStyle: 'italic',
  },
}))

function ResumeContent() {
  const {container, head, contact, body, misc, name, synopsis, section, header, date, detail} = useStyles()
  return (
    <div className={container}>
      <div className={head}>
        <div className={name}>David Boles</div>
        <div className={synopsis}><i>University student passionate about designing complex systems<br/>across engineering disciplines.</i></div>
      </div>
      <div className={contact}>
        {false?
          <>
            Brown University
            <br/>
            69 Brown Street, #4793
            <br/>
            Providence, RI 02912
          </>
        :
          <>
            478 Monterey Road
            <br/>
            Pacifica, CA
            94044
            <br/>
          </>
        }
        <br/>
        (415) 825-2464
        <br/>
        me@davidbol.es
        <br/>
        www.davidbol.es/portfolio
      </div>
      <div className={body}>

        <div className={section}>Education</div>

        <div className={header}>
          <b>Brown University</b><i>—3.85 GPA</i>
          <div className={date}>September 2018–Present</div>
        </div>
        <components.ul>
          <components.li>
            Topics in Collaborative Robotics <i>(in progress)</i>
          </components.li>
          <components.li>
            Sensors and Actuators for Real Systems <i>(in progress)</i>
          </components.li>
          <components.li>
            Introduction to Robotics<span className={detail}>—PID, Kalman Filters, and SLAM</span>
          </components.li>
          <components.li>
            Introduction to Software Engineering
          </components.li>
          <components.li>
            Digital Electronics Systems Design
          </components.li>
          <components.li>
            Electrical Circuits and Signals
          </components.li>
          <components.li>
            Dynamics and Vibrations
          </components.li>
          <components.li>
            Applied Ordinary Differential Equations
          </components.li>
        </components.ul>

        <div className={header}>
          <b>Design​ ​Tech​ ​High​ ​School and Community Colleges</b><i>—4.0{/*48 weighted*/} GPA</i>
          <div className={date}>August 2014–June 2018</div>
        </div>
        <components.ul>
          <components.li>
            Design Lab 1-8<span className={detail}>—Stanford's "Design Thinking" Methodology</span>
          </components.li>
          <components.li>
            Linux Administration
          </components.li>
          <components.li>
            Mobile Web App Development
          </components.li>
          <components.li>
            Linear Algebra and Calculus I-III
          </components.li>
        </components.ul>

        <div className={section}>Experience</div>

        <div className={header}>
          <b>Brown Space Engineering</b>—<i>Technical Lead</i>
          <div className={date}>September 2018–Present</div>
        </div>
        <components.ul>
          <components.li>
            Oversees the from-scratch design, fabrication, and testing of a low-cost satellite with motorized arm, camera, and S-band downlink by a 70-student undergraduate club.
          </components.li>
          <components.li>
            Experiments with development guardrails for FreeRTOS-based firmware.
          </components.li>
        </components.ul>

        <div className={header}>
          <b>Styra</b><i>—Software Development Intern</i>
          <div className={date}>June 2019–August 2019</div>
        </div>
        <components.ul>
          <components.li>
            Created a configurable, markdown-compatible system for
            embedding live, interdependent blocks of code into public-facing
            documentation.
          </components.li>
          <components.li>
            Worked with engineers and designers to implement features
            in both the product frontend and backend.
          </components.li>
        </components.ul>

        <div className={header}>
          <b>Oracle Education Foundation</b><i>—Intern</i>
          <div className={date}>March 2016–June 2018</div>
        </div>
        <components.ul>
          <components.li>
            Guided groups of students in designing human-centered solutions
            using electronics and programming.
          </components.li>
          <components.li>
            Developed a new Internet-of-Things course in collaboration with Program Managers.
          </components.li>
        </components.ul>

        <div className={header}>
          <b>B.R.E.A.D. FRC Robotics Team</b><i>—Robot Division Lead</i>
          <div className={date}>September 2015–June 2018</div>
        </div>
        <components.ul>
          <components.li>
            Managed and coordinated software, electrical, and mechanical groups, composed of 
            over 40 students and several mentors, to build competition-ready, 
            80+ pound robots.
          </components.li>
          <components.li>
            Developed a modular robot control architecture written in Java.
          </components.li>
        </components.ul>
        
      </div>
      <div className={misc}>
        <div className={section}>Skills</div>

        <components.p>
          User-Centered Design
        </components.p>

        <components.p>
          Software Engineering
          <components.ul>
            <components.li>
              Javascript, React
            </components.li>
            <components.li>
              HTML, CSS
            </components.li>
            <components.li>
              Go
            </components.li>
            <components.li>
              Java
            </components.li>
            <components.li>
              C
            </components.li>
            <components.li>
              Python, NumPy, OpenCV
            </components.li>
            <components.li>
              MATLAB
            </components.li>
            <components.li>
              Racket, Plait
            </components.li>
          </components.ul>
        </components.p>

        <components.p>
          Mechanical Engineering
          <components.ul>
            <components.li>
              Solidworks
            </components.li>
            <components.li>
              Fusion 360
            </components.li>
          </components.ul>
        </components.p>

        <components.p>
          Rapid Prototyping
          <components.ul>
            <components.li>
              3D Printers
            </components.li>
            <components.li>
              Laser Cutters
            </components.li>
            <components.li>
              CNC Mills and Routers
            </components.li>
          </components.ul>
        </components.p>

        <components.p>
          Networking
          <components.ul>
            <components.li>
              Cable Installation
            </components.li>
            <components.li>
              Hardware Configuration
            </components.li>
          </components.ul>
        </components.p>


        <div className={section}>Awards</div>
        
        <div className={header}>
          <b>Rookie All-Star Award</b>
        </div>
        <components.p>
          Awarded to B.R.E.A.D. at the Silicon Valley FIRST Robotics Competition Regional, 2016
        </components.p>

        <div className={section}>Languages</div>
        <components.p>
          French<span className={detail}>—9 Years</span>
        </components.p>
        <components.p>
          Spanish<span className={detail}>—4 Years</span>
        </components.p>

        <div className={section}>Other Interests</div>
        <components.p>
          Ceramics
        </components.p>
        <components.p>
          Cooking
        </components.p>
        <components.p>
          Knitting
        </components.p>
        <components.p>
          Philosophy
        </components.p>
      </div>
    </div>
  )
}





// --- FIT IT INTO A 8.5"x11" DIV ---

const usePageStyles = createUseStyles(theme => ({
  page: {
    width: 8.5*96,
    height: 11*96,
    overflow: 'hidden',
  },
  content: {
    width: 8.5*scaleFactor*96,
    height: 11*scaleFactor*96,
    transformOrigin: [0, 0],
    transform: `scale(${1/scaleFactor})`,
    position: 'absolute',
  }
}))

export default function Resume({children, ...props}) {
  const {page, content} = usePageStyles();
  return (
    <div className={page} {...props}>
      <div className={content}>
        <ResumeContent/>
      </div>
    </div>
  )
}