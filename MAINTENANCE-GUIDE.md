# School by Alif — Website Maintenance Guide

This guide explains how to update the School by Alif website using GitHub. You can maintain teachers, demo students, notices, images, school details, and page content without rebuilding the site.

- Website: https://s18211190154-ux.github.io/schoolbyalif/
- Repository: https://github.com/s18211190154-ux/schoolbyalif
- Main branch: `main`

## 1. Before you edit anything

1. Open the repository link and sign in to GitHub.
2. Open the file or folder mentioned in the relevant section below.
3. To edit a file, open it and use the pencil **Edit** button. To add a new file, open the correct folder and choose **Add file → Create new file**.
4. Make the changes, then use **Commit changes**. Add a short message describing the change.
5. Wait briefly for GitHub Pages to publish, then reload the website. A hard refresh (Ctrl+F5 on Windows) can help if the browser shows cached content.

**Important:** This is a static website. Public files committed to this repository can be read by anyone.

## 2. The main files and folders

| What you want to change | Where to edit |
|---|---|
| School name, phone, email, address, hours, image URLs, social links | `assets/js/site-config.js` |
| Add or update teacher profiles | `data/teachers/` |
| Add or update fictional student examples | `data/students/` |
| Add notices and announcements | `data/notices/` |
| Add fictional guardian-comment examples | `data/guardian-comments/` |
| Page wording, headings, static stories, subjects, admissions copy, policy text | The relevant root HTML file, e.g. `about.html`, `academics.html`, `admissions.html` |
| Colors, glass effects, spacing, typography, responsive styling | `assets/css/style.css` |
| Website behavior, data loading, filters and card rendering | `assets/js/main.js` |
| General project instructions | `README.md` |

Do not edit `assets/js/main.js` just to change names or add ordinary records; use the data folders instead.

## 3. Update teacher information

Teacher records are in `data/teachers/`. Existing examples are named like `teacher-001.json`. Open the file you want to update and change its values while keeping the JSON structure valid.

Example teacher record:

```json
{
  "id": "TEACHER-007",
  "name": "Ms. Example Name",
  "role": "English Teacher",
  "subject": "English",
  "department": "Secondary",
  "photo": "https://example.com/teacher-photo.jpg",
  "bio": "A short biography approved for public display."
}
```

Field guide:
- `id`: unique record ID. Keep it stable when editing the same teacher.
- `name`: teacher's display name.
- `role`: job title or role.
- `subject`: subject taught.
- `department`: department, school section, or level.
- `photo`: direct public image URL. Leave as an empty string if no photo should appear.
- `bio`: short, approved biography.

### Add a new teacher

1. Open `data/teachers/`.
2. Choose **Add file → Create new file**.
3. Give it a unique filename such as `teacher-007.json`. Do not use the word `template` in the filename.
4. Copy the JSON example above and replace it with approved details.
5. Check commas and quotation marks, then commit the file.

Use a unique ID and filename for every person. Do not create two records with the same ID. To remove a teacher from the public directory, delete that teacher's JSON file only if you are sure it should no longer be displayed.

### Teacher photos

You can put a direct photo URL in the record's `photo` field. The central image settings file `assets/js/site-config.js` also has `teacherImages` overrides keyed by a record ID or name slug, and default `images.teacher1` through `images.teacher7`. A record's own `photo` normally takes precedence over the default teacher image; use the per-person override when you want to centrally control a specific person's image.

Use school-approved photos and confirm permission before publishing them.

## 4. Student information — public demo data only

Student examples are in `data/students/`. **This repository is public. Do not add real student information here.** Never upload real names, student IDs, class/section/roll, grades, attendance, reports, health details, guardian contacts, or private notes. Use only fictional examples until the site has a secure login system and private backend.

Example fictional record:

```json
{
  "id": "STUDENT-DEMO-005",
  "name": "Example Student",
  "student_id": "DEMO-1005",
  "grade": "Class 6",
  "section": "A",
  "roll": "05",
  "attendance": 95,
  "status": "Example status",
  "focus": "General learning",
  "note": "Fictional sample record only.",
  "photo": "https://example.com/demo-student.jpg"
}
```

