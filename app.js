const ARTICLES = [
  {
    id: 'cpp-interview-questions',
    title: 'C++ Interview Questions and Answers (2025)',
    url: 'https://www.geeksforgeeks.org/cpp-interview-questions/',
    summary:
      'A broad collection of beginner-to-advanced C++ interview questions covering language basics, OOP, memory management, and STL.',
    keyPoints: [
      'Difference between C and C++ with focus on OOP and abstraction.',
      'Stack vs heap memory and constructor/destructor role in object lifetime.',
      'Concepts like polymorphism, virtual functions, and inheritance are common interview topics.'
    ],
    quiz: [
      {
        question: 'Which C++ feature primarily enables runtime polymorphism?',
        options: ['Templates', 'Virtual functions', 'Macros', 'Namespaces'],
        answer: 1
      },
      {
        question: 'Which memory region usually stores local variables in a function?',
        options: ['Heap', 'Register only', 'Stack', 'Code segment'],
        answer: 2
      }
    ]
  },
  {
    id: 'oops-in-cpp',
    title: 'Object Oriented Programming in C++',
    url: 'https://www.geeksforgeeks.org/object-oriented-programming-in-cpp/',
    summary:
      'Explains core OOP principles in C++: encapsulation, abstraction, inheritance, and polymorphism with examples.',
    keyPoints: [
      'Encapsulation bundles data and methods together in classes.',
      'Inheritance allows code reuse and hierarchy modeling.',
      'Polymorphism lets one interface represent many behaviors.'
    ],
    quiz: [
      {
        question: 'Which OOP principle hides internal implementation details?',
        options: ['Inheritance', 'Abstraction', 'Composition', 'Overloading'],
        answer: 1
      },
      {
        question: 'What is a direct benefit of inheritance?',
        options: ['Automatic memory deallocation', 'Code reusability', 'Faster compilation always', 'Eliminates constructors'],
        answer: 1
      }
    ]
  },
  {
    id: 'stl-in-cpp',
    title: 'The C++ Standard Template Library (STL)',
    url: 'https://www.geeksforgeeks.org/the-c-standard-template-library-stl/',
    summary:
      'Introduces STL containers, iterators, algorithms, and function objects used heavily in coding interviews.',
    keyPoints: [
      'Containers include vector, list, deque, set, map, and unordered variants.',
      'Algorithms like sort, find, and binary_search operate through iterators.',
      'STL reduces boilerplate and encourages generic programming.'
    ],
    quiz: [
      {
        question: 'Which STL component is used to traverse containers?',
        options: ['Allocator', 'Iterator', 'Comparator', 'Adaptor'],
        answer: 1
      },
      {
        question: 'Which container offers average O(1) key lookup?',
        options: ['std::map', 'std::vector', 'std::unordered_map', 'std::list'],
        answer: 2
      }
    ]
  },
  {
    id: 'virtual-function',
    title: 'Virtual Function in C++',
    url: 'https://www.geeksforgeeks.org/virtual-function-cpp/',
    summary:
      'Describes how virtual functions support runtime polymorphism and dynamic dispatch in class hierarchies.',
    keyPoints: [
      'Declaring a function virtual in a base class enables override dispatch via base pointers/references.',
      'Essential for polymorphic behavior in inheritance chains.',
      'Often discussed together with abstract classes and pure virtual functions.'
    ],
    quiz: [
      {
        question: 'When is a pure virtual function used?',
        options: [
          'To make a class abstract',
          'To inline a function',
          'To create friend functions',
          'To disable overriding'
        ],
        answer: 0
      },
      {
        question: 'What keyword marks a method for dynamic dispatch in base classes?',
        options: ['dynamic', 'virtual', 'override-only', 'mutable'],
        answer: 1
      }
    ]
  },
  {
    id: 'constructors-cpp',
    title: 'Constructors in C++',
    url: 'https://www.geeksforgeeks.org/constructors-c/',
    summary:
      'Covers default, parameterized, and copy constructors and how object initialization works in C++.',
    keyPoints: [
      'Constructors initialize object state at creation time.',
      'Copy constructors define behavior when objects are copied.',
      'Constructors have no return type and share class name.'
    ],
    quiz: [
      {
        question: 'Which constructor is called when creating an object with no arguments?',
        options: ['Copy constructor', 'Default constructor', 'Move constructor', 'Destructor'],
        answer: 1
      },
      {
        question: 'What is true for constructors in C++?',
        options: [
          'They can return bool',
          'They must be static',
          'They have no return type',
          'Only one constructor can exist per class'
        ],
        answer: 2
      }
    ]
  }
];

