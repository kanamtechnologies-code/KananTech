import type { LabTrackId } from "./tracks";

export type LessonSection = {
  heading: string;
  body: string; // plain text / simple markdown allowed (rendered as text with line breaks)
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
  explanation: string;
};

export type Checkpoint =
  | {
      type: "short_answer";
      prompt: string;
      expectedKeywords: string[]; // used for lightweight feedback only
      rubric: string[];
      exampleAnswer: string;
    }
  | {
      type: "single_select";
      prompt: string;
      options: { id: string; label: string }[];
      correctOptionId: string;
      explanation: string;
    };

export type ApplyIt = {
  prompt: string;
  exampleSolution: string;
};

export type LabLesson = {
  trackId: LabTrackId;
  slug: string;
  title: string;
  estimatedMinutes: number;
  sections: LessonSection[];
  quiz: QuizQuestion[];
  checkpoint: Checkpoint;
  applyIt: ApplyIt;
};

export const labLessonsByTrack: Record<LabTrackId, LabLesson[]> = {
  coding: [
    {
      trackId: "coding",
      slug: "python-basics-variables",
      title: "Python Basics: Variables and Types",
      estimatedMinutes: 18,
      sections: [
        {
          heading: "What you’re learning",
          body:
            "This lesson covers variables, common data types, basic input/output, and simple operations.\n\nIf you can read and write small snippets confidently, everything else gets easier.",
        },
        {
          heading: "Variables + types (the practical view)",
          body:
            "A variable is a name pointing to a value. Python figures out the type automatically.\n\nCommon types:\n- int (whole numbers)\n- float (decimals)\n- str (text)\n- bool (True/False)\n\nYou can check types with type(x).",
        },
        {
          heading: "Input/output and simple operations",
          body:
            "print() outputs text.\ninput() returns a string, even if you type a number.\n\nIf you need numeric math from input, convert:\n- int(\"42\") → 42\n- float(\"3.14\") → 3.14\n\nString + string concatenates. Number + number adds.",
        },
      ],
      quiz: [
        {
          id: "q1",
          prompt: "What is the type of the value returned by input() in Python?",
          options: [
            { id: "a", label: "int" },
            { id: "b", label: "str" },
            { id: "c", label: "float" },
            { id: "d", label: "bool" },
          ],
          correctOptionId: "b",
          explanation:
            "input() always returns a string. Convert it to int/float if you need numeric math.",
        },
        {
          id: "q2",
          prompt: "What does this output?\n\nx = \"5\"\ny = 2\nprint(x * y)",
          options: [
            { id: "a", label: "7" },
            { id: "b", label: "10" },
            { id: "c", label: "55" },
            { id: "d", label: "It throws an error" },
          ],
          correctOptionId: "c",
          explanation:
            "In Python, a string multiplied by an int repeats the string. \"5\" * 2 becomes \"55\".",
        },
      ],
      checkpoint: {
        type: "short_answer",
        prompt:
          "Write a small snippet (not executed) that asks for a user’s name and age, then prints a sentence like: “Tory is 27 years old.” Explain what would happen if you forget to convert age to an int.",
        expectedKeywords: ["input", "int", "print", "string"],
        rubric: [
          "Uses input() for name and age",
          "Converts age to int (or explains why conversion matters)",
          "Prints a combined output sentence",
          "Explanation mentions input() returns str",
        ],
        exampleAnswer:
          "name = input(\"Name: \")\nage = int(input(\"Age: \"))\nprint(f\"{name} is {age} years old.\")\n\nIf you don't convert, age is a string. Math like age + 1 would fail, and some outputs may behave like string concatenation instead of numeric addition.",
      },
      applyIt: {
        prompt:
          "Scenario: You’re building a tiny intake tool that asks for hours spent on a weekly task.\n\nWhat fields would you collect, and how would you prevent bad input (like \"two hours\") from breaking the script?",
        exampleSolution:
          "Collect: task_name (str), hours_per_week (number), owner/team (str).\n\nPrevent bad input:\n- Use a loop until conversion succeeds.\n- Try: hours = float(input(...)) inside try/except.\n- Show a clear error message and re-prompt.\n\nThis keeps your tool reliable when real people type unexpected values.",
      },
    },
    {
      trackId: "coding",
      slug: "python-control-flow",
      title: "Python Control Flow: if/else, loops, and lists",
      estimatedMinutes: 22,
      sections: [
        {
          heading: "Why control flow matters",
          body:
            "Control flow is how you make logic reliable: validate input, handle edge cases, and process collections of items.\n\nThis is where scripts stop being “one-off” and become reusable.",
        },
        {
          heading: "if/else and common patterns",
          body:
            "Use if/elif/else to branch based on conditions.\n\nCommon patterns:\n- Validate ranges (e.g., 1–5)\n- Check empty strings\n- Use early returns in functions",
        },
        {
          heading: "Loops and lists",
          body:
            "for loops iterate over items.\nwhile loops repeat until a condition changes.\n\nLists store ordered collections:\nitems = [\"a\", \"b\", \"c\"]\n\nYou can build lists with append() and iterate to compute totals or build output.",
        },
      ],
      quiz: [
        {
          id: "q1",
          prompt:
            "Which loop is best when you don’t know how many times you’ll need to ask for valid input?",
          options: [
            { id: "a", label: "for loop" },
            { id: "b", label: "while loop" },
            { id: "c", label: "No loop needed" },
            { id: "d", label: "try loop" },
          ],
          correctOptionId: "b",
          explanation:
            "A while loop is ideal for “keep asking until valid” patterns because the number of repeats depends on user behavior.",
        },
        {
          id: "q2",
          prompt: "What does this do?\n\nnums = [1, 2, 3]\nfor n in nums:\n  print(n * 2)",
          options: [
            { id: "a", label: "Prints 1, 2, 3" },
            { id: "b", label: "Prints 2, 4, 6" },
            { id: "c", label: "Prints 3, 6, 9" },
            { id: "d", label: "Throws an error" },
          ],
          correctOptionId: "b",
          explanation: "It iterates through each number and prints it doubled.",
        },
      ],
      checkpoint: {
        type: "single_select",
        prompt:
          "You want to ensure a user enters a number from 1 to 5. Which condition is correct?",
        options: [
          { id: "a", label: "if x > 1 and x < 5:" },
          { id: "b", label: "if x >= 1 and x <= 5:" },
          { id: "c", label: "if x == 1 and x == 5:" },
          { id: "d", label: "if x != 1 or x != 5:" },
        ],
        correctOptionId: "b",
        explanation:
          "Use >= and <= to include both endpoints. Option (a) excludes 1 and 5.",
      },
      applyIt: {
        prompt:
          "Scenario: You’re validating an intake form. You need to require:\n- a non-empty name\n- a priority of Low/Normal/High\n\nDescribe the control-flow approach you’d use, including how you’d handle invalid values.",
        exampleSolution:
          "Approach:\n- Read inputs.\n- Normalize casing/whitespace.\n- Validate each field.\n- If invalid, show a specific message and re-prompt.\n\nExample logic:\n- while not name.strip(): ask again\n- priority = priority.strip().lower(); ensure it’s one of {low, normal, high}\n\nThis avoids “silent bad data” and makes the workflow predictable.",
      },
    },
    {
      trackId: "coding",
      slug: "ai-tools-for-devs",
      title: "AI Tools for Developers: prompting + verification",
      estimatedMinutes: 20,
      sections: [
        {
          heading: "What AI tools are good at (and what they’re not)",
          body:
            "AI tools can help draft, summarize, and generate starting points.\n\nThey can also be confidently wrong. The skill is: ask clearly, verify output, and use AI to reduce busywork—not to outsource judgment.",
        },
        {
          heading: "Prompting basics",
          body:
            "A good prompt includes:\n- Context (what you’re building)\n- The goal (what you need)\n- Constraints (format, tone, length)\n- Examples (if you have them)\n\nThe more specific your constraints, the less time you waste correcting the output.",
        },
        {
          heading: "Verification checklist",
          body:
            "When using AI for technical work:\n- Confirm assumptions (inputs, outputs, edge cases)\n- Validate against docs or a known source\n- Test with a couple examples\n- Keep sensitive data out of prompts\n\nUse AI to accelerate, then apply real review.",
        },
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Which prompt is best for getting reliable output?",
          options: [
            { id: "a", label: "Make me some code for a website." },
            {
              id: "b",
              label:
                "Write a Next.js contact form with Tailwind and show me the full code. Make it look nice.",
            },
            {
              id: "c",
              label:
                "Given a Next.js App Router site, create a contact form that POSTs to /api/contact. Requirements: accessible labels, validation, light theme, emerald CTA, and return only the TSX for the form component.",
            },
            { id: "d", label: "Help." },
          ],
          correctOptionId: "c",
          explanation:
            "Option (c) provides context, specific requirements, and output constraints—leading to fewer revisions and better reliability.",
        },
        {
          id: "q2",
          prompt: "What’s the safest stance toward AI-generated technical output?",
          options: [
            { id: "a", label: "Treat it as correct if it looks confident." },
            { id: "b", label: "Treat it as a draft; verify and test." },
            { id: "c", label: "Never use it for technical work." },
            { id: "d", label: "Use it without review to move faster." },
          ],
          correctOptionId: "b",
          explanation:
            "The practical approach is to use AI as a draft generator, then verify against real requirements and test cases.",
        },
      ],
      checkpoint: {
        type: "short_answer",
        prompt:
          "Write a “good prompt” to help an AI tool generate a short weekly status update from bullet notes. Include output format constraints and a reminder about not inventing data.",
        expectedKeywords: ["context", "format", "bullets", "do not", "invent"],
        rubric: [
          "Includes input context (bullet notes)",
          "Specifies output format (e.g., 5 bullets + risks + next steps)",
          "Adds constraints (tone, length, audience)",
          "Explicitly says not to invent missing facts",
        ],
        exampleAnswer:
          "Prompt: \"You are helping me write a weekly project status update for directors. Input: bullet notes below. Output: 5 concise bullets (progress), 1–2 risks, and next steps. Keep it factual; do not invent metrics or deadlines. If info is missing, ask a clarifying question. Notes: ...\"",
      },
      applyIt: {
        prompt:
          "Scenario: You have a messy prompt:\n\n“Make this better and more professional.”\n\nRewrite it into a clear prompt that would produce a usable deliverable for a director audience.",
        exampleSolution:
          "Rewritten prompt:\n\"Rewrite the following message for a director audience. Goal: align stakeholders quickly. Constraints: 120–180 words, direct tone, include: current status, what changed this week, blockers/risks, and the next decision needed. Do not add facts not present. Text: ...\"",
      },
    },
  ],
  data: [
    {
      trackId: "data",
      slug: "excel-foundations",
      title: "Excel Foundations: tables, filters, and core formulas",
      estimatedMinutes: 20,
      sections: [
        {
          heading: "What you’re learning",
          body:
            "This lesson focuses on the Excel skills that reduce manual reporting: tables, sorting/filtering, and core formulas (SUM, AVERAGE, IF).\n\nThese are the building blocks for consistent reporting.",
        },
        {
          heading: "Tables + filtering (the reliability advantage)",
          body:
            "Excel Tables make ranges dynamic. When you add rows, formulas and formatting extend automatically.\n\nFiltering/sorting is safer when you’re operating on a structured table instead of random ranges.",
        },
        {
          heading: "Core formulas",
          body:
            "Common formulas:\n- SUM(range)\n- AVERAGE(range)\n- IF(condition, value_if_true, value_if_false)\n\nThe key habit: validate the range and confirm references before trusting a result.",
        },
      ],
      quiz: [
        {
          id: "q1",
          prompt: "What’s a practical benefit of converting a range into an Excel Table?",
          options: [
            { id: "a", label: "It prevents anyone from editing cells." },
            { id: "b", label: "Formulas and formatting expand as you add rows." },
            { id: "c", label: "It automatically creates a Power BI dashboard." },
            { id: "d", label: "It turns every value into text." },
          ],
          correctOptionId: "b",
          explanation:
            "Tables are dynamic: as you add rows, formulas and formatting typically extend automatically, which reduces broken reports.",
        },
        {
          id: "q2",
          prompt: "Which formula calculates the average of cells A2 through A11?",
          options: [
            { id: "a", label: "=AVG(A2:A11)" },
            { id: "b", label: "=AVERAGE(A2:A11)" },
            { id: "c", label: "=MEAN(A2:A11)" },
            { id: "d", label: "=SUM(A2:A11)/11" },
          ],
          correctOptionId: "b",
          explanation:
            "AVERAGE is the correct Excel function. (d) could work in some cases, but it’s brittle if your range changes.",
        },
      ],
      checkpoint: {
        type: "single_select",
        prompt:
          "Your IF formula is broken: =IF(A2>100,\"Over\",Under)\n\nWhich fix is correct?",
        options: [
          { id: "a", label: "=IF(A2>100,\"Over\",\"Under\")" },
          { id: "b", label: "=IF(A2>100,Over,Under)" },
          { id: "c", label: "=IF(A2>100,\"Over\",UNDER)" },
          { id: "d", label: "=IF(A2>100,\"Over\" \"Under\")" },
        ],
        correctOptionId: "a",
        explanation:
          "Text outputs must be in quotes. You need \"Under\" instead of Under.",
      },
      applyIt: {
        prompt:
          "Scenario: You’re building a weekly report.\n\nWhat table columns would you include to track work items, and which 2–3 formulas would you use to summarize progress?",
        exampleSolution:
          "Columns: Work Item, Owner, Status, Due Date, Priority, Estimated Hours, Actual Hours.\n\nFormulas:\n- COUNTIF(StatusRange,\"Done\") for completed count\n- COUNTIF(StatusRange,\"In Progress\") for active count\n- IF(DueDate<TODAY(),\"Overdue\",\"On Track\") for simple flags\n\nThis gives quick visibility without overengineering.",
      },
    },
    {
      trackId: "data",
      slug: "excel-cert-style-practice",
      title: "Excel Cert-Style Practice: references, lookups, pivots (concepts)",
      estimatedMinutes: 22,
      sections: [
        {
          heading: "Cert-style practice (not official materials)",
          body:
            "These questions are “cert-style practice”: realistic scenarios meant to test understanding.\n\nWe focus on reliability patterns that matter in real work: correct references and avoiding broken formulas.",
        },
        {
          heading: "Relative vs absolute references",
          body:
            "Relative references change when you copy a formula.\nAbsolute references lock a row/column using $.\n\nExamples:\n- A2 (relative)\n- $A$2 (absolute)\n- A$2 (row locked)\n- $A2 (column locked)",
        },
        {
          heading: "Lookup basics + pivot concept",
          body:
            "Lookups help you map an ID to a value (e.g., employee ID → department).\n\nPivot tables summarize data (grouping + totals) without manually creating new formulas for every category.",
        },
      ],
      quiz: [
        {
          id: "q1",
          prompt:
            "You copy a formula across columns, but you need the reference to always point to column A. Which reference is correct?",
          options: [
            { id: "a", label: "A2" },
            { id: "b", label: "$A2" },
            { id: "c", label: "A$2" },
            { id: "d", label: "$A$2" },
          ],
          correctOptionId: "b",
          explanation:
            "$A2 locks the column but allows the row to change when copying down.",
        },
        {
          id: "q2",
          prompt:
            "You need to summarize total hours by owner without writing multiple SUM formulas. What feature is best?",
          options: [
            { id: "a", label: "Conditional formatting" },
            { id: "b", label: "Data validation" },
            { id: "c", label: "Pivot table" },
            { id: "d", label: "Text to columns" },
          ],
          correctOptionId: "c",
          explanation:
            "Pivot tables group and total data quickly, which is ideal for summaries by category.",
        },
      ],
      checkpoint: {
        type: "short_answer",
        prompt:
          "In one paragraph: explain the difference between relative and absolute references, and give one real work scenario where absolute references prevent errors.",
        expectedKeywords: ["copy", "lock", "$", "relative", "absolute"],
        rubric: [
          "Defines relative references (change when copied)",
          "Defines absolute references (locked with $)",
          "Gives a practical scenario (e.g., tax rate cell or lookup table range)",
        ],
        exampleAnswer:
          "Relative references shift when copied, which is useful for row-by-row calculations. Absolute references lock a specific cell or range using $. For example, if a single cell contains a tax rate or target value, using $A$1 prevents the reference from shifting when you copy the formula down a report—avoiding silent calculation errors.",
      },
      applyIt: {
        prompt:
          "Scenario: You have a sheet of requests with a “Dept ID” column and another sheet mapping Dept ID → Dept Name.\n\nHow would you structure the data so lookups are reliable and easy to maintain?",
        exampleSolution:
          "Use a clean mapping table: two columns (Dept ID, Dept Name) with unique IDs and no blanks. Convert both datasets into Tables so ranges expand automatically. Use a lookup formula that references the table columns (structured references) rather than hard-coded ranges. This keeps the lookup stable as rows are added over time.",
      },
    },
    {
      trackId: "data",
      slug: "powerbi-intro-dashboards",
      title: "Power BI Intro: measures vs columns and a simple dashboard story",
      estimatedMinutes: 20,
      sections: [
        {
          heading: "The goal",
          body:
            "A dashboard isn’t a collection of charts—it’s a decision tool.\n\nThis lesson covers modeling basics, the difference between measures and columns, and how to pick visuals that tell a clear story.",
        },
        {
          heading: "Measures vs columns (practical)",
          body:
            "Columns are row-level data (stored per row).\nMeasures are calculations evaluated based on filter context (e.g., Total Sales this month).\n\nIf you want totals that change when filters change, you generally want a measure.",
        },
        {
          heading: "A simple dashboard story",
          body:
            "A director-friendly dashboard usually answers:\n- What’s happening now?\n- What changed?\n- Where do we need attention?\n\nStart with 3–5 KPIs, then a breakdown that explains drivers.",
        },
      ],
      quiz: [
        {
          id: "q1",
          prompt: "In Power BI, what’s the best choice for “Total Requests” that changes with filters?",
          options: [
            { id: "a", label: "A calculated column" },
            { id: "b", label: "A measure" },
            { id: "c", label: "A text field" },
            { id: "d", label: "A slicer" },
          ],
          correctOptionId: "b",
          explanation:
            "Measures are evaluated in filter context, so totals update when the user filters the report.",
        },
        {
          id: "q2",
          prompt: "What’s a good first step when building a dashboard for leaders?",
          options: [
            { id: "a", label: "Add 12 charts so everything is covered." },
            { id: "b", label: "Start with a clear set of questions the dashboard must answer." },
            { id: "c", label: "Use only pie charts." },
            { id: "d", label: "Avoid KPIs because they’re oversimplified." },
          ],
          correctOptionId: "b",
          explanation:
            "Dashboards should answer specific questions. That keeps the layout focused and useful.",
        },
      ],
      checkpoint: {
        type: "single_select",
        prompt:
          "You want a value that recalculates when a user filters by month and owner. Which is correct?",
        options: [
          { id: "a", label: "Create a new column with the total repeated in every row." },
          { id: "b", label: "Create a measure and use it in a card visual." },
          { id: "c", label: "Put the value into a text box manually." },
          { id: "d", label: "Use conditional formatting only." },
        ],
        correctOptionId: "b",
        explanation:
          "A measure recalculates based on filters, which is exactly what you want in interactive dashboards.",
      },
      applyIt: {
        prompt:
          "Scenario: A program director wants to understand request volume and response times.\n\nPick the best visuals for:\n1) Total requests over time\n2) Average response time by team\n3) Top 5 request types\n\nExplain why each visual fits.",
        exampleSolution:
          "1) Line chart for requests over time (shows trend and seasonality).\n2) Bar chart for avg response time by team (easy comparison across categories).\n3) Bar chart for top request types (ranked comparison; clearer than pie for many categories).\n\nThis keeps the story clear: trend → comparison → drivers.",
      },
    },
  ],
  "a-plus": [
    {
      trackId: "a-plus",
      slug: "aplus-hardware-basics",
      title: "A+ Hardware Basics: CPU, RAM, storage, and common ports",
      estimatedMinutes: 20,
      sections: [
        {
          heading: "Cert-style practice (not official materials)",
          body:
            "These lessons provide cert-style practice questions and explanations. They’re meant for learning and confidence building—not official certification materials.",
        },
        {
          heading: "Core components (quick mental model)",
          body:
            "CPU: executes instructions (speed and cores matter).\nRAM: short-term working memory.\nStorage: long-term (HDD vs SSD).\n\nPerformance issues often come from storage or memory constraints before CPU is truly maxed out.",
        },
        {
          heading: "Ports and peripherals (what to recognize)",
          body:
            "Know the basics:\n- USB-A / USB-C\n- HDMI / DisplayPort\n- Ethernet\n- Audio (3.5mm)\n\nIn practice: identify the port, confirm the cable, and validate the device is recognized by the OS.",
        },
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Which component is primarily responsible for short-term working memory?",
          options: [
            { id: "a", label: "CPU" },
            { id: "b", label: "RAM" },
            { id: "c", label: "SSD" },
            { id: "d", label: "GPU" },
          ],
          correctOptionId: "b",
          explanation:
            "RAM holds data and instructions currently in use. Insufficient RAM often causes slowdowns and heavy disk swapping.",
        },
        {
          id: "q2",
          prompt: "Which port is commonly used for wired networking?",
          options: [
            { id: "a", label: "HDMI" },
            { id: "b", label: "Ethernet (RJ-45)" },
            { id: "c", label: "3.5mm audio" },
            { id: "d", label: "DisplayPort" },
          ],
          correctOptionId: "b",
          explanation: "RJ-45 Ethernet is the common wired networking port.",
        },
      ],
      checkpoint: {
        type: "short_answer",
        prompt:
          "A user reports their laptop feels slow after opening many browser tabs. Explain two likely resource constraints and one quick check you’d perform for each.",
        expectedKeywords: ["ram", "memory", "storage", "task manager", "disk"],
        rubric: [
          "Mentions RAM/memory pressure and a check (Task Manager memory usage)",
          "Mentions storage/disk bottleneck and a check (disk usage/activity)",
          "Keeps explanation practical (what you would look for)",
        ],
        exampleAnswer:
          "Likely constraints: RAM (many tabs consume memory) and disk activity (paging if RAM is full). Checks: open Task Manager and review Memory usage; if it's near max and the system is paging, close tabs or add RAM. For disk, check Disk usage in Task Manager; if it's pegged, investigate background processes, free space, or storage health.",
      },
      applyIt: {
        prompt:
          "Scenario: A monitor isn’t displaying. List a step-by-step approach to isolate whether the issue is the monitor, cable/port, or the computer.",
        exampleSolution:
          "Steps:\n1) Confirm monitor power and input source.\n2) Reseat cable; try a different port (HDMI/DP) if available.\n3) Test with a known-good cable.\n4) Test the monitor with another device (or test the computer with another monitor).\n5) Check OS display settings and GPU drivers.\n\nThis isolates each component without guessing.",
      },
    },
    {
      trackId: "a-plus",
      slug: "aplus-troubleshooting-methodology",
      title: "A+ Troubleshooting Methodology: steps, safety, documentation",
      estimatedMinutes: 22,
      sections: [
        {
          heading: "Why methodology matters",
          body:
            "Good support is repeatable. A troubleshooting methodology prevents random changes and reduces time to resolution.\n\nIt also creates better documentation and fewer repeat incidents.",
        },
        {
          heading: "Common troubleshooting steps",
          body:
            "A practical flow:\n1) Identify the problem\n2) Establish a theory of probable cause\n3) Test the theory\n4) Create a plan of action and implement\n5) Verify full system functionality\n6) Document findings, actions, and outcomes",
        },
        {
          heading: "Safety + professionalism",
          body:
            "Before touching hardware: power down when appropriate, use ESD precautions, and protect data.\n\nCommunicate clearly: what you’re doing, what you found, and what happens next.",
        },
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Which step comes immediately after establishing a theory of probable cause?",
          options: [
            { id: "a", label: "Document findings" },
            { id: "b", label: "Test the theory to determine the cause" },
            { id: "c", label: "Replace the motherboard" },
            { id: "d", label: "Escalate immediately" },
          ],
          correctOptionId: "b",
          explanation:
            "You test your theory to confirm or eliminate it before making large changes.",
        },
        {
          id: "q2",
          prompt: "Why is documentation important in troubleshooting?",
          options: [
            { id: "a", label: "It looks professional, but doesn’t help much." },
            { id: "b", label: "It helps reduce repeat incidents and supports handoffs/escalations." },
            { id: "c", label: "It prevents all future failures." },
            { id: "d", label: "It is only needed for hardware issues." },
          ],
          correctOptionId: "b",
          explanation:
            "Documentation captures what changed and what worked, making future support faster and safer.",
        },
      ],
      checkpoint: {
        type: "single_select",
        prompt:
          "A user says “the internet is down.” What is the best first step?",
        options: [
          { id: "a", label: "Replace the router." },
          { id: "b", label: "Identify the scope and symptoms (one user vs many, wired vs Wi‑Fi, error messages)." },
          { id: "c", label: "Reinstall the operating system." },
          { id: "d", label: "Buy a new ISP plan." },
        ],
        correctOptionId: "b",
        explanation:
          "Start by identifying the problem clearly: scope, symptoms, and environment. That prevents unnecessary changes.",
      },
      applyIt: {
        prompt:
          "Scenario: A team reports they can’t access a shared drive. Outline a troubleshooting approach that includes scope checks and a clear handoff note for escalation if needed.",
        exampleSolution:
          "Approach:\n- Scope: one user or multiple? specific network or all?\n- Check credentials/permissions and recent changes.\n- Test connectivity (VPN? Wi‑Fi vs wired).\n- Try accessing from another device/account.\n- Verify server status if applicable.\n\nEscalation note example:\n\"Multiple users impacted on VPN only. Confirmed credentials valid; issue persists across devices. Suspect VPN routing/DNS. Steps tried: ...\"",
      },
    },
    {
      trackId: "a-plus",
      slug: "aplus-os-and-support",
      title: "A+ OS and Support: Windows basics, accounts, and common tools",
      estimatedMinutes: 20,
      sections: [
        {
          heading: "Core OS support mindset",
          body:
            "Support is about restoring function quickly without causing more damage.\n\nYou want to understand accounts, permissions, and a few key tools that surface what’s going wrong.",
        },
        {
          heading: "Accounts + permissions",
          body:
            "Know the difference between:\n- Standard user vs admin\n- Local accounts vs domain/work accounts\n\nMany issues are permission-related. Start with the least disruptive fix.",
        },
        {
          heading: "Basic commands and tools",
          body:
            "Common tools:\n- Task Manager\n- Event Viewer\n- Device Manager\n\nBasic commands (conceptually):\n- ipconfig (network info)\n- ping (connectivity)\n\nUse tools to confirm what’s true before changing settings.",
        },
      ],
      quiz: [
        {
          id: "q1",
          prompt: "Which Windows tool helps you view system/application logs for errors?",
          options: [
            { id: "a", label: "Device Manager" },
            { id: "b", label: "Event Viewer" },
            { id: "c", label: "Calculator" },
            { id: "d", label: "Notepad" },
          ],
          correctOptionId: "b",
          explanation:
            "Event Viewer shows logs that can help identify drivers, services, and application errors.",
        },
        {
          id: "q2",
          prompt: "What’s a good reason to avoid logging in as admin for everyday tasks?",
          options: [
            { id: "a", label: "Admins can’t install software." },
            { id: "b", label: "Admin access increases risk if something malicious runs." },
            { id: "c", label: "Admins can’t browse the web." },
            { id: "d", label: "Admin accounts are slower." },
          ],
          correctOptionId: "b",
          explanation:
            "Principle of least privilege: use standard accounts day-to-day to reduce risk.",
        },
      ],
      checkpoint: {
        type: "short_answer",
        prompt:
          "A user can’t install a needed application due to permissions. Describe a safe approach that restores productivity while minimizing risk.",
        expectedKeywords: ["admin", "least privilege", "request", "policy", "approval"],
        rubric: [
          "Mentions least privilege and not granting admin casually",
          "Suggests an approved install path (IT-managed install, temporary elevation, or software center)",
          "Includes documentation/approval mindset",
        ],
        exampleAnswer:
          "Use least privilege: don’t grant permanent admin unless required. If policy allows, run an approved installer with admin credentials (IT-managed) or use a software portal. If elevation is needed, document the request and get approval, then remove temporary access after install. This restores function without expanding risk long-term.",
      },
      applyIt: {
        prompt:
          "Scenario: A laptop can’t connect to Wi‑Fi, but Ethernet works. What tools/commands would you use and what would you check first?",
        exampleSolution:
          "Check first: Wi‑Fi enabled, correct SSID, airplane mode off, and password.\nTools:\n- Task Manager (network activity)\n- Device Manager (Wi‑Fi adapter status/driver)\n- ipconfig (has an IP? gateway?)\n- ping (gateway / DNS)\n\nThis separates a local adapter issue from a network/auth issue quickly.",
      },
    },
  ],
};

export function getTrackLessons(trackId: LabTrackId): LabLesson[] {
  return labLessonsByTrack[trackId] ?? [];
}

export function getLesson(trackId: string | undefined, slug: string | undefined): LabLesson | undefined {
  if (!trackId || !slug) return undefined;
  const tid = trackId as LabTrackId;
  const lessons = labLessonsByTrack[tid];
  if (!lessons) return undefined;
  return lessons.find((l) => l.slug === slug);
}

