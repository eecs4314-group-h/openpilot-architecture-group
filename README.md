# Group H Website

A static, responsive website for York University Group H's OpenPilot architecture project. It uses HTML, CSS, and vanilla JavaScript only, so it can be hosted directly on GitHub Pages.

Student numbers are **not** stored in `index.html`. The website reads them from a published, read-only Google Sheet CSV whenever the page loads.

## Folder Structure

```text
index.html
css/
  style.css
js/
  members.js
assignments/
reports/
documents/
resources/
README.md
```

The empty content folders contain `.gitkeep` files so Git will include them. They are ready for future files such as:

- `assignments/assignment1-summary.pdf`
- `assignments/assignment2-summary.pdf`
- `reports/openpilot-architecture-report.pdf`

## How Team Members Add Their Student Numbers

The Google Sheet is the only place where student numbers should be entered. Do not add student numbers directly to `index.html`.

### 1. Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/) and create a blank spreadsheet.
2. Put `Name` in cell **A1**.
3. Put `Student Number` in cell **B1**.
4. Enter these names in column A, starting at cell A2:

   ```text
   Setayesh Chegini
   Spence Hashemi
   Mehdi Jafarian
   David Odidi
   ```

5. Leave the cells in column B blank until each person enters their own student number.

The sheet should look like this:

| Name | Student Number |
| --- | --- |
| Setayesh Chegini | |
| Spence Hashemi | |
| Mehdi Jafarian | |
| David Odidi | |

Keep the headings exactly as `Name` and `Student Number` so the website can identify the columns.

### 2. Share it privately with the team

1. In the Google Sheet, click **Share** in the upper-right corner.
2. Under **General access**, keep the setting as **Restricted**. Do **not** change the editable sheet to “Anyone with the link.”
3. Add the Google accounts of the four group members.
4. Set each group member's permission to **Editor**.
5. Click **Send**.

This keeps editing access limited to the four group members. There are no editing controls on the website.

### 3. Let each person add their own number

Each group member should:

1. Open the privately shared Google Sheet while signed in to the Google account that was invited.
2. Find their name in column A.
3. Enter their own student number in the matching cell in column B.
4. Click outside the cell. Google Sheets saves the change automatically.

If a student number is blank, the website displays `Student Number: Not added yet` after the sheet loads successfully.

### 4. Publish a read-only CSV for the website

Publishing creates a separate read-only view for the website. It does not make the spreadsheet publicly editable.

1. In the Google Sheet, open **File** → **Share** → **Publish to web**.
2. In the first drop-down, choose the sheet tab that contains the member list (for example, `Sheet1`).
3. In the second drop-down, choose **Comma-separated values (.csv)**.
4. Click **Publish**.
5. Confirm by clicking **OK** if Google asks for confirmation.
6. Copy the URL shown in the publishing window. A CSV publishing URL usually contains `/pub?` and ends with or contains `output=csv`.

Important privacy note: anyone who has the published URL may be able to read the published values. Only the four invited group members should have **Editor** access to the original sheet. The website only fetches the published read-only CSV and cannot edit the spreadsheet.

### 5. Paste the published CSV URL into the website

1. Open `js/members.js`.
2. At the very top, find this clearly marked line:

   ```javascript
   const GOOGLE_SHEET_CSV_URL = "PASTE_GOOGLE_SHEET_CSV_URL_HERE";
   ```

3. Replace only `PASTE_GOOGLE_SHEET_CSV_URL_HERE` with the URL copied from Google Sheets. Keep the quotation marks.

Example:

```javascript
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/EXAMPLE/pub?gid=0&single=true&output=csv";
```

4. Save `js/members.js`, commit the change, and push it to GitHub.

## Test the Google Sheet Connection

For the most accurate test, view the site through a local web server or GitHub Pages instead of double-clicking `index.html`.

1. Confirm the published CSV URL is pasted into `js/members.js`.
2. Open the published CSV URL directly in a browser. It should display or download the two-column member list.
3. Start a simple local web server in the project folder. If Python is installed, run:

   ```text
   python -m http.server 8000
   ```

4. Open `http://localhost:8000/` in a browser.
5. Check the **Team Members** section:
   - Entered numbers should appear beside the matching names.
   - Blank cells should show `Not added yet`.
6. Change one test value in the Google Sheet, wait briefly for the published version to update, and refresh the website.
7. If the cards show `Unable to load`, open the browser developer console for the detailed error. Then verify that the URL is the published **CSV** URL, the sheet is still published, and the headings have not changed.

The site deliberately keeps working when the sheet cannot be loaded. All four names remain visible and each card displays `Unable to load`.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project to it. Make sure `index.html` is at the repository root, not inside another folder.
2. On GitHub, open the repository.
3. Open **Settings**.
4. In the sidebar, open **Pages**.
5. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
6. Select the `main` branch.
7. Select the `/ (root)` folder.
8. Click **Save**.
9. Wait for the GitHub Pages URL to appear on the Pages settings screen. The first deployment may take a few minutes.
10. Open the GitHub Pages URL and verify the navigation, links, and Team Members cards.

After future changes, commit and push them to `main`. GitHub Pages will publish the updated files automatically.

## Privacy and Error Handling

- The website contains no form for editing student numbers.
- The original Google Sheet should remain restricted to the four team members as Editors.
- The published CSV is read-only and is used only to display the data.
- The website does not use a backend, database, login system, npm package, or external JavaScript library.
- If the CSV request fails or the configuration is missing, the website still displays all four names with `Student Number: Unable to load` and writes a useful error to the browser console.
