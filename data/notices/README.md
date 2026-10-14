# Notices upload folder

You can add a notice in either of these ways:

1. **Upload a PDF or image directly**: JPG, JPEG, PNG, WebP, or PDF. Name it something clear, preferably starting with a date such as `2026-11-03-holiday.pdf`. It will appear as a notice card automatically.
2. **Use JSON**: copy `notice-template.json` and add a new JSON file for a title, date, category, description and optional attachment link. This gives the notice a better summary and audience label.

Commit the file to the `main` branch. The site reads the folder on page load, so no HTML edit is necessary. The template itself is excluded from display.

Do not upload confidential notices, private student details, or information that should only be visible after staff/guardian sign-in. This repository is public.
