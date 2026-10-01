# Group H Website

A static, responsive GitHub Pages website for York University Group H's OpenPilot architecture project. It uses HTML, CSS, vanilla JavaScript, Google Forms, and a published Google Sheets CSV—without a backend, npm packages, passwords, API keys, or private credentials.

Team members can add or update their own student number directly from the website. Submissions go to Google Forms, responses are stored in Google Sheets, and the website reads the latest response for each member.

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

## How Team Members Add Their Student Numbers

After the Google integration below is configured, a team member only needs to:

1. Open the public Group H website.
2. Find their card under **Team Members**.
3. Click **Add / Update Student Number**.
4. Confirm their preselected name.
5. Enter their student number using digits only.
6. Click **Save Student Number**.

They do not need to open GitHub, edit code, make commits, or edit the Google Sheet.

## Configure Google Forms and Google Sheets

Complete these steps once as the project owner.

### 1. Create the Google Form

1. Go to [Google Forms](https://forms.google.com/) and create a **Blank form**.
2. Name it something clear, such as `Group H Student Numbers`.
3. Leave the form open while completing the next steps.

### 2. Create the Name dropdown

1. Add a question titled exactly `Name`.
2. Change the question type to **Dropdown**.
3. Add only these four options, spelled exactly as shown:

   ```text
   Setayesh Chegini
   Spence Hashemi
   Mehdi Jafarian
   David Odidi
   ```

4. Turn on **Required** for this question.

### 3. Create the Student Number field

1. Add a second question titled exactly `Student Number`.
2. Set its type to **Short answer**.
3. Turn on **Required**.
4. Open the question's three-dot menu and choose **Response validation**.
5. Choose **Regular expression** → **Matches**.
6. Enter this expression:

   ```text
   ^[0-9]+$
   ```

7. Use an error message such as `Enter digits only.`

The website also validates digits before sending the response.

### 4. Allow updates from the website

Open the form's **Settings** and check the response settings:

1. Keep **Accepting responses** enabled.
2. Turn off **Limit to 1 response**. A teammate must be able to submit again when correcting or updating a number.
3. Do not require users to edit an existing response.
4. If all teammates cannot sign in with the same organization, turn off any setting that restricts responses to your organization.
5. Do not add password fields or request private credentials.

### 5. Connect the Form to a Google Sheet

1. Open the form's **Responses** tab.
2. Click the green **Link to Sheets** button.
3. Choose **Create a new spreadsheet**.
4. Give it a clear name and click **Create**.
5. Open the new response spreadsheet.

Google Forms normally creates a sheet tab named `Form Responses 1` with columns similar to:

```text
Timestamp | Name | Student Number
```

Do not rename the `Name` or `Student Number` columns. The JavaScript uses those exact headings.

### 6. Publish the response data as a read-only CSV

The website must be able to read the response sheet without signing in.

1. In the linked Google Sheet, choose **File** → **Share** → **Publish to web**.
2. In the first dropdown, choose the response tab, normally `Form Responses 1`.
3. In the second dropdown, choose **Comma-separated values (.csv)**.
4. Click **Publish** and confirm.
5. Copy the published CSV URL. It normally contains `/pub?` and `output=csv`.

Do not make the spreadsheet publicly editable. Publishing creates a read-only output; editing access can remain restricted.

### 7. Copy the Google Form ID

1. In Google Forms, click **Send** and choose the link icon.
2. Copy the form's public link. It looks similar to:

   ```text
   https://docs.google.com/forms/d/e/1FAIpQLExampleFormId/viewform
   ```

3. The Form ID is the text between `/d/e/` and `/viewform`:

   ```text
   1FAIpQLExampleFormId
   ```

### 8. Copy the two Google Form entry IDs

Each Google Form question has a public entry ID. These are safe to include in a public repository.

1. Open the form editor's three-dot menu.
2. Choose **Get pre-filled link**.
3. Select `Setayesh Chegini` in the Name dropdown.
4. Enter a temporary number such as `123456789` in Student Number.
5. Click **Get link**, then copy the generated link.
6. Paste the link into a temporary text editor so the full URL is visible.

The end of the link will look similar to:

```text
?entry.111111111=Setayesh+Chegini&entry.222222222=123456789
```

- The entry key whose value is `Setayesh Chegini` is the Name entry ID, for example `entry.111111111`.
- The entry key whose value is `123456789` is the Student Number entry ID, for example `entry.222222222`.

Copy each complete value beginning with `entry.`.

### 9. Paste the four configuration values into the website

Open `js/members.js`. At the very top, find:

```javascript
const GOOGLE_FORM_ID = "PASTE_GOOGLE_FORM_ID_HERE";
const GOOGLE_FORM_NAME_ENTRY_ID = "entry.PASTE_NAME_ENTRY_ID_HERE";
const GOOGLE_FORM_STUDENT_NUMBER_ENTRY_ID = "entry.PASTE_STUDENT_NUMBER_ENTRY_ID_HERE";
const GOOGLE_SHEET_CSV_URL = "PASTE_GOOGLE_SHEET_CSV_URL_HERE";
```

Replace the placeholder text while keeping the quotation marks. For example:

```javascript
const GOOGLE_FORM_ID = "1FAIpQLExampleFormId";
const GOOGLE_FORM_NAME_ENTRY_ID = "entry.111111111";
const GOOGLE_FORM_STUDENT_NUMBER_ENTRY_ID = "entry.222222222";
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/EXAMPLE/pub?gid=123&single=true&output=csv";
```

Save the file, commit the change, and push it to the `main` branch. GitHub Pages will redeploy automatically.

## Test a Submission

1. Open the public GitHub Pages website.
2. Under **Team Members**, click **Add / Update Student Number** on one member's card.
3. Confirm that the correct member is already selected.
4. Try entering letters and confirm the form rejects them.
5. Enter a temporary digits-only student number and click **Save Student Number**.
6. Confirm the message `Student number saved successfully.` appears.
7. Open the Google Form's **Responses** tab or its linked Sheet and confirm a new row was added.
8. The website updates the selected card immediately and automatically checks the published Sheet for the new response. Google may take a short time to refresh the published CSV.
9. Submit a different number for the same member and confirm the website eventually shows the newer value.

Before the integration is configured, every card shows `Not added yet`. `Unable to load` is reserved for an actual Sheet request or parsing error.

## How the Latest Submission Is Chosen

Google Forms appends each response as a new row at the bottom of the response sheet. The website reads the rows from top to bottom and stores one number per recognized team member. When it encounters another response for the same name, the later row replaces the earlier one.

Example:

```text
Spence Hashemi | 111111111
Spence Hashemi | 222222222
```

The website displays `222222222` because it appears in the most recent appended response row.

## Privacy and Security

- The repository is public. Never commit passwords, API keys, OAuth tokens, service-account files, or other private credentials.
- Google Form IDs, question entry IDs, and a published CSV URL are public identifiers, not editing credentials.
- The Google Sheet should remain non-editable to the public.
- Publishing the response sheet as CSV means anyone with the published URL—and visitors to the public website—can read the submitted names and student numbers. Make sure every team member understands this before collecting their number.
- The website provides submission access only. It does not provide Google Sheet editing access.

## GitHub Pages

The existing repository deploys from the `main` branch and `/ (root)` folder. After future changes are pushed to `main`, GitHub Pages rebuilds the site automatically.

## Troubleshooting

- **The modal says the Form is not configured:** Replace all three Form placeholders at the top of `js/members.js`.
- **Cards keep showing Not added yet:** Add the published CSV URL, confirm the response tab—not another tab—was published, and keep the `Name` and `Student Number` headings unchanged.
- **A submission does not appear in Google Forms:** Recheck the Form ID and both `entry.` IDs using a new pre-filled link.
- **Cards show Unable to load:** Open the CSV URL directly in a browser and confirm it returns CSV data. Then check the browser console for the detailed error.
- **An older number appears:** Keep the Google Form response sheet in its original append order. The newest responses must remain below older responses.
