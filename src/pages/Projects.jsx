import { projects, categoryAccent } from "../constants";
import { Footer } from "../components";

const Projects = () => {
  const tier1 = projects.filter(p => p.tier === 1);
  const tier2 = projects.filter(p => p.tier === 2);

  return (
    <main className="bg-primary min-h-screen pt-24">
      <section className='section-container'>
        <p className="section-label">Portfolio</p>
        <h1 className='section-title'>
          Engineering <br />
          <span className='gradient-text'>Showcase</span>
        </h1>

        <p className='section-subtitle mt-2 mb-16'>
          A collection of systems designed to solve complex data challenges, 
          from multi-platform browser orchestration to intelligent document parsing.
        </p>

        {/* Tier 1: Detailed Cards */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16'>
          {tier1.map((project) => (
            <div key={project.id} className="project-card flex flex-col">
              <div 
                className="h-1.5 w-full" 
                style={{ background: project.theme === 'violet' ? 'var(--violet)' : project.theme === 'amber' ? 'var(--amber)' : 'var(--cyan)' }}
              />
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-4">
                  <span className={`badge ${project.theme === 'violet' ? 'badge-violet' : project.theme === 'amber' ? 'badge-amber' : ''} mb-3`}>
                    Featured System
                  </span>
                  <h3 className="font-oxanium font-bold text-2xl">{project.name}</h3>
                  <p className="font-oxanium text-xs tracking-wider opacity-60 mt-1 uppercase" 
                     style={{ color: project.theme === 'violet' ? 'var(--violet)' : project.theme === 'amber' ? 'var(--amber)' : 'var(--cyan)' }}>
                    {project.tagline}
                  </p>
                </div>

                <p className="text-secondary text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="bg-white/5 rounded-lg p-4 mb-6">
                  <h4 className="text-xs font-oxanium font-bold uppercase mb-2 opacity-50">Core Challenge</h4>
                  <p className="text-xs text-secondary italic">"{project.challenges[0]}"</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {project.stack.map(s => (
                    <span key={s} className="skill-tag text-[10px]">{s}</span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-outline text-xs px-6 py-2"
                  >
                    Source
                  </a>
                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn-primary text-xs px-6 py-2"
                    >
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tier 2: Compact Cards */}
        <div className="pt-10">
          <h3 className="font-oxanium text-xl font-bold mb-8 opacity-80">Auxiliary Projects</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {tier2.map((project) => (
              <div key={project.id} className="project-card-sm p-6 flex flex-col border-white/5 bg-white/5">
                <div 
                  className="w-8 h-0.5 mb-4" 
                  style={{ background: project.theme === 'violet' ? 'var(--violet)' : 'var(--cyan)' }}
                />
                <h4 className="font-oxanium font-bold text-sm mb-2">{project.name}</h4>
                <p className="text-xs text-secondary mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.stack.slice(0, 3).map(s => (
                    <span key={s} className="text-[9px] opacity-60 font-oxanium uppercase tracking-tighter">{s}</span>
                  ))}
                </div>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-xs font-oxanium font-bold hover:underline"
                  style={{ color: project.theme === 'violet' ? 'var(--violet)' : 'var(--cyan)' }}
                >
                  View Source →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Projects;