const STORAGE_KEY = 'gfg_cpp_prep_progress_v1';

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { read: {}, quizScore: {} };
  } catch {
    return { read: {}, quizScore: {} };
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

let progressState = loadProgress();

function renderArticles() {
  const root = document.getElementById('article-list');
  const template = document.getElementById('article-template');
  root.innerHTML = '';

  ARTICLES.forEach((article) => {
    const node = template.content.cloneNode(true);
    node.querySelector('.article-title').textContent = article.title;
    node.querySelector('.article-summary').textContent = article.summary;

    const points = node.querySelector('.article-points');
    article.keyPoints.forEach((point) => {
      const li = document.createElement('li');
      li.textContent = point;
      points.appendChild(li);
    });

    const link = node.querySelector('.article-link');
    link.href = article.url;

    const btn = node.querySelector('.mark-read');
    const wasRead = Boolean(progressState.read[article.id]);
    btn.textContent = wasRead ? 'Completed' : 'Mark as Read';
    btn.classList.toggle('secondary', wasRead);
    btn.addEventListener('click', () => {
      progressState.read[article.id] = true;
      saveProgress(progressState);
      renderArticles();
      renderProgress();
    });

    root.appendChild(node);
  });
}

function renderQuizControls() {
  const controls = document.getElementById('quiz-controls');
  controls.innerHTML = '';

  ARTICLES.forEach((article) => {
    const button = document.createElement('button');
    button.textContent = `Start: ${article.title}`;
    button.addEventListener('click', () => runQuiz(article));
    controls.appendChild(button);
  });
}

function runQuiz(article) {
  const area = document.getElementById('quiz-area');
  area.innerHTML = '';

  let score = 0;

  article.quiz.forEach((q, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'quiz-question';

    const question = document.createElement('p');
    question.innerHTML = `<strong>Q${index + 1}:</strong> ${q.question}`;
    wrapper.appendChild(question);

    const options = document.createElement('div');
    options.className = 'options';

    q.options.forEach((opt, optIndex) => {
      const optionBtn = document.createElement('button');
      optionBtn.className = 'option';
      optionBtn.textContent = opt;
      optionBtn.addEventListener('click', () => {
        const siblings = options.querySelectorAll('button');
        siblings.forEach((s) => (s.disabled = true));

        if (optIndex === q.answer) {
          optionBtn.classList.add('correct');
          score += 1;
        } else {
          optionBtn.classList.add('incorrect');
          siblings[q.answer].classList.add('correct');
        }
      });
      options.appendChild(optionBtn);
    });

    wrapper.appendChild(options);
    area.appendChild(wrapper);
  });

  const finish = document.createElement('button');
  finish.textContent = 'Finish Quiz';
  finish.addEventListener('click', () => {
    const total = article.quiz.length;
    progressState.quizScore[article.id] = { score, total };
    saveProgress(progressState);
    renderProgress();

    const result = document.createElement('p');
    result.innerHTML = `<strong>Your score for "${article.title}": ${score}/${total}</strong>`;
    area.appendChild(result);
    finish.disabled = true;
  });

  area.appendChild(finish);
}

function renderProgress() {
  const readCount = Object.keys(progressState.read).length;
  const quizCount = Object.keys(progressState.quizScore).length;

  const totalItems = ARTICLES.length * 2;
  let completed = 0;
  completed += readCount;

  Object.values(progressState.quizScore).forEach(({ score, total }) => {
    completed += score / total;
  });

  const percentage = Math.round((completed / totalItems) * 100);

  const progressEl = document.getElementById('overall-progress');
  const progressText = document.getElementById('overall-progress-text');
  progressEl.value = percentage;
  progressText.textContent = `${percentage}%`;

  const stats = document.getElementById('stats');
  stats.innerHTML = `
    Articles read: <strong>${readCount}/${ARTICLES.length}</strong><br />
    Quizzes attempted: <strong>${quizCount}/${ARTICLES.length}</strong>
  `;
}

function setupReset() {
  const reset = document.getElementById('reset-progress');
  reset.addEventListener('click', () => {
    progressState = { read: {}, quizScore: {} };
    saveProgress(progressState);
    renderArticles();
    renderProgress();
    document.getElementById('quiz-area').innerHTML = '';
  });
}

renderArticles();
renderQuizControls();
renderProgress();
setupReset();
