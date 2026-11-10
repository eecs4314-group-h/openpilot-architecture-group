# Assignment 2 audit and corrected work division

Audit date: November 9, 2026. Course: EECS 4314, Group H. Target: OpenPilot v0.11.1 (confirmed by Setayesh). No OpenPilot source files, searches, checkout metadata or earlier code-derived findings were used in this audit.

## A. Authority and errors discovered

Primary source: the complete **EECS4314_Project_Description.pdf** in the user's Downloads (SHA-256 `9ff0c5d276c6a0f04362f5ed88690c4f5b4634d4590d089d8e0d353a7c4eb075`). Its duplicate `(1)` has the same hash. Read Sections 1–7 and Appendices A–C. Section 6, page 4 is the Assignment 2 authority; Section 3, page 2 and Appendices A/B, pages 6–8 supplement it. The supplied Section 6 and Appendix B screenshots agree with the visible corresponding pages. No separate A2 rubric or additional professor/TA guidance was located. CampusBrain's *EECS 4314-5-ReverseEngineering*, page 28 supports tracing the low-level causes of subsystem dependencies; it does not make comparison an A2 requirement.

1. **Wrong assignment:** Dan's presentation/report tasks, overview, homepage, outline and handoff language assigned conceptual/concrete comparison, convergences/divergences/absences and discrepancy rationales. Section 2 (page 1) and Section 7 (page 5) explicitly reserve those for Assignment 3. Removed them from every active A2 task. No reassignment to another member.
2. **Missing submission artifact:** Section 6 requires the Understand project file showing the grouping. Spence now produces it, Setayesh submits it and Dan checks it.
3. **Missing report conventions:** made title/authors, abstract, introduction, single-spaced 12-point text and the 15-page cap including diagrams/appendices explicit. Setayesh owns integration; Dan reviews. Explicitly planned glossary/naming conventions and external-interface/control-flow coverage from Appendix A's content considerations.
4. **Missing AI-use check:** Section 6 refers to the A1 AI guidelines. Added conditional acknowledgement, human-first extraction attempt, evaluation and lessons, and the prohibition on AI-written report prose. This document is a task audit, not report prose. No technical findings were written here.
5. **Unsupported rules:** three-or-more diagrams, exactly ten slides and 12 minutes were described too strongly. They are team choices, not stated course minima. Appendix B gives 15 minutes including setup and recommends rehearsal, questions, modelling alternatives, trade-offs and feedback.
6. **Unmarked code work:** extraction, mapping, dependency analysis, behaviour and pattern conclusions were phrased as immediately executable. Code-dependent tasks now carry **Pending source-code analysis — not yet verified.** Nothing is marked technically verified or completed.
7. **Duplicate effort:** report and presentation packages could imply separate extraction and redrawing. Each technical owner now maintains one shared evidence/diagram package, reused in both deliverables. Dan reviews, Setayesh integrates; this is deliberate peer review rather than duplicated authorship.
8. **Scope/version overclaims:** v0.11.1 was called a “course snapshot” without evidence of a professor mandate. It is now a user-confirmed target. Controls / `selfdrive/controls` remains an unconfirmed candidate, not a proven concrete boundary or accepted claim. No commit hash was inferred or checked.
9. **Unverified schedule:** the prior site recorded slides November 12 at 5:30 PM, talk at 6:54 PM and report November 15 at 11:59 PM. The full project brief does not supply those dates. eClass redirects to Passport York login during this audit. Dates remain visible as previously recorded, with explicit recheck notices; PDF-only format also needs confirmation.
10. **Two-slide scope:** retained the existing two slides, layout, conceptual hypothesis and pre-analysis caveat. Made only scope wording changes: the opening objective now concerns concrete recovery; question 4 asks about limitations rather than A1/A2 comparison. No source-based finding was added. The previous files remain intact.

The extracted PDF text also contains a repeated-word instruction that does not appear on the visible page. It was not promoted to an assignment requirement. Visible course content and the supplied screenshots govern this audit; confirm any disagreement with the instructor.

## B. Corrected presentation distribution

Slide counts and speaking targets below are the team's working allocation.

| Member | Slides | What to produce | Dependencies |
|---|---|---|---|
| Setayesh Chegini | 1–2, 1:30 | Retained pre-analysis title/objective and proposed scope/questions. Confirm forum claim; coordinate final deck, online slides, rehearsal, attendance and submission. | Group scope decision, all technical packages and Dan's review. |
| Spence Hashemi | 3–4, 2:00 | Understand recovery/grouping explanation and redrawn top-level map with legend. | Explicit source authorization and agreed target/scope. |
| Mehdi Jafarian | 5–6, 2:10 | Focused structure/interfaces and subsystem/module dependency diagram with evidence for significant relations. | Spence's mapping and accepted subsystem. |
| David Odidi | 7–8, 2:10 | Noteworthy sequence OR state view, architectural styles and noteworthy patterns. | Spence's map and Mehdi's static boundary. |
| Dan | 9–10, 2:10 | Modelling alternatives, supported trade-offs, limitations, actual lessons and conclusion. Consolidate references; independently review readability, sources and coverage; prepare questions/feedback. | Evidence owners' findings and documented modelling choices. |

The proposed 12-minute rehearsal includes 30 seconds setup, 10 minutes total speaking, 1 minute Q&A and 30 seconds buffer. The official Appendix B slot is 15 minutes including setup. Recheck the class schedule.

## C. Corrected report distribution

