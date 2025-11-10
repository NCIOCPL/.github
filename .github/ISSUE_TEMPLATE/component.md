---
name: Component
about: This template defines a template for atomic component issues for the Design System.
title: "[Short Name]"
type: "Story"
---

### Build xxx component based on design specs/requirements documented in this ticket

> **ESTIMATE** TBD

## Design Definition of Done
*When all criteria below are met.*

### Baseline Discovery (add any additional info or links)
- [ ] Heuristics/Best Practices
- [ ] Analytics
*Related links:
- [ ] Accessibility
*Related links:

### Design
- [ ] Design component. Link to design ticket:
- [ ] Conduct Design QA
*Meet with design team to do visual QA for colors, fonts, spacing (padding/margin), etc.
- [ ] Get component approved by client

### USWDS Component Equivalent
*Is this a USWDS component?  If so - are there variants? If we are creating something new, provide links to what it is based off of in resources section*
* Related USWDS Links: *Here goes a URL to an existing web page*

### Styling: 
*Anatomy of a component*
- [ ] Use correct spacing (8px grid) size, emphasis, alignment

### Behaviors
*Summary of state changes and behaviors. AC's are more detailed.*

### Figma: 
  * Figma link: *insert link here, or enter N/A if not needed*

### Acceptance Criteria for Behaviors 
*If a component changes between breakpoints, or things show/hide, that gets captured here* 

```gherkin
Scenario: [title]
  Given [context]
    And [some more context]
  When  [event]
  Then  [outcome]
    And [another outcome]
```

---
### Scenarios
- *edge cases*

## Solution

### Prerequisites
- *required dependency for identifying the problem, scope and then solution for this issue*

- [ ] Short Spike Description - Issue #9999

### Tasks
- [ ] Update Documentation Site (docs)
  - [ ] Create or update [INSERT DOCUMENTATION PAGE OR SECTION ON PAGE HERE] that includes:
    - Developer Documentation
      -  What SASS partial to import
      - (HTML Tab) What is the HTML?
      - (HTML Tab) (for vanilla js) What is the js library to import?
      - (React Tab) What is the react library to import?
      - (React Tab) What is the react markup?
    - **IA Provided** Guidance Documentation  
      - Includes when/how the component should be used
  - [ ] If the component is a global component like the footer, then it needs to be added to the documentation site as well as a real usage.
- [ ] Update NCIDS-CSS
  - **Insert list here of partials to be created** (There should be a sass partial available for all variants that are being created in this ticket)
- [ ] Update NCIDS-JS
  - **Insert requirements/list of components for JS**
- [ ] Update NCIDS-React
  - [ ] **Insert requirements/list of components for react**
    - (it can also be a separate ticket, should be linked here)

## Do Not Forget to add the following as a comment to this ticket for this component
### NCIDS Guidance
- [ ] *When to use component and its variant(s)*
  * Example: Use a card when featuring content
- [ ] *When to consider something else*
  * Example Use a list when you have multiple pieces of content, and will display too many cards*
- [ ] *Usability Guidance*
  * Example: Don't have 1 button in CTA strip
