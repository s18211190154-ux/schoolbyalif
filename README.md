# School by Alif — Light Edition
A mobile-optimised, multi-page school website using HTML, CSS and vanilla JavaScript. Clean white/ivory surfaces, readable Plus Jakarta Sans + DM Sans typography, green and sky-blue accents, subtle glass panels, light/dark mode, and reduced-motion-aware animations.

## Pages
Home, Notices, Teachers, Students (demo records), Guardians (comments preview), Complaints & Feedback, About, Academics, Campus Life, News, Admissions, Contact, Privacy, Accessibility.

## Automatically add content via folders
The site reads public GitHub folder listings and loads JSON files automatically:
- `data/notices/`: public school notices
- `data/teachers/`: approved staff-directory profiles
- `data/students/`: **fictional demo records only in this public repository**
- `data/guardian-comments/`: fictional sample comments only

To add a notice, copy `data/notices/notice-template.json`, name the new file (e.g. `2026-11-03-holiday.json`), edit the fields, and commit it to `main`. On next page load the site lists the folder, reads the JSON files, and displays the new notice without editing page HTML. Use the same one-file-per-entry pattern for teacher and example student records.

Notice fields: `id`, `title`, `date` (YYYY-MM-DD), `category` (urgent, academic, events, general), `priority`, `summary`, `audience`, optional `attachment` or `link`.

## Important privacy note
This repository and GitHub Pages site are public. All current student records and guardian comments are fictional examples. **Never add real student names, IDs, class/roll numbers, attendance, grades, reports, guardian details, confidential comments, or complaints to public folders.** Real student data needs authentication, server-side access controls, and a private database. Do not put private records inside JavaScript or ship them to the browser on a public site.

Guardian comments, contact, admissions and complaint forms are previews. The guardian comment form adds an on-screen demonstration only; it is not saved or submitted. Connect secure form/backend services before use.

## Customising
- Name, official contact details, images and data-source settings: `assets/js/site-config.js`.
- Theme, responsive layout and animation: `assets/css/style.css`.
- Data loading, theme switch, menus, search and renderers: `assets/js/main.js`.

GitHub Pages should be enabled at Settings → Pages → Deploy from a branch → `main` → `/(root)`.

## Design references
School site usability and keeping information current: https://www.schudio.com/what-parents-actually-notice-on-a-school-website/
W3C accessibility and contrast guidance: https://www.w3.org/TR/WCAG21/
W3C reduced-motion guidance: https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions
