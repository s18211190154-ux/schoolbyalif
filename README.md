# School by Alif — light and responsive school website

A multi-page school site built with HTML/CSS/JavaScript: light-first theme with optional dark mode, a soft blue-white background, teal and blue accents, Plus Jakarta Sans + DM Sans typography, frosted-glass navigation/cards/forms/page headers, responsive layouts and reduced-motion-aware transitions. Headings use plain labels so visitors can find sections quickly.

## Page labels and navigation
Navigation uses clear labels: Home, Notices, Teachers, Students, Families and Explore. Page headings describe their content directly.

## Pages
Home, Notices, Teachers, Students (fictional demo records), Guardians (sample comments), Complaints & Feedback, About, Academics, Campus Life, News, Admissions, Contact, Privacy, Accessibility and a 404 page.

## Add content using folders

The website reads the public GitHub folders when a data page loads. Add a file to the relevant folder and commit it to \`main\`; no HTML editing is needed.

- \`data/notices/\`: JSON or CSV announcements, plus PDF/image notices (\`pdf\`, \`jpg\`, \`jpeg\`, \`png\`, \`webp\`). Give attachment files a useful filename; a leading \`YYYY-MM-DD\` is displayed as its date.
- \`data/teachers/\`: JSON or CSV staff directory data.
- \`data/students/\`: JSON or CSV **fictional demo records only** in this public repository.
- \`data/guardian-comments/\`: JSON or CSV fictional sample comments only.

You can use one JSON object per file, a JSON array, or a CSV with one record per row. Files containing the word \`template\` are ignored.

### Fields for notice JSON/CSV
\`id\`, \`title\`, \`date\` (YYYY-MM-DD), \`category\` (urgent, academic, events, general), \`priority\`, \`summary\`, \`audience\`, \`label\`, optional \`attachment\` or \`link\`.

### Fields for teacher JSON/CSV
\`id\`, \`name\`, \`role\`, \`subject\`, \`department\`, \`photo\`, \`bio\`; optional public school email only if approved.

### Fields for student demo JSON/CSV
\`id\`, \`name\`, \`student_id\`, \`grade\`, \`section\`, \`roll\`, \`attendance\`, \`status\`, \`focus\`, \`note\`.

### Fields for guardian-comment JSON/CSV
\`id\`, \`author\`, \`date\`, \`category\`, \`comment\`, \`response\`.

CSV column names should match the field names above. Include a header row and quote values containing commas or line breaks.

## Critical student-data privacy
This is a public GitHub repository and public website. Current student and guardian entries are fictional samples. **Never upload real student names, IDs, grades, roll numbers, attendance, reports, private family comments, medical details or complaint reports to this public repository.** Real student data requires an authenticated application, server-side access control and a private database. Do not put private records in public JavaScript/static files.

Guardian comments and contact/admissions/complaint forms are frontend previews. A comment appears temporarily in the current browser only; it is not saved or sent. Connect a secure backend when you are ready.

## Customisation
- School name, contacts, image URLs and data source: \`assets/js/site-config.js\`
- Layout, theme colours, dark mode, responsive behaviour: \`assets/css/style.css\`
- Folder loaders, filters, navigation and interactions: \`assets/js/main.js\`

Enable GitHub Pages in repository Settings → Pages → Deploy from a branch → \`main\` → \`/(root)\` if not already enabled.

## Research references
School site usability: https://www.bexratech.com/blog/school-website-checklist
WCAG contrast guidance: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum
Motion accessibility guidance: https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions
