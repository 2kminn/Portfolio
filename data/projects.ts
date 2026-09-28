export type Project = {
  slug: string;
  title: string;
  period: string;
  summary: string;
  role: string;
  technologies: string[];
  challenge: string;
  solution: string;
  result: string;
};

// Explicit draft content until real project details are provided.
export const projects: Project[] = [
  {
    slug: "project-01",
    title: "[Project 01 name]",
    period: "[Project dates]",
    summary: "Describe the problem this project solves and its main feature in one or two sentences.",
    role: "[Your role]",
    technologies: ["[Technologies]"],
    challenge: "Describe the user problem or technical challenge that started this project.",
    solution: "Explain the design decisions and implementation you used to solve it.",
    result: "Add measurable outcomes, user feedback, or what you learned.",
  },
  {
    slug: "project-02",
    title: "[Project 02 name]",
    period: "[Project dates]",
    summary: "Summarize the project's purpose and the part you built.",
    role: "[Your role]",
    technologies: ["[Technologies]"],
    challenge: "Explain the context and the problem you set out to solve.",
    solution: "Describe the important technical choices you made.",
    result: "Add launch results, improvements, or lessons learned.",
  },
];

export function getProject(slug: string) { return projects.find((project) => project.slug === slug); }
