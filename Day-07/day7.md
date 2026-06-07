# Day 7 – Claude Model Selection & Reasoning Effort

## Objective

The goal of this exercise was to understand how Claude's different models and reasoning effort levels affect output quality, speed, and overall productivity.

Instead of focusing only on prompt engineering, this exercise emphasized choosing the right model and effort level based on the complexity of the task.

---

## What I Learned

Claude provides multiple models optimized for different workloads:

### Haiku

Best suited for:

* Quick lookups
* Summaries
* Rewriting content
* Lightweight tasks
* Fast responses

### Sonnet

Best suited for:

* Coding
* Debugging
* Code reviews
* Learning
* Everyday AI workflows

### Opus

Best suited for:

* Deep research
* System architecture
* Complex planning
* Multi-step reasoning
* Strategic decision making

---

## Understanding Reasoning Effort

Claude allows different reasoning effort levels.

### Low

* Fast responses
* Quick lookups
* Lightweight tasks

### Standard

* Daily coding
* Learning concepts
* General productivity

### High

* Debugging
* Code reviews
* Complex implementations

### Max

* Architecture design
* Deep research
* Long-term planning

---

## My Personalized Claude Strategy

### Primary Model

**Claude Sonnet 4.6**

Reason:

It offers the best balance between intelligence, speed, coding ability, and reasoning quality.

For most software development tasks, Sonnet provides reliable results without requiring the additional cost and latency of Opus.

---

## My Recommended Workflow

| Task                     | Model  | Effort   |
| ------------------------ | ------ | -------- |
| Quick Syntax Lookup      | Haiku  | Low      |
| Writing Functions        | Sonnet | Standard |
| Debugging                | Sonnet | High     |
| Code Reviews             | Sonnet | High     |
| System Design            | Opus   | High     |
| Large Refactoring        | Opus   | High     |
| Performance Optimization | Opus   | Max      |

---

## Key Debugging Framework

When debugging, provide:

1. Tech Stack
2. Expected Output
3. Actual Output
4. Relevant Code
5. What Was Already Tried
6. Desired Outcome

This structure helps Claude identify root causes more accurately and reduces unnecessary back-and-forth.

---

## Additional Best Practices

* Start a fresh chat for each bug.
* Share relevant context upfront.
* Paste the exact error message.
* Explain expected vs actual behavior.
* Use Claude as a code review partner.
* Test generated code before shipping.

---

## Biggest Takeaway

The best AI workflow is not about always using the most powerful model.

The best results come from selecting the right model and reasoning effort level for the task.

For my current workflow as a developer, **Claude Sonnet 4.6 with Standard Effort** is the optimal default choice for most coding and learning tasks.

---

## Screenshots

Screenshots of the generated strategy and debugging templates are included in the `./` directory.

---

## Resources

* Claude Model Selection Guide
* Anthropic Documentation
* Claude Usage Strategy Exercise

---

## Completion Status

✅ Resources Reviewed

✅ Claude Strategy Generated

✅ Workflow Documented

✅ Debugging Templates Collected

✅ Screenshots Added

✅ Changes Committed & Pushed
