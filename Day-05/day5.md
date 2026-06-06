# Day 5 - Context Engineering

## Objective

The goal of this exercise was to understand how providing context influences the quality, relevance, and usefulness of AI-generated outputs.

---

## What is Context Engineering?

Context Engineering is the practice of providing AI with relevant background information, goals, constraints, preferences, and user-specific details before asking it to perform a task.

Instead of relying only on the prompt, we provide additional context so the AI can generate more accurate, personalized, and actionable responses.

---

## Experiment

### Prompt A - Without Context

I asked Claude to generate a 30-day learning roadmap using only a simple instruction.

#### Screenshots

![Week 1](/prompt-a-week1.jpg)

![Week 2](/prompt-a-week2.jpg)

![Week 3](/prompt-a-week3.jpg)

![Week 4](/prompt-a-week4.jpg)

![Outcome](/prompt-a-outcome.jpg)

---

### Prompt B - With Context

I provided additional information about:

* Current Situation
* Existing Skills
* Career Goal
* Available Time
* Experience Level
* Preferred Learning Style

#### Screenshot

![Week 1](/prompt-b-week1.png)

![Week 2](/prompt-b-week2.png)

![Week 3](/prompt-b-week3.png)

![Week 4](/prompt-b-week4.png)

![Outcome](/prompt-b-outcome.png)

---

## Comparison

| Aspect             | Prompt A (Without Context) | Prompt B (With Context)              |
| ------------------ | -------------------------- | ------------------------------------ |
| Personalization    | Generic roadmap            | Tailored to the user's background    |
| Goal Alignment     | Broad Python roadmap       | Focused on Full Stack AI Engineering |
| Skill Relevance    | Assumes a general learner  | Builds on existing MERN knowledge    |
| Practicality       | Useful but generic         | More actionable and realistic        |
| Resource Selection | General resources          | Context-aware recommendations        |
| Final Outcome      | Generic learning result    | Clear career-oriented outcome        |

---

## Observations

### Prompt A

* Generated a high-quality roadmap.
* Focused mainly on Python learning.
* Suitable for a broad audience.
* Did not consider personal goals or existing skills.

### Prompt B

* Produced a roadmap aligned with specific career goals.
* Leveraged existing MERN Stack experience.
* Included relevant AI engineering concepts.
* Generated a more practical and targeted learning path.

---

## Key Learnings

* Better context leads to better AI outputs.
* AI makes fewer assumptions when enough information is provided.
* Context improves personalization and relevance.
* Detailed background information produces more actionable recommendations.
* Context Engineering is a foundational concept behind modern AI assistants and agents.

---

## Reflection

The roadmap generated using Prompt B was significantly more useful because it was tailored to a specific goal, skill set, and learning preference.

This exercise demonstrated that the quality of AI output depends not only on the prompt itself but also on the context provided to the model.

### Which roadmap feels more personalized?

Prompt B.

### Which roadmap would I actually follow?

Prompt B.

### What role did context play?

Context helped the AI understand the user's situation, goals, and constraints, resulting in a roadmap that was more relevant, realistic, and actionable.

---

## Conclusion

Context Engineering is one of the most effective ways to improve AI-generated outputs. By providing relevant information before asking a question, we can transform generic responses into personalized solutions that better match our goals and requirements.
