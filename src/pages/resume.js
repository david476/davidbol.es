
import React from 'react';
import { createUseStyles } from "react-jss";
import { components } from '../styling';

/**
 * After changing, commit and push to develop, wait for Netlify to update,
 * and then run `npm run update-resume` to update the static pdf and image files.
 * 
 * You can also run `npm run update-resume dry` to avoid using API credits. The result
 * will look the same but the PDF may still include a cropped out watermark.
 * 
 * It's done this way to make sure characters aren't being merged into single glyphs (specifically ft, possibly others).
 */

const scaleFactor = 1.45;

const useStyles = createUseStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 262px',
    gridTemplateRows: 'auto 1fr',
    gridColumnGap: theme.sizing(16),
    padding: [theme.sizing(12), theme.sizing(16), theme.sizing(12), theme.sizing(16)],
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
  headerBold: {
    fontWeight: 400,
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
  const {container, head, contact, body, misc, name, synopsis, section, header, headerBold, date, detail} = useStyles()
  return (
    <div className={container}>
      <div className={head}>
        <div className={name}>David Boles</div>
        <div className={synopsis}><i>University junior passionate about robotics and embedded systems, seeking to<br/>help engineer a more sustainable future.</i></div>
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
        <a href='mailto:me@davidbol.es'>me@davidbol.es</a>
        <br/>
        <a href='https://www.davidbol.es/portfolio'>www.davidbol.es/portfolio</a>
      </div>
      <div className={body}>

        <div className={section}>Education</div>

        <div className={header}>
          <b className={headerBold}>Brown University</b><i>—3.9 GPA</i>
          <div className={date}>September 2018–Present</div>
        </div>
        <components.ul>
          {false ? 
            <components.li>
              Plants, Food, and People<span className={detail}>—planned for Spring 2021</span>
            </components.li>
          :
            null
          }
          <components.li>
            Plants, Food, and People<span className={detail}>—Plant Selection, Breeding, Cultivation, and Sustainability</span>
          </components.li>
          <components.li>
            Machine Learning<span className={detail}>—planned for Spring 2021</span>
          </components.li>
          <components.li>
            Control Systems Engineering<span className={detail}>—planned for Spring 2021</span>
          </components.li>
          <components.li>
            Digital Signal Processing
          </components.li>
          <components.li>
            Linear System Analysis
          </components.li>
          <components.li>
            Sensors and Actuators for Real Systems
          </components.li>
          <components.li>
            Introduction to Robotics<span className={detail}>—PID, Kalman Filters, and SLAM</span>
          </components.li>
          <components.li>
            Topics in Collaborative Robotics
          </components.li>
          <components.li>
            Logic for Systems
          </components.li>
          <components.li>
            Software Engineering
          </components.li>


          {/* <components.li>
            Digital Electronics Systems Design
          </components.li> */}

          {/* <components.li>
            Dynamics and Vibrations
          </components.li> */}

        </components.ul>

        {/* <div className={header}>
          <b>Design​ ​Tech​ ​High​ ​School and Community Colleges</b><i>—4.0{/*48 weighted* GPA</i>
          <div className={date}>August 2014–June 2018</div>
        </div>
        <components.ul>
          <components.li>
            Design Lab 1-8<span className={detail}>—Stanford's "Design Thinking" Methodology</span>
          </components.li>
          <components.li>
            Linux Administration
          </components.li>
        </components.ul> */}

        <div className={section}>Experience</div>

        <div className={header}>
          <b className={headerBold}>Brown Space Engineering</b>—<i>Software Lead</i>
          <div className={date}>September 2018–Present</div>
        </div>
        <components.ul>
          <components.li>
            Trains new members and facilitates software development for our next satellite.
          </components.li>
          <components.li>
            Experiments with development guardrails for FreeRTOS-based firmware.
          </components.li>
          <components.li>
            Migrated our projects from Atmel Studio to an open source toolchain based on OpenOCD and Arm GCC.
          </components.li>
        </components.ul>

        <div className={header}>
          <b className={headerBold}>Duckietown Foundation</b>—<i>Research Assistant</i>
          <div className={date}>June 2020–September 2020</div>
        </div>
        <components.ul>
          <components.li>
            Adapted a college robotics course for use in high schools including validating custom mass-manufactured quadcopter kits as well as overseeing content writing and teacher training. The finished course was used by several schools and over 150 students in Fall 2020.
          </components.li>
          <components.li>
            Completed preliminary user studies, requirements drafting, and component validation for the next iteration of kits.
          </components.li>
        </components.ul>

        <div className={header}>
          <b className={headerBold}>Styra</b><i>—Software Development Intern</i>
          <div className={date}>June 2019–August 2019</div>
        </div>
        <components.ul>
          <components.li>
            Created a configurable, markdown-compatible system for
            embedding interdependent blocks of live, interactive code into public-facing
            documentation.
          </components.li>
        </components.ul>

        <div className={header}>
          <b className={headerBold}>Oracle Education Foundation</b><i>—Intern</i>
          <div className={date}>March 2016–June 2018</div>
        </div>
        <components.ul>
          <components.li>
            Developed a new Internet-of-Things course in collaboration with Program Managers.
          </components.li>
          <components.li>
            Simultaneously supported 6-8 groups of students in designing human-centered solutions using embedded systems.
          </components.li>
        </components.ul>

        <div className={header}>
          <b className={headerBold}>B.R.E.A.D. FRC Robotics Team</b><i>—Robot Division Lead</i>
          <div className={date}>September 2015–June 2018</div>
        </div>
        <components.ul>
          <components.li>
            Managed and coordinated software, electrical, and mechanical groups, composed of 
            over 40 students and several mentors, to build competition-ready, 
            80+ pound robots.
          </components.li>
          <components.li>
            Developed a modular, semi-declarative, lazily-evaluated robot control architecture for Java.
          </components.li>
        </components.ul>
        
      </div>
      <div className={misc}>
        <div className={section}>Skills</div>

        <components.p>
          Software Engineering
          <components.ul>
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
              Java
            </components.li>
            <components.li>
              Go
            </components.li>
            <components.li>
              Javascript, React
            </components.li>
            <components.li>
              Racket, Plait
            </components.li>
            <components.li>
              Forge, Alloy
            </components.li>
            <components.li>
              Promela (SPIN)
            </components.li>
            <components.li>
              Git
            </components.li>
            <components.li>
              Linux Administration
            </components.li>
            <components.li>
              Network Configuration
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
              Soldering<br/>
              (incl. surface mount)
            </components.li>
            <components.li>
              3D Printing
            </components.li>
            <components.li>
              Laser Cutting
            </components.li>
            <components.li>
              CNC Milling and Routing
            </components.li>
          </components.ul>
        </components.p>

        <components.p>
          User-Centered Design
        </components.p>
{/* 
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
        </components.p> */}


        <div className={section}>Awards</div>
        
        <div className={header}>
          <b className={headerBold}>Rookie All-Star Award</b>
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
          Food Fermentation
        </components.p>
        <components.p>
          Hydroponic Gardening
        </components.p>
        <components.p>
          Knitting
        </components.p>
        <components.p>
          Ceramics
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