import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { experiences, skills, categoryAccent } from "../constants";
import { Footer } from "../components";

import "react-vertical-timeline-component/style.min.css";

const About = () => {
  return (
    <main className="bg-primary min-h-screen pt-24">
      <section className='section-container'>
        <p className="section-label">Identity</p>
        <h1 className='section-title'>
          Software Engineer & <br />
          <span className='gradient-text'>AI Systems Architect</span>
        </h1>

        <div className='mt-5 flex flex-col gap-3 section-subtitle'>
          <p>
            Based in Croatia, I specialize in building autonomous systems, 
            intelligent document processing pipelines, and high-performance full-stack applications.
          </p>
        </div>

        <div className='py-16 flex flex-col'>
          <h3 className='font-oxanium text-2xl font-bold mb-10'>Technical Arsenal</h3>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {Object.entries(skills).map(([category, techList]) => (
              <div key={category} className="tech-card">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-1.5 h-6 rounded-full" 
                    style={{ background: categoryAccent[category] === 'violet' ? 'var(--violet)' : 'var(--cyan)' }}
                  />
                  <h4 className="font-oxanium font-bold text-sm tracking-widest uppercase opacity-80">{category}</h4>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {techList.map((skill) => (
                    <span 
                      key={skill} 
                      className={`skill-tag ${categoryAccent[category] === 'violet' ? 'skill-tag-violet' : ''}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='py-16'>
          <h3 className='font-oxanium text-2xl font-bold mb-4'>Career Trajectory</h3>
          <div className='mb-12 section-subtitle'>
            <p>
              Bridging the gap between systematic communication and complex automation workflows. 
              Here is how my professional path has evolved:
            </p>
          </div>

          <div className='mt-12'>
            <VerticalTimeline lineColor="rgba(0, 212, 255, 0.15)">
              {experiences.map((experience) => (
                <VerticalTimelineElement
                  key={experience.company}
                  date={experience.date}
                  iconStyle={{ 
                    background: experience.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem"
                  }}
                  icon={<span>{experience.iconEmoji}</span>}
                >
                  <div>
                    <h3 className='font-oxanium font-bold text-xl' style={{ color: "var(--text-primary)" }}>
                      {experience.title}
                    </h3>
                    <p className='font-oxanium font-semibold' style={{ color: experience.iconColor, margin: 0 }}>
                      {experience.company}
                    </p>
                  </div>

                  <ul className='my-5 space-y-2'>
                    {experience.points.map((point, index) => (
                      <li key={`point-${index}`} className='text-secondary text-sm flex gap-2'>
                        <span style={{ color: experience.iconColor }}>▸</span> {point}
                      </li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default About;