| Member | Ownership and concrete outputs | Target pages |
|---|---|---|
| Setayesh | Title/authors; abstract about 2/3 page; introduction 1–3 pages; scope, glossary/naming conventions; integrate human-authored sections, publish web report and links, submit report and Understand artifact. | 2.5 |
| Spence | Understand environment, extraction/grouping method, top-level entity mapping, system structure diagram and saved Understand project showing groupings. | 2 |
| Mehdi | Selected subsystem hierarchy/responsibilities, external interfaces and information, dependencies with concrete causes, subsystem/module dependency diagram and evidence matrix. | 2.5 |
| David | Essential scenario, sequence OR state view, control flow/concurrency, styles and noteworthy patterns; significant performance/evolution implications only where supported. | 2 |
| Dan | Modelling alternatives and supported trade-offs, limitations/challenges, actual lessons, human-authored conclusion and linked references; independent full requirements/citation review. Conditional AI-use audit. | 1.5 plus references/review |

Reserve about 1.5 pages for title/author material, references, glossary and any conditional AI-use record. Target about 12 total; diagrams fit within section budgets. Adjust to 10–15 pages, never exceeding 15 including diagrams and appendices. These targets are not grading requirements. Technical owners write their own sections; Dan checks them and Setayesh integrates them.

## D. Verified requirements coverage

The complete requirement-to-member/report/slide/status matrix is published in [Requirements and Ownership](../assignment-2-requirements.html), backed by [the machine-readable plan](../data/assignment-2-plan.json).

| Verified requirement | Owner | Report deliverable | Presentation deliverable | Current status |
|---|---|---|---|---|
| Section 6: 10–15 page concrete report; Section 3: 15-page maximum including diagrams/appendices, one group submission | Setayesh; Dan checks | Integrated report and actual receipt | Objective on slide 1 | Pending human-authored report |
| Section 6: online web-readable report and related links | Setayesh; Dan checks | Published report/artifact index | Online slide link | Pending final publication |
| Section 6: Understand extraction, top-level grouping and grouping-process explanation | Spence | Method, mapping and system map | 3–4 | Pending source-code analysis — not yet verified |
| Section 6: distinct, forum-claimed top-level subsystem | Setayesh, with later boundary validation by Mehdi | Accepted claim and focused scope | 2 | Acceptance not verified |
| Section 6: styles and noteworthy patterns | David | Styles/patterns section | 8 | Pending source-code analysis — not yet verified |
| Section 6 and Appendix A: redrawn concrete diagrams, readable legends and module dependency view | Spence and Mehdi | System/focused dependency figures | 4–6 | Pending source-code analysis — not yet verified |
| Section 6: noteworthy behaviour using sequence or state view | David | Scenario/behaviour view | 7 | Pending source-code analysis — not yet verified |
| Section 6: Understand project file showing grouping | Spence produces; Setayesh submits; Dan checks | Saved project artifact | Method references artifact | Pending source-code analysis — not yet verified |
| Appendix A: report format, title/authors, abstract and introduction | Setayesh; Dan checks | Formatted opening sections | 1–2 | Pre-analysis opening exists; report pending |
| Appendix A: noteworthy lessons, conclusion and linked references | Dan; owners contribute lessons | Closing section/references | 10 and reference slides | Pending actual findings |
| Appendix B: class presentation, online slides, 15-minute slot including setup, member participation | Setayesh/all | Artifact index | Final deck/attendance | Pending final deck |
| Section 6 explicitly referencing A1: conditional AI-use guidelines; no AI-written report prose | Each owner; Dan checks; Setayesh integrates | Method/disclosure if applicable, human-authored report | Method disclosure if relevant | Conditional on future use |

Appendix A's architecture/interface/use-case/glossary items guide content; Appendix B's numbered points are presentation recommendations. Both have owners above. No numerical “at least two use cases” from A1, discrepancy analysis from A3, or general course goal is added as an A2 requirement.

## E. Files and synchronization

- `index.html`: corrected A2 scope, source hold and coverage navigation; retained A1 cards.
- `assignment-2.html`: synchronized master work split, handoffs, timing labels, claim/source gates and checklist.
- `assignment-2-presentation.html`: all five dedicated workspaces, slide outputs, handoffs, definitions of done and scope notices.
- `assignment-2-report.html`: all five dedicated workspaces, coherent outline/page budgets, required artifacts and review responsibilities.
- `assignment-2-requirements.html`: complete verified-requirements coverage and classification of recommendations/team choices/unknowns.
- `data/assignment-2-presentation.json` and `data/assignment-2-report.json`: all 50 member steps reviewed; stable IDs/statuses retained, code-dependent evidence labels added, no artificial completion.
- `data/assignment-2-plan.json`: shared ownership/coverage record.
- `js/assignment-dashboard.js`: displays analysis status when a task supplies it; A1 tasks without it behave as before.
- `documents/setayesh-assignment2-preanalysis.pdf` and `.pptx`: the preserved two-slide design with only A2 scope wording corrected.
- `README.md` and this audit: current authority, constraints and navigation.

The Supabase configuration remains empty. Shared progress saving is not active; committed JSON remains the task catalog. The audit does not alter credentials, cloud data, Assignment 1 materials, or actual completion statuses.

## F. Remaining work and publication status

Source inspection remains prohibited until Setayesh explicitly authorizes it. All extraction, confirmed grouping, concrete diagrams, dependency/behaviour/style/pattern conclusions, source revision validation and Understand-project generation remain pending. Review and planning may proceed using the brief and authorized documentation. Do not reuse earlier source-based drafts.

Also pending: forum acceptance and top-level-boundary suitability, eClass deadline/format confirmation, final team-authored sections and slides, actual lessons and any AI-use disclosure, rehearsals, peer review, online deliverables and submission receipts. The pre-analysis slides are an opening package, not a completed concrete-architecture presentation.

Repository: `eecs4314-group-h/openpilot-architecture-group`, branch `main`. Existing local version-correction commit `2960d05` is preserved. The final delivery report records the audit commit, push result and actual deployment result; local preparation alone does not mean the live site changed.
