# WildPath Zoo Website 🐾

A multi-page zoo website featuring an animal showcase, category filtering, expandable animal details, a ticket purchase counter, and sign-in/sign-up modals.

## 📁 Project Structure

```
├── index.html       # Homepage (hero section, ticket purchase, tour info)
├── animals.html      # Full animal listing with category filter + pagination
├── styles.css        # Site-wide styles
├── script.js          # Shared JS: modals, filtering, counters, pagination
└── images/            # Animal photos
```

## ✨ Features

- **Sign-in / Sign-up modals** — toggle between the two dialogs, with a proper close button that doesn't trigger form validation.
- **Category filter** (`animals.html` only) — filter animal cards by `data-category` (mammals, birds, reptiles, insects, etc.) using a `<select>` dropdown.
- **Progressive pagination** — animals are grouped into sections (`.animals-6`, `.animals-12`, `.animals-18`, `.animals-24`); "Show More" reveals the next section, "Show Less" hides sections again.
- **Read More dialogs** — each animal card opens a matching `<dialog class="animal-details">` with full info (habitat, diet, lifespan, fun facts, adaptations).
- **Ticket counter** — plus/minus buttons increment/decrement ticket counts per ticket type.

## 🛠️ Key Fixes Applied

Since `script.js` is shared across both `index.html` and `animals.html` (which don't have identical markup), a few guards and fixes were needed:

1. **Null-safe selectors** — `index.html` has no `<select>` element (the filter only exists on `animals.html`). Wrapped it in:
   ```javascript
   if (select) {
       select.addEventListener("change", () => { ... });
   }
   ```
   Same guard applied to `sections` before calling `.forEach()`, since `index.html` has no pagination sections either.

2. **`closest("dialog")` instead of `parentElement`** — close buttons are nested several levels deep inside the dialog (`button` → `div` → `form` → `dialog`), so `.parentElement.close()` failed. `.closest("dialog")` reliably walks up to the actual dialog regardless of nesting depth.


4. **Sign-in ↔ Sign-up toggle** — clicking "Create Account" or "Sign-in" now closes the currently open dialog before opening the other, instead of stacking both open at once:
   ```javascript
   signUp.addEventListener('click', () => {
       logInDialog.close();
       logUpDialog.showModal();
   });
   ```

## ▶️ Running Locally

No build step required — plain HTML/CSS/JS.

1. Clone or download the project folder (keep `images/` alongside the HTML files).
2. Open `index.html` in a browser, or serve the folder with a local server (recommended, so relative paths and dialogs behave consistently):
   ```bash
   npx serve .
   ```
3. Navigate to `animals.html` via the "Meet Animals" link to see the filter and pagination in action.

## 🧩 Possible Next Steps

- Split `script.js` into a shared file (modals, ticket counter) + a page-specific file (filter, pagination) to avoid null-checks entirely.
- Add real form submission / auth handling (currently forms only trigger dialog open/close).
- Add zoo map
- Add functionality tickets purchase
- Add functionality for book tour.
- Make website responsive