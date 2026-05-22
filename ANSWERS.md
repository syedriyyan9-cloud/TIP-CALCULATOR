# Answers

## 1) How to run

Open `index.html` in your browser.

Or use a local web server from the project folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

If you use the server command, make sure Python is installed. There is no deployed URL yet.

## 2) Stack & design choices

I used vanilla HTML, CSS, and JavaScript with Bootstrap for layout. I picked this stack because it is simple and fast to build for a small calculator app, and it works in any browser without extra build steps.

Two design decisions:

- I placed the Bill Amount and Number of People fields side by side on wider screens. This makes it easier to compare the two main inputs and keeps the form compact on a laptop.
- I made the tip buttons visually distinct with an active gradient style and hover lift. That helps the user see which tip percentage is selected and makes the tip selection feel interactive.

## 3) Responsive & accessibility

On a 360px phone, the form stacks vertically with full-width inputs and buttons. On a 1440px laptop, the form is centered and the bill and people fields sit side by side in one row.

One accessibility consideration I handled is input labels and focus states for form controls, plus an `aria-label` on the theme toggle button. This helps keyboard users and improves clarity for screen readers.

One thing I knowingly skipped is full screen-reader live announcements for result updates and richer inline validation feedback. I kept the basic controls accessible, but I did not add advanced live-region announcements yet.

## 4) AI usage

I used GitHub Copilot / AI assistant to help with CSS layout ideas, button hover styling, and theme toggle behavior. I asked for cleaner responsive form styling and a dark/light mode toggle.

One change I made to AI output was the theme toggle control. The AI suggested a text button like "Dark Mode," but I changed it to an icon-only button on the right of the heading so the header looks cleaner and takes up less space.

I also adjusted the button styling and form layout to center the calculate button and give the app a friendlier, more polished feel.

## 5) Honest gap

One thing that is not polished enough is that the app still uses a calculate button instead of updating results live as the user types.
