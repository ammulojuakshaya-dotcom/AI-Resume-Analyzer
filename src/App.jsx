import { useState, useRef } from 'react'
import {
  Sparkles,
  FileText,
  Target,
  BrainCircuit,
  CheckCircle,
  ArrowRight,
  Zap,
  ShieldCheck,
  Menu,
  X,
  Download,
  TrendingUp,
  Upload,
  BookOpen,
  GraduationCap,
  RotateCcw,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import './App.css'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

const roleSkills = {
  'Java Developer': [
    'java', 'oops', 'object-oriented programming', 'sql',
    'jdbc', 'spring', 'spring boot', 'hibernate',
    'data structures', 'projects'
  ],
  'Frontend Developer': [
    'html', 'css', 'javascript', 'react', 'responsive design',
    'typescript', 'git', 'api', 'ui', 'projects'
  ],
  'Full Stack Developer': [
    'html', 'css', 'javascript', 'react', 'node.js',
    'express', 'mongodb', 'sql', 'api', 'projects'
  ],
  'Software Engineer': [
    'java', 'python', 'data structures', 'algorithms',
    'sql', 'git', 'testing', 'problem solving',
    'teamwork', 'projects'
  ],
  'Data Analyst': [
    'sql', 'python', 'excel', 'power bi', 'tableau',
    'statistics', 'data analysis', 'visualization',
    'communication', 'projects'
  ],
  'Python Developer': [
    'python', 'sql', 'oops', 'django', 'flask',
    'api', 'git', 'testing', 'data structures', 'projects'
  ]
}

const interviewBank = {
  'Java Developer': [
    {
      q: 'What is object-oriented programming?',
      a: 'OOP is a programming approach based on objects and classes. Its four main principles are encapsulation, inheritance, polymorphism, and abstraction.'
    },
    {
      q: 'What is the difference between JDK, JRE, and JVM?',
      a: 'JVM executes Java bytecode, JRE provides the environment required to run Java applications, and JDK includes development tools such as the compiler.'
    },
    {
      q: 'What is exception handling in Java?',
      a: 'Exception handling manages runtime errors using constructs such as try, catch, finally, throw, and throws.'
    }
  ],
  'Frontend Developer': [
    {
      q: 'What is the difference between HTML, CSS, and JavaScript?',
      a: 'HTML defines page structure, CSS controls appearance and layout, and JavaScript adds behavior and interactivity.'
    },
    {
      q: 'What is responsive web design?',
      a: 'Responsive design adapts layouts to different screen sizes using flexible layouts, media queries, and appropriately sized content.'
    },
    {
      q: 'What are React components?',
      a: 'Components are reusable building blocks of a React interface. They can accept props and use state to manage changing data.'
    }
  ],
  'Full Stack Developer': [
    {
      q: 'What is the difference between frontend and backend?',
      a: 'The frontend is the user-facing interface. The backend handles server-side logic, data processing, authentication, and database interactions.'
    },
    {
      q: 'What is a REST API?',
      a: 'A REST API exposes resources through HTTP endpoints and commonly uses methods such as GET, POST, PUT, PATCH, and DELETE.'
    },
    {
      q: 'Why do applications use databases?',
      a: 'Databases store, organize, retrieve, and update application data in a structured and reliable way.'
    }
  ],
  'Software Engineer': [
    {
      q: 'What is the difference between a stack and a queue?',
      a: 'A stack uses last-in, first-out ordering. A queue uses first-in, first-out ordering.'
    },
    {
      q: 'What is time complexity?',
      a: 'Time complexity describes how an algorithm’s running time grows as the input size increases, often expressed using Big O notation.'
    },
    {
      q: 'How do you debug a program?',
      a: 'Reproduce the problem, inspect error messages, isolate the failing section, test a hypothesis, apply a fix, and run regression tests.'
    }
  ],
  'Data Analyst': [
    {
      q: 'What is the difference between SQL WHERE and HAVING?',
      a: 'WHERE filters rows before grouping. HAVING filters groups after aggregation.'
    },
    {
      q: 'What is data cleaning?',
      a: 'Data cleaning identifies and addresses issues such as missing values, duplicates, inconsistent formats, and incorrect records.'
    },
    {
      q: 'What is a dashboard?',
      a: 'A dashboard presents important metrics and visualizations in one place to help people monitor performance and make decisions.'
    }
  ],
  'Python Developer': [
    {
      q: 'What is the difference between a list and a tuple?',
      a: 'Lists are mutable, meaning their contents can change. Tuples are immutable after creation.'
    },
    {
      q: 'What is a Python dictionary?',
      a: 'A dictionary stores key-value pairs and allows values to be accessed through their keys.'
    },
    {
      q: 'What is a virtual environment?',
      a: 'A virtual environment isolates project dependencies so different Python projects can use different package versions.'
    }
  ]
}

const quizQuestions = [
  {
    q: 'Which section should describe your relevant work and internship history?',
    options: ['Experience', 'References only', 'Page footer', 'Declaration only'],
    answer: 0,
    explanation: 'The Experience section summarizes relevant work, internships, responsibilities, and achievements.'
  },
  {
    q: 'What is the best way to improve a resume bullet point?',
    options: [
      'Use vague descriptions',
      'Describe an action and its measurable result',
      'Add unrelated keywords',
      'Write one very long paragraph'
    ],
    answer: 1,
    explanation: 'Action verbs and measurable outcomes help employers understand your contribution.'
  },
  {
    q: 'What does ATS commonly stand for in recruitment?',
    options: [
      'Application Tracking Software',
      'Applicant Tracking System',
      'Automated Training Service',
      'Advanced Typing Setup'
    ],
    answer: 1,
    explanation: 'ATS stands for Applicant Tracking System, software used by many employers to manage applications.'
  },
  {
    q: 'Which resume format is generally easiest for automated systems to parse?',
    options: [
      'A scanned image with no selectable text',
      'A heavily decorated graphic',
      'A clear document with standard headings',
      'A document made entirely of screenshots'
    ],
    answer: 2,
    explanation: 'A clear structure and selectable text are generally easier for parsing software to process.'
  },
  {
    q: 'Should you list a skill you do not actually have?',
    options: [
      'Yes, to increase keyword count',
      'Only if it is popular',
      'No, represent your abilities honestly',
      'Yes, if it is in the job description'
    ],
    answer: 2,
    explanation: 'Only list skills you can honestly demonstrate. You can mention a skill you are actively learning when clearly described.'
  }
]

const roadmap = [
  {
    title: 'Build your foundations',
    time: 'Week 1–2',
    description: 'Review core programming concepts, problem solving, and the fundamentals required for your target role.',
    tasks: ['Review essential concepts', 'Practise small exercises', 'Identify learning gaps']
  },
  {
    title: 'Create practical projects',
    time: 'Week 3–4',
    description: 'Build one or two projects that demonstrate your skills and solve a clear problem.',
    tasks: ['Finish a small project', 'Write a clear README', 'Document technologies and outcomes']
  },
  {
    title: 'Strengthen your profile',
    time: 'Week 5',
    description: 'Improve your resume, portfolio, GitHub profile, and professional introduction.',
    tasks: ['Tailor your resume', 'Update your portfolio', 'Review your project descriptions']
  },
  {
    title: 'Prepare and apply',
    time: 'Week 6 onward',
    description: 'Practise interviews and apply to relevant openings while continuing to improve your skills.',
    tasks: ['Practise interview questions', 'Apply to suitable roles', 'Track applications and feedback']
  }
]

function App() {
  const [page, setPage] = useState('home')
  const [resumeText, setResumeText] = useState('')
  const [jobRole, setJobRole] = useState('Java Developer')
  const [result, setResult] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [openQuestions, setOpenQuestions] = useState([0])
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [roadmapDone, setRoadmapDone] = useState([])
  const [practiceAnswer, setPracticeAnswer] = useState('')
  const [practiceFeedback, setPracticeFeedback] = useState('')
  const fileInputRef = useRef(null)

  const skills = roleSkills[jobRole] || roleSkills['Software Engineer']
  const questions = interviewBank[jobRole] || interviewBank['Software Engineer']

  function navigate(nextPage) {
    setPage(nextPage)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.replaceState(null, '', nextPage === 'home' ? '#home' : `#${nextPage}`)
  }

  async function handlePdfUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please select a PDF file.')
      event.target.value = ''
      return
    }

    setPdfLoading(true)
    setFileName('')

    try {
      const buffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({
        data: new Uint8Array(buffer)
      }).promise

      let extractedText = ''

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber)
        const content = await page.getTextContent()

        extractedText += content.items
          .map(item => ('str' in item ? item.str : ''))
          .join(' ') + '\n'
      }

      if (!extractedText.trim()) {
        alert('No selectable text was found. This may be a scanned PDF; OCR is needed for image-only PDFs.')
        return
      }

      setResumeText(extractedText.trim())
      setFileName(file.name)
      setResult(null)
    } catch (error) {
      console.error('PDF extraction error:', error)
      alert('Could not read this PDF. Please try another PDF file.')
    } finally {
      setPdfLoading(false)
      event.target.value = ''
    }
  }

  function analyzeResume(event) {
    event.preventDefault()

    if (!resumeText.trim()) {
      alert('Please upload a PDF or paste your resume text first.')
      return
    }

    const text = resumeText.toLowerCase()
    const found = skills.filter(skill => text.includes(skill))
    const missing = skills.filter(skill => !text.includes(skill))

    const keywordScore = Math.round((found.length / skills.length) * 80)
    const lengthBonus = text.length >= 500 ? 10 : text.length >= 200 ? 5 : 0
    const sectionBonus =
      (text.includes('education') ? 2 : 0) +
      (text.includes('experience') ? 2 : 0) +
      (text.includes('project') ? 3 : 0) +
      (text.includes('certification') ? 3 : 0)

    const score = Math.min(95, keywordScore + lengthBonus + sectionBonus)
    const tips = []

    if (missing.length) {
      tips.push(`Review the job description for these ${jobRole} keywords: ${missing.slice(0, 4).join(', ')}. Include them only if they accurately describe your skills.`)
    }
    if (!text.includes('project')) {
      tips.push('Add a Projects section with the problem, your contribution, technologies, and results.')
    }
    if (!text.includes('education')) {
      tips.push('Add your educational qualifications, institution, and graduation date if relevant.')
    }
    if (!text.includes('experience')) {
      tips.push('Include relevant internships, volunteering, training, or work experience where applicable.')
    }
    if (!text.includes('%') && !text.includes('increased') && !text.includes('improved')) {
      tips.push('Add measurable outcomes when possible, such as time saved, users supported, or accuracy improved.')
    }
    if (text.length < 250) {
      tips.push('Your extracted resume text is quite short. Check that all important sections were included.')
    }
    tips.push('Use consistent headings, readable formatting, and concise bullet points.')

    setResult({ score, found, missing, tips, role: jobRole })
    navigate('analyzer')
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
  }

  function downloadReport() {
    if (!result) return
    window.print()
  }

  function submitQuiz() {
    setQuizSubmitted(true)
    setTimeout(() => {
      document.getElementById('quiz-result')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 50)
  }

  function resetQuiz() {
    setQuizAnswers({})
    setQuizSubmitted(false)
  }

  function submitPracticeAnswer() {
    if (!practiceAnswer.trim()) {
      setPracticeFeedback('Write a short answer first, then review the guidance below.')
      return
    }
    setPracticeFeedback('Self-review: Did you explain the situation, your action, and the result? Add a specific example from your own experience, and keep your answer clear and honest.')
  }

  const features = [
    {
      id: 'analyzer',
      icon: <FileText size={25} />,
      title: 'Resume Analyzer',
      text: 'Upload a PDF, estimate keyword alignment, and get actionable feedback.',
      color: 'purple-card'
    },
    {
      id: 'skills',
      icon: <Target size={25} />,
      title: 'Skill Gap Finder',
      text: 'Compare your resume with role-specific skills and plan what to learn next.',
      color: 'blue-card'
    },
    {
      id: 'interview',
      icon: <BrainCircuit size={25} />,
      title: 'Interview Assistant',
      text: 'Explore common technical questions, sample answers, and interview tips.',
      color: 'pink-card'
    },
    {
      id: 'quiz',
      icon: <Zap size={25} />,
      title: 'Practice Quiz',
      text: 'Test your resume knowledge with questions, explanations, and a score.',
      color: 'orange-card'
    },
    {
      id: 'roadmap',
      icon: <GraduationCap size={25} />,
      title: 'Career Roadmap',
      text: 'Follow a practical checklist from learning fundamentals to applying for roles.',
      color: 'green-card'
    }
  ]

  return (
    <div className="app">
      <header className="navbar" id="home">
        <button className="brand" onClick={() => navigate('home')}>
          <span className="brand-icon"><Sparkles size={23} /></span>
          Resume<span className="brand-ai">AI</span>
        </button>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <button onClick={() => navigate('home')}>Home</button>
          <button onClick={() => navigate('analyzer')}>Resume Analyzer</button>
          <button onClick={() => navigate('skills')}>Skill Gap Finder</button>
          <button onClick={() => navigate('interview')}>Interview Assistant</button>
          <button onClick={() => navigate('quiz')}>Practice Quiz</button>
          <button className="nav-button" onClick={() => navigate('roadmap')}>
            Career Roadmap <ArrowRight size={16} />
          </button>
        </nav>
      </header>

      <main>
        {page === 'home' && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow"><Sparkles size={15} /> YOUR AI-POWERED CAREER PARTNER</div>
                <h1>Your dream job starts with a <span className="gradient-text">smarter resume.</span></h1>
                <p>Discover your strengths, identify skill gaps, and prepare for your next opportunity with one colorful career toolkit.</p>
                <div className="hero-actions">
                  <button className="primary-button" onClick={() => navigate('analyzer')}>Analyze My Resume <ArrowRight size={18} /></button>
                  <button className="secondary-button" onClick={() => navigate('skills')}>Explore Features</button>
                </div>
                <div className="trust-row">
                  <span><ShieldCheck size={17} /> PDF text extraction</span>
                  <span><Zap size={17} /> Instant feedback</span>
                </div>
              </div>

              <div className="hero-visual">
                <div className="orb orb-one" />
                <div className="orb orb-two" />
                <div className="resume-card">
                  <div className="resume-card-top">
                    <div className="file-icon"><FileText size={25} /></div>
                    <div><strong>Resume Analysis</strong><small>YOUR CAREER SNAPSHOT</small></div>
                    <span className="status-dot" />
                  </div>
                  <div className="score-area">
                    <div className="score-ring"><div><strong>{result ? result.score : '92'}</strong><small>/100</small></div></div>
                    <div><strong className="score-label">{result ? 'Analysis complete' : 'Your next step!'}</strong><p>{result ? 'Your latest keyword estimate.' : 'Make your experience stand out.'}<br /><span className="score-tag">{result ? 'Illustrative score' : 'Example score'}</span></p></div>
                  </div>
                  <div className="mini-metric"><span>Resume structure</span><strong>Review</strong><div className="metric-track"><div style={{ width: '78%' }} /></div></div>
                  <div className="mini-metric"><span>Skills visibility</span><strong>Explore</strong><div className="metric-track"><div style={{ width: '70%' }} /></div></div>
                  <div className="floating-badge"><Sparkles size={17} /> Career insights</div>
                </div>
              </div>
            </section>

            <section className="features-section" id="features">
              <div className="section-heading">
                <span className="section-kicker">BUILT FOR YOUR NEXT BIG STEP</span>
                <h2>Everything you need to <span className="gradient-text">stand out</span></h2>
                <p>Choose a tool and open its own dedicated workspace.</p>
              </div>
              <div className="feature-grid">
                {features.map(feature => (
                  <article className={`feature-card ${feature.color}`} key={feature.id}>
                    <div className="feature-icon">{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                    <button onClick={() => navigate(feature.id)}>Open feature <ArrowRight size={16} /></button>
                  </article>
                ))}
              </div>
            </section>

            <section className="interview-section">
              <div className="interview-card">
                <div className="interview-icon"><BrainCircuit size={30} /></div>
                <div><span className="section-kicker">YOUR CAREER TOOLKIT</span><h2>Prepare with purpose. Apply with confidence.</h2><p>Use practical tools to improve your resume and plan your next learning steps.</p></div>
                <button className="primary-button" onClick={() => navigate('roadmap')}>View Roadmap <ArrowRight size={17} /></button>
              </div>
            </section>
          </>
        )}

        {page !== 'home' && (
          <section className={`feature-page page-${page}`}>
            <div className="page-topline">
              <button className="secondary-button" onClick={() => navigate('home')}>← Back to Home</button>
              <span className="section-kicker">RESUMEAI CAREER WORKSPACE</span>
            </div>

            {page === 'analyzer' && (
              <>
                <div className="section-heading">
                  <span className="section-kicker">PDF-POWERED RESUME REVIEW</span>
                  <h1>Resume <span className="gradient-text">Analyzer</span></h1>
                  <p>Upload a text-based PDF or paste your resume, then choose a target role.</p>
                </div>

                <form className="analyzer-panel" onSubmit={analyzeResume}>
                  <label htmlFor="jobRole">Target job role</label>
                  <select id="jobRole" value={jobRole} onChange={event => setJobRole(event.target.value)}>
                    {Object.keys(roleSkills).map(role => <option key={role}>{role}</option>)}
                  </select>

                  <label htmlFor="resumePdf">Upload resume PDF</label>
                  <div className="upload-area">
                    <input ref={fileInputRef} id="resumePdf" type="file" accept=".pdf,application/pdf" onChange={handlePdfUpload} hidden />
                    <div className="upload-symbol"><Upload size={30} /></div>
                    <strong>{pdfLoading ? 'Extracting text from PDF...' : fileName || 'Drop in your resume and get started'}</strong>
                    <p>PDF only · Text-based PDFs work best · Your file is processed in this browser</p>
                    <button className="secondary-button" type="button" disabled={pdfLoading} onClick={() => fileInputRef.current?.click()}>
                      <FileText size={18} /> {pdfLoading ? 'Please wait...' : 'Choose PDF'}
                    </button>
                  </div>

                  <label htmlFor="resumeText">Resume text</label>
                  <textarea id="resumeText" rows="9" value={resumeText} onChange={event => { setResumeText(event.target.value); setFileName('') }} placeholder="Your extracted resume text will appear here. You can also paste it manually..." />

                  <div className="form-footer">
                    <span>{resumeText.length} characters</span>
                    <button className="primary-button" type="submit"><Sparkles size={18} /> Analyze Resume</button>
                  </div>
                  <p className="privacy-note"><ShieldCheck size={15} /> Analysis runs locally in this demo. Avoid uploading sensitive personal information unnecessarily.</p>
                </form>

                {result && (
                  <div className="results-panel" id="results">
                    <div className="results-heading">
                      <div><span className="section-kicker">YOUR RESULTS</span><h2>Resume insights</h2><p>Target role: {result.role}</p></div>
                      <button className="download-button" type="button" onClick={downloadReport}><Download size={17} /> Print / Save PDF</button>
                    </div>
                    <p className="demo-disclaimer">This is an illustrative keyword-based estimate, not a validated ATS score or a guaranteed hiring outcome.</p>
                    <div className="dashboard-grid">
                      <div className="dashboard-card score-dashboard">
                        <div className="dashboard-card-title"><Target size={19} /><span>Keyword Match Estimate</span></div>
                        <div className="dashboard-score-ring" style={{ '--score-angle': `${result.score * 3.6}deg` }}><div className="dashboard-score-inner"><strong>{result.score}</strong><span>out of 100</span></div></div>
                        <h3>{result.score >= 75 ? 'Strong keyword match!' : result.score >= 50 ? 'A good start!' : 'Room to improve'}</h3>
                        <p>{result.found.length} of {skills.length} tracked keywords found.</p>
                      </div>
                      <div className="dashboard-card">
                        <div className="dashboard-card-title"><CheckCircle size={19} /><span>Matching Skills</span></div>
                        <div className="big-number">{result.found.length}</div>
                        <p className="card-description">Keywords found in the extracted text.</p>
                        <div className="skill-list">{result.found.length ? result.found.map(skill => <span className="skill-chip" key={skill}>{skill}</span>) : <p>No tracked keywords found yet.</p>}</div>
                      </div>
                      <div className="dashboard-card">
                        <div className="dashboard-card-title"><TrendingUp size={19} /><span>Keywords to Review</span></div>
                        <div className="big-number">{result.missing.length}</div>
                        <p className="card-description">Potential gaps to compare with the job description.</p>
                        <div className="skill-list">{result.missing.length ? result.missing.map(skill => <span className="missing-chip" key={skill}>{skill}</span>) : <p>All tracked keywords were found.</p>}</div>
                        <p className="small-note">Only list skills you can honestly demonstrate.</p>
                      </div>
                    </div>
                    <div className="result-box tips-box"><h3><Sparkles size={19} /> Improvement Suggestions</h3><ul className="suggestion-list">{result.tips.map((tip, index) => <li key={index}><span className="suggestion-number">{index + 1}</span><span>{tip}</span></li>)}</ul></div>
                  </div>
                )}
              </>
            )}

            {page === 'skills' && (
              <>
                <div className="section-heading">
                  <span className="section-kicker">UNDERSTAND YOUR NEXT LEARNING STEPS</span>
                  <h1>Skill Gap <span className="gradient-text">Finder</span></h1>
                  <p>Choose a role to explore the skills employers may look for. Analyze a resume first to compare your tracked keywords.</p>
                </div>
                <div className="tool-panel">
                  <label htmlFor="skillRole">Target job role</label>
                  <select id="skillRole" value={jobRole} onChange={event => setJobRole(event.target.value)}>{Object.keys(roleSkills).map(role => <option key={role}>{role}</option>)}</select>
                  <div className="skill-summary"><div><span>Tracked skills</span><strong>{skills.length}</strong></div><div><span>Found in resume</span><strong>{result && result.role === jobRole ? result.found.length : 0}</strong></div><div><span>To review</span><strong>{result && result.role === jobRole ? result.missing.length : skills.length}</strong></div></div>
                  <div className="skills-board">
                    {skills.map((skill, index) => {
                      const found = result && result.role === jobRole && result.found.includes(skill)
                      return <div className={`skill-row ${found ? 'skill-found' : 'skill-review'}`} key={skill}><span className="skill-status">{found ? '✓' : '＋'}</span><div><strong>{skill}</strong><p>{found ? 'Found in your resume text' : 'Review against the job description'}</p></div><span className="skill-label">{found ? 'Matched' : 'To review'}</span></div>
                    })}
                  </div>
                  <h3 className="subheading"><BookOpen size={20} /> Suggested learning actions</h3>
                  <div className="learning-grid">
                    <article><span>01</span><h3>Learn the fundamentals</h3><p>Study one skill at a time and practise with small exercises.</p></article>
                    <article><span>02</span><h3>Build a mini-project</h3><p>Apply the skill in a small project you can explain during an interview.</p></article>
                    <article><span>03</span><h3>Show your evidence</h3><p>Document your project, your contribution, and what you learned.</p></article>
                  </div>
                  <button className="primary-button" onClick={() => navigate('analyzer')}>Analyze my resume <ArrowRight size={17} /></button>
                </div>
              </>
            )}

            {page === 'interview' && (
              <>
                <div className="section-heading">
                  <span className="section-kicker">PRACTISE BEFORE THE BIG DAY</span>
                  <h1>Interview <span className="gradient-text">Assistant</span></h1>
                  <p>Explore role-specific technical questions, sample answers, and a simple self-review exercise.</p>
                </div>
                <div className="tool-panel">
                  <label htmlFor="interviewRole">Interview role</label>
                  <select id="interviewRole" value={jobRole} onChange={event => { setJobRole(event.target.value); setOpenQuestions([0]) }}>{Object.keys(interviewBank).map(role => <option key={role}>{role}</option>)}</select>
                  <div className="interview-question-list">
                    {questions.map((item, index) => {
                      const open = openQuestions.includes(index)
                      return <article className="question-card" key={item.q}><button className="question-toggle" onClick={() => setOpenQuestions(old => open ? old.filter(value => value !== index) : [...old, index])}><span><span className="question-number">{String(index + 1).padStart(2, '0')}</span>{item.q}</span>{open ? <ChevronUp /> : <ChevronDown />}</button>{open && <div className="question-answer"><strong>Sample answer</strong><p>{item.a}</p><div className="answer-tip"><Sparkles size={16} /> Explain the concept in your own words and add a real example where possible.</div></div>}</article>
                    })}
                  </div>
                  <div className="practice-box">
                    <h3>Practice your own answer</h3>
                    <p>Try answering: “Tell me about a project you are proud of.”</p>
                    <textarea rows="5" value={practiceAnswer} onChange={event => { setPracticeAnswer(event.target.value); setPracticeFeedback('') }} placeholder="Describe the situation, your role, actions, and outcome..." />
                    <button className="primary-button" onClick={submitPracticeAnswer}>Review my answer <ArrowRight size={17} /></button>
                    {practiceFeedback && <p className="feedback-message">{practiceFeedback}</p>}
                    <p className="small-note">This is a self-review prompt, not an AI evaluation of your answer.</p>
                  </div>
                </div>
              </>
            )}

            {page === 'quiz' && (
              <>
                <div className="section-heading">
                  <span className="section-kicker">LEARN BY DOING</span>
                  <h1>Resume Skills <span className="gradient-text">Quiz</span></h1>
                  <p>Answer these five questions and review the explanations to strengthen your job-search knowledge.</p>
                </div>
                <div className="tool-panel">
                  <div className="quiz-topline"><span>{Object.keys(quizAnswers).length} of {quizQuestions.length} answered</span><span>Practice mode · No timer</span></div>
                  {quizQuestions.map((item, index) => <div className="quiz-question" key={item.q}><h3><span className="question-number">{index + 1}</span>{item.q}</h3><div className="quiz-options">{item.options.map((option, optionIndex) => <label className={`quiz-option ${quizSubmitted && optionIndex === item.answer ? 'correct-option' : ''} ${quizSubmitted && quizAnswers[index] === optionIndex && optionIndex !== item.answer ? 'wrong-option' : ''}`} key={option}><input type="radio" name={`quiz-${index}`} checked={quizAnswers[index] === optionIndex} disabled={quizSubmitted} onChange={() => setQuizAnswers(old => ({ ...old, [index]: optionIndex }))} /><span>{option}</span></label>)}</div>{quizSubmitted && <p className="quiz-explanation"><CheckCircle size={16} /> {item.explanation}</p>}</div>)}
                  {!quizSubmitted ? <button className="primary-button" onClick={submitQuiz}>Submit answers <ArrowRight size={17} /></button> : <div id="quiz-result" className="quiz-result"><Sparkles size={25} /><h2>Your score: {quizQuestions.filter((item, index) => quizAnswers[index] === item.answer).length} / {quizQuestions.length}</h2><p>Review the explanations above, then try again to practise.</p><button className="secondary-button" onClick={resetQuiz}><RotateCcw size={16} /> Try again</button></div>}
                </div>
              </>
            )}

            {page === 'roadmap' && (
              <>
                <div className="section-heading">
                  <span className="section-kicker">A PRACTICAL PLAN FOR YOUR NEXT STEP</span>
                  <h1>Career <span className="gradient-text">Roadmap</span></h1>
                  <p>Use this flexible six-week starting plan. Adjust the timing to fit your current skills and schedule.</p>
                </div>
                <div className="tool-panel">
                  <div className="roadmap-progress"><div><strong>Your preparation checklist</strong><span>{roadmapDone.length} of {roadmap.reduce((sum, stage) => sum + stage.tasks.length, 0)} tasks complete</span></div><div className="metric-track"><div style={{ width: `${roadmapDone.length / roadmap.reduce((sum, stage) => sum + stage.tasks.length, 0) * 100}%` }} /></div></div>
                  <div className="roadmap-list">{roadmap.map((stage, index) => <article className="roadmap-stage" key={stage.title}><div className="roadmap-marker">{index + 1}</div><div className="roadmap-content"><span className="section-kicker">{stage.time}</span><h2>{stage.title}</h2><p>{stage.description}</p><div className="roadmap-tasks">{stage.tasks.map(task => <label key={task}><input type="checkbox" checked={roadmapDone.includes(task)} onChange={event => setRoadmapDone(old => event.target.checked ? [...old, task] : old.filter(item => item !== task))} /><span>{task}</span></label>)}</div></div></article>)}</div>
                  <button className="secondary-button" onClick={() => setRoadmapDone([])}><RotateCcw size={16} /> Reset checklist</button>
                </div>
              </>
            )}
          </section>
        )}
      </main>

      <footer id="about">
        <button className="brand" onClick={() => navigate('home')}><span className="brand-icon"><Sparkles size={20} /></span>Resume<span className="brand-ai">AI</span></button>
        <p>Built to help you take the next step in your career.</p>
        <span>ResumeAI © 2026 · Student project demo</span>
        <p className="small-note">This demo uses local keyword rules and preset learning content. It does not provide a validated ATS score or live AI-generated assessment.</p>
      </footer>
    </div>
  )
}

export default App