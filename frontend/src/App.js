function App() {
  return (
    <>
      <header className="hero">
        <div className="hero-inner">
          <h1>Santhosh Panakanti</h1>
          <p className="tagline">Software Engineer</p>
          <div className="contact">
            <a href="tel:+13143704001">+1 (314) 370-4001</a>
            <span className="sep">·</span>
            <a href="mailto:panakantisanthoshrao@gmail.com">
              panakantisanthoshrao@gmail.com
            </a>
            <span className="sep">·</span>
            <a
              href="https://linkedin.com/in/santhoshpanakanti"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <span className="sep">·</span>
            <a
              href="https://github.com/santhosh8179"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="section">
          <h2 className="section-title">Professional Summary</h2>
          <p className="summary">
            Full Stack Developer with 3+ years of experience designing and
            developing enterprise-scale applications for Fortune 500 companies
            in financial services and e-commerce. Expertise in building
            microservices architecture using Java, Spring Boot, Angular, and
            React with hands-on experience in cloud platforms (AWS, Azure),
            CI/CD pipelines, and event-driven systems using Apache Kafka. Proven
            track record of improving application performance by 60%, reducing
            deployment time by 70%, and mentoring development teams. Proficient
            in Agile methodologies, test-driven development, and delivering
            high-quality, scalable solutions.
          </p>
        </section>

        <section className="section">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skill-grid">
            <div>
              <div className="skill-cat">Languages</div>
              <div className="skill-list">
                <span>Java (8/11/17)</span>
                <span>JavaScript</span>
                <span>TypeScript</span>
                <span>Python</span>
                <span>SQL</span>
                <span>HTML5</span>
                <span>CSS3</span>
                <span>SCSS</span>
              </div>
            </div>
            <div>
              <div className="skill-cat">Frontend</div>
              <div className="skill-list">
                <span>Angular (11-16)</span>
                <span>React.js</span>
                <span>Next.js</span>
                <span>RxJS</span>
                <span>NgRx</span>
                <span>Redux</span>
                <span>Bootstrap</span>
                <span>Material UI</span>
                <span>Responsive Design</span>
              </div>
            </div>
            <div>
              <div className="skill-cat">Backend</div>
              <div className="skill-list">
                <span>Spring Boot</span>
                <span>Spring MVC</span>
                <span>Spring Security</span>
                <span>Microservices</span>
                <span>Node.js</span>
                <span>Express.js</span>
                <span>RESTful APIs</span>
                <span>GraphQL</span>
                <span>Hibernate</span>
                <span>JPA</span>
                <span>Servlets</span>
              </div>
            </div>
            <div>
              <div className="skill-cat">Database</div>
              <div className="skill-list">
                <span>PostgreSQL</span>
                <span>MySQL</span>
                <span>MongoDB</span>
                <span>SQL Server</span>
                <span>Oracle</span>
                <span>Redis</span>
                <span>Query Optimization</span>
                <span>Indexing</span>
                <span>Stored Procedures</span>
              </div>
            </div>
            <div>
              <div className="skill-cat">Cloud & DevOps</div>
              <div className="skill-list">
                <span>AWS (EC2, S3, Lambda, RDS, CloudFront)</span>
                <span>Azure (App Service, Functions, Storage)</span>
                <span>Docker</span>
                <span>Kubernetes</span>
                <span>Jenkins</span>
                <span>CI/CD</span>
              </div>
            </div>
            <div>
              <div className="skill-cat">Testing & Tools</div>
              <div className="skill-list">
                <span>Jest</span>
                <span>Jasmine</span>
                <span>Karma</span>
                <span>JUnit</span>
                <span>Mockito</span>
                <span>Selenium</span>
                <span>Cucumber</span>
                <span>Postman</span>
                <span>Git</span>
                <span>GitHub</span>
                <span>Maven</span>
                <span>Gradle</span>
                <span>Agile/Scrum</span>
                <span>Jira</span>
                <span>VS Code</span>
                <span>IntelliJ</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Professional Experience</h2>

          <div className="card">
            <h3>Software Engineer</h3>
            <div className="meta">
              Accenture Solutions Pvt. Ltd., Hyderabad, India · Mar 2023 – Dec
              2024
            </div>
            <div className="meta sub">
              Client: Brighthouse Financial (Fortune 500 Insurance Platform)
            </div>
            <ul>
              <li>
                Developed enterprise insurance platform serving 50,000+
                policyholders using Angular 14-16 and Spring Boot microservices
                with Apache Kafka for event-driven architecture, reducing claim
                processing time by 40% and handling 100,000+ daily transactions.
              </li>
              <li>
                Implemented OAuth2/JWT authentication with Spring Security and
                role-based access control achieving SOC 2 compliance; optimized
                database queries with Redis caching reducing API response time
                by 60% and supporting 5,000+ concurrent users.
              </li>
              <li>
                Built responsive Angular components using NgRx state management
                and RxJS achieving 90+ Lighthouse score; established CI/CD
                pipeline with Jenkins and Docker achieving 85%+ code coverage,
                reducing deployment time by 70% and production bugs by 45%.
              </li>
              <li>
                Mentored 2 junior developers through code reviews and pair
                programming, participated in architecture discussions, and
                delivered features on-time across 15+ agile sprints in
                cross-functional team environment.
              </li>
            </ul>
          </div>

          <div className="card">
            <h3>Associate Software Engineer</h3>
            <div className="meta">
              Accenture Solutions Pvt. Ltd., Hyderabad, India · Feb 2022 – Mar
              2023
            </div>
            <div className="meta sub">
              Client: Shoppers Stop (E-Commerce Platform)
            </div>
            <ul>
              <li>
                Developed 30+ reusable Angular components for product catalog,
                search, and checkout flows serving 1.5M+ monthly users,
                improving conversion rate by 18% through A/B testing and UX
                optimization with lazy loading and code splitting.
              </li>
              <li>
                Built scalable RESTful APIs using Spring Boot and Node.js for
                inventory management system handling 300,000+ SKUs with
                real-time stock updates, reducing out-of-stock incidents by 35%
                through optimized database indexing.
              </li>
              <li>
                Integrated Stripe payment gateway with PCI-DSS compliant
                security processing $30M+ annual transactions achieving 99.9%
                success rate; optimized frontend with AWS CloudFront CDN
                achieving 92 Lighthouse score and reducing page load time by
                50%.
              </li>
              <li>
                Wrote comprehensive unit and integration tests using Jasmine,
                Karma, and JUnit maintaining 80%+ code coverage, performed code
                reviews, and resolved 150+ bugs improving application stability.
              </li>
            </ul>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Internship</h2>
          <div className="card">
            <h3>Full Stack Development Intern</h3>
            <div className="meta">
              Newton School | Coding Bootcamp · Feb 2021 – Dec 2021
            </div>
            <ul>
              <li>
                Completed intensive 11 months coding bootcamp focusing on
                full-stack web development, data structures, algorithms and
                modern technologies including React, Node.js, Java, HTML5, CSS3
                and JavaScript.
              </li>
              <li>
                Built 5+ full-stack projects including movie booking platform,
                recipe search application, and meditation app.
              </li>
            </ul>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Projects</h2>

          <div className="card">
            <h3>AI-Powered Document Summarization App</h3>
            <div className="meta">
              Python, FastAPI, LangChain, React.js, TypeScript, PostgreSQL,
              Redis, Docker
            </div>
            <p className="project-desc">
              Built full-stack application with real-time chat and AI-powered
              text summarization using OpenAI GPT-4 API and LangChain, reducing
              document review time by 70% for 200+ beta users with sub-second
              response times.
            </p>
            <a
              href="https://github.com/santhosh8179/AI-Powered-Document-Summarization-App"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              View on GitHub →
            </a>
          </div>

          <div className="card">
            <h3>Conference Room Booking System</h3>
            <div className="meta">
              Node.js, Express.js, MongoDB, React.js, Socket.io, JWT,
              Material-UI, Docker, AWS EC2
            </div>
            <p className="project-desc">
              Developed enterprise MERN stack booking platform with real-time
              availability, conflict resolution, and admin dashboard supporting
              200+ concurrent users with WebSocket integration for instant
              updates.
            </p>
            <a
              href="https://github.com/santhosh8179/Conference-Room-Booking-System"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              View on GitHub →
            </a>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Education</h2>
          <div className="card">
            <h3>Master of Science in Cybersecurity Operations</h3>
            <div className="meta">
              Webster University, St. Louis, MO · GPA: 3.8/4.0 · Expected May
              2026
            </div>
          </div>
          <div className="card">
            <h3>Bachelor of Technology in Civil Engineering</h3>
            <div className="meta">
              Guru Nanak Institutions technical campus, India · GPA: 8.44/10.0 ·
              2016 – 2020
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section">
          <p className="footer-text">
            © {new Date().getFullYear()} Santhosh Panakanti · Software Engineer
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