Fields:
- `id`: unique internal record ID.
- `name`: fictional display name.
- `student_id`: use a clearly fake demo value.
- `grade`, `section`, `roll`: example class information only.
- `attendance`: example numeric percentage/value as used by your demo.
- `status`, `focus`, `note`: demonstration text, not real evaluations.
- `photo`: optional direct image URL.

To add another demo record, create a new file such as `student-demo-005.json` inside `data/students/`, copy the structure, change every ID/value to a unique fictional example, and commit it. Do not use actual student data even if you think a page is obscure: the files are publicly readable.

Student photo overrides can also be configured in `assets/js/site-config.js` under `studentImages`, using the record ID or a name slug as the key.

## 5. Add, edit, or remove a notice

Notices are stored in `data/notices/`. You can use structured JSON/CSV notices or upload a notice document/image.

### Add a structured notice (recommended)

Create a new file inside `data/notices/`, for example `2026-11-03-science-fair.json`. Use this structure:

```json
{
  "id": "NOTICE-2026-011",
  "title": "Science Fair Registration",
  "date": "2026-11-03",
  "category": "events",
  "priority": "normal",
  "summary": "Registration details and the deadline for the school science fair.",
  "audience": "Students and guardians",
  "label": "Event announcement",
  "attachment": "https://example.com/science-fair-guidelines.pdf"
}
```

Fields:
- `id`: unique ID for the notice. Use it consistently if linking a notice image in the image settings.
- `title`: title shown to readers.
- `date`: use `YYYY-MM-DD` (year-month-day).
- `category`: use one of `urgent`, `academic`, `events`, or `general`.
- `priority`: e.g. `normal` or `important`.
- `summary`: concise public announcement.
- `audience`: who should read it.
- `label`: short label shown with the notice.
- `attachment` or `link`: optional direct link to a PDF, image, or official information page.

Make each notice ID unique. Keep JSON valid: use double quotes around keys and text; put commas between properties but not after the final property.

### Attach a notice PDF or image

Upload the file directly into `data/notices/` using **Add file → Upload files**. Supported extensions include PDF, JPG, JPEG, PNG, and WebP. Use a useful filename; a date at the start such as `2026-11-03-science-fair.pdf` helps identify the date. Commit the upload. Only upload material intended for public viewing.

For a notice card with an image, add its image URL in `assets/js/site-config.js` under `noticeImages`, keyed by that notice's exact ID. Example:

```js
noticeImages: {
  "NOTICE-2026-011": "https://example.com/science-fair.jpg"
},
```

When editing the existing object, do not remove the other settings. If the final entry in an object becomes non-final, make sure it has a comma after it. Direct image URLs work best; a Drive/Dropbox preview page is not necessarily a direct image URL.

### Edit or remove a notice

Edit the existing JSON file to update the date, title, summary, or other fields. To remove a notice, delete its file or remove the relevant row from the CSV. Check whether the notice has an image URL in `noticeImages`; remove or update that mapping too if appropriate.

## 6. Guardian comments

The folder `data/guardian-comments/` contains fictional sample comments. You may edit/add **fictional demonstration content only** while the repository is public.

Example fields: `id`, `author`, `date`, `category`, `comment`, `response`. Create a new JSON file in that folder with a unique ID and valid JSON, then commit. Never publish real guardian comments, private communications, complaints, or identifying details in this public repository.

## 7. Change images across the website

Open `assets/js/site-config.js`. This file is the central image and school-contact configuration.

- `images.background`: background image behind the design.
- `images.hero`, `campus`, `classroom`, `students`, `library`, `sports`, `arts`, `science`, `leadership`: shared page/section images.
- `images.teacher1` through `images.teacher7`: default portrait slots.
- `noticeImages`: image URL per notice ID.
- `teacherImages`: optional teacher-specific image overrides.
- `studentImages`: optional fictional student-specific image overrides.

Replace only the text inside the quotation marks for a setting, preserving the key, commas, and surrounding braces. Use a direct URL that ends in or serves an image file, preferably HTTPS and JPG/PNG/WebP. Test the URL in a browser tab before committing. Use licensed or school-owned images and obtain appropriate consent for identifiable people, especially children.

