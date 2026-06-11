const questions = [
  {
    id: 1,
    category: "CI/CD Basics",
    question: "What does CI stand for in CI/CD?",
    options: ["Continuous Integration", "Code Inspection", "Continuous Infrastructure", "Code Injection"],
    answer: 0,
    explanation: "CI stands for Continuous Integration — the practice of merging developer code into a shared repo frequently, with automated builds and tests."
  },
  {
    id: 2,
    category: "CI/CD Basics",
    question: "What does CD stand for in a CI/CD pipeline?",
    options: ["Code Deployment", "Continuous Delivery / Continuous Deployment", "Container Docker", "Commit Driven"],
    answer: 1,
    explanation: "CD stands for Continuous Delivery (automated release to staging) or Continuous Deployment (automated release to production)."
  },
  {
    id: 3,
    category: "Tools",
    question: "Which of the following is a popular CI/CD tool used natively on GitHub?",
    options: ["Jenkins", "GitHub Actions", "CircleCI", "Travis CI"],
    answer: 1,
    explanation: "GitHub Actions is GitHub's built-in CI/CD platform that uses YAML workflow files stored in .github/workflows/."
  },
  {
    id: 4,
    category: "Pipeline Stages",
    question: "What is the correct order of a typical CI/CD pipeline?",
    options: [
      "Deploy → Test → Build → Code",
      "Code → Build → Test → Deploy",
      "Test → Code → Deploy → Build",
      "Build → Code → Test → Deploy"
    ],
    answer: 1,
    explanation: "A standard pipeline flows: Code (commit) → Build (compile/package) → Test (run tests) → Deploy (release to env)."
  },
  {
    id: 5,
    category: "Pipeline Stages",
    question: "What happens in the 'Build' stage of a CI pipeline?",
    options: [
      "Code is pushed to GitHub",
      "Unit tests are executed",
      "Source code is compiled/packaged into an artifact",
      "Application is deployed to production"
    ],
    answer: 2,
    explanation: "The Build stage compiles source code and packages it into a deployable artifact (e.g., a Docker image, JAR, or ZIP file)."
  },
  {
    id: 6,
    category: "Testing",
    question: "Which type of tests run FIRST in a typical CI pipeline?",
    options: ["End-to-End tests", "Performance tests", "Unit tests", "Integration tests"],
    answer: 2,
    explanation: "Unit tests run first because they're fastest and cheapest. The testing pyramid goes: Unit → Integration → E2E."
  },
  {
    id: 7,
    category: "Docker & Containers",
    question: "What is a Dockerfile?",
    options: [
      "A log file for deployments",
      "A script that defines how to build a Docker image",
      "A CI/CD configuration file",
      "A test runner configuration"
    ],
    answer: 1,
    explanation: "A Dockerfile is a text file with instructions to build a Docker image, defining the base OS, dependencies, and app startup command."
  },
  {
    id: 8,
    category: "Docker & Containers",
    question: "What command builds a Docker image from a Dockerfile?",
    options: ["docker run", "docker push", "docker build", "docker start"],
    answer: 2,
    explanation: "`docker build` reads a Dockerfile and creates a Docker image. Example: `docker build -t my-app:latest .`"
  },
  {
    id: 9,
    category: "GitHub Actions",
    question: "What file format is used to define GitHub Actions workflows?",
    options: ["JSON", "TOML", "YAML", "XML"],
    answer: 2,
    explanation: "GitHub Actions workflows are defined in YAML files placed in the `.github/workflows/` directory of your repository."
  },
  {
    id: 10,
    category: "GitHub Actions",
    question: "In GitHub Actions, what is a 'job'?",
    options: [
      "A single command in the pipeline",
      "A set of steps that run on the same runner",
      "A deployment environment",
      "A Docker container"
    ],
    answer: 1,
    explanation: "A job is a collection of steps that run on the same runner (virtual machine). Multiple jobs can run in parallel or sequentially."
  },
  {
    id: 11,
    category: "Deployment",
    question: "What is a 'Blue-Green Deployment'?",
    options: [
      "Deploying only to Linux servers",
      "Using two identical environments to switch traffic with zero downtime",
      "A branching strategy in Git",
      "A Docker networking mode"
    ],
    answer: 1,
    explanation: "Blue-Green Deployment maintains two production environments. Traffic switches from blue (live) to green (new version) instantly, enabling zero-downtime releases."
  },
  {
    id: 12,
    category: "Deployment",
    question: "What does 'rolling deployment' mean?",
    options: [
      "Deploying during off-hours only",
      "Gradually replacing old instances with new ones",
      "Deploying to a test server first",
      "Reverting to a previous version"
    ],
    answer: 1,
    explanation: "Rolling deployment gradually replaces old instances with new ones, keeping the app alive throughout. Some users hit the old version, some the new one during the rollout."
  },
  {
    id: 13,
    category: "Git & Branching",
    question: "What is a common CI/CD branching strategy that uses feature, develop, and main branches?",
    options: ["Trunk-Based Development", "GitFlow", "GitHub Flow", "Forking Workflow"],
    answer: 1,
    explanation: "GitFlow uses feature branches, a develop branch, release branches, and a main/master branch with hotfixes — popular for versioned software releases."
  },
  {
    id: 14,
    category: "Monitoring",
    question: "What should a CI/CD pipeline do when tests fail?",
    options: [
      "Continue and deploy anyway",
      "Send a notification and skip deployment",
      "Stop the pipeline and notify the team",
      "Rollback the last commit automatically"
    ],
    answer: 2,
    explanation: "When tests fail, the pipeline should halt immediately ('fail fast') and notify the team. This prevents broken code from being deployed."
  },
  {
    id: 15,
    category: "Security",
    question: "Where should secrets (API keys, passwords) be stored in a CI/CD pipeline?",
    options: [
      "Directly in the source code",
      "In the README file",
      "In environment variables or a secrets manager",
      "In a config.json file"
    ],
    answer: 2,
    explanation: "Secrets must never be hardcoded. Use environment variables, GitHub Secrets, AWS Secrets Manager, or HashiCorp Vault to store them securely."
  }
];

module.exports = questions;