## 8. Update school name and contact information

In `assets/js/site-config.js`, edit:
- `name` and `shortName`
- `tagline`
- `email`, `phone`, `address`, `hours`
- `socials.facebook`, `socials.instagram`, `socials.youtube`

Use the school's real, verified public contact information. Social links should be full URLs, not just a page name. Some page copy may still contain example text; review `contact.html`, `about.html`, and other relevant HTML pages as well.

## 9. Edit the text on other pages

Most static page content is written directly in its HTML file in the repository root. Open the page, click **Edit**, and search within the file for the heading or sentence you want to change.

- `index.html`: homepage text and sections.
- `about.html`: school story, mission and values.
- `academics.html`: subject descriptions, curriculum and timetable examples.
- `admissions.html`: admissions steps and enquiry information.
- `campus-life.html`: clubs, activities and gallery captions.
- `news.html`: static sample news/highlight stories.
- `contact.html`: contact page copy and contact-form preview.
- `notices.html`: notice board page layout and labels (notice records belong in the data folder).
- `teachers.html`: teacher directory page layout.
- `students.html`: student demo page layout.
- `guardians.html`: guardian-comment page layout.
- `complaints.html`: complaint/feedback preview and its explanatory text.
- `privacy.html`: privacy statement.
- `accessibility.html`: accessibility statement.
- `404.html`: not-found page.

Edit only the text or HTML elements you understand. Avoid deleting script tags, stylesheet links, data attributes, IDs used by forms, or the shared header/footer containers; JavaScript uses some of these to build the site. If you need to change only the site's data, use the data files instead of editing HTML.

## 10. Change colors, glass effects, and layout

Open `assets/css/style.css`. It controls typography, spacing, colors, cards, glass effects, responsive layout, and dark/light themes. Small changes can affect many pages at once. Make a small edit, commit, and test both desktop and mobile widths, both themes, navigation menus, and the notice/teacher/student cards.

Do not edit CSS just to change a teacher or notice. Keep content and design changes separate when possible.

## 11. Forms and important limitations

The admissions, contact, complaints, and guardian-comment form interfaces are **front-end previews**. They do not send messages to the school or store records in a database. Do not rely on them to receive real enquiries or complaints. Before using them operationally, connect a secure backend/form service and test delivery, spam protection, access controls, and privacy notices.

The student directory is also only a public demo feature. A real student portal needs authentication, server-side permissions, and a private database; putting private data in GitHub files or JavaScript is not secure.

## 12. CSV option

The data loader supports JSON or CSV files. Template CSV files show the expected column names. For CSV:
1. Keep the first row as the column headers.
2. Use the exact field names listed above.
3. Put one record per row.
4. If a value contains a comma, enclose it in double quotes.
5. Avoid changing the header spelling.
6. Rename the file so its filename does not contain `template`; template-named files are ignored.

For a beginner, one JSON file per teacher/student-demo/notice is usually easier to edit safely.

## 13. Check your changes before publishing

- [ ] The file is in the correct folder.
- [ ] The filename is unique and does not contain `template`.
- [ ] JSON uses double quotes and valid commas/braces.
- [ ] Each record has a unique ID.
- [ ] Dates use `YYYY-MM-DD`.
- [ ] Image and attachment URLs open directly.
- [ ] Only approved public content is included.
- [ ] No real student or private guardian data has been uploaded.
- [ ] You committed the changes to `main`.
- [ ] The website has had time to update; refresh with Ctrl+F5 if needed.
- [ ] Check the page on a phone and desktop.

If the content does not appear, check that the file is in the correct folder, the filename does not contain `template`, the JSON is valid, and the GitHub Pages version has refreshed.

## 14. Roll back a mistake

If an edit breaks something, open the repository's **Commits** history, open the previous working commit, and inspect the changed file. You can edit the file again to restore the previous content, or use GitHub's revert option if available. Avoid making multiple unrelated changes in one commit; smaller commits are easier to undo.

---

**Privacy reminder:** This website's repository is public. Keep real student records, attendance, guardian contacts, complaint details, and confidential school documents out of it. Use only approved public staff information, public notices, and fictional student/comment examples until a secure backend is implemented.
