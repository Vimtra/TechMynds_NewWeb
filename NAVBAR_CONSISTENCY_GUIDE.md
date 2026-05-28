# Navbar Consistency Guide

## Current Status
Your navbar is currently **consistent** across all pages. All 5 pages (index.html, aboutus.html, service.html, career.html, contact.html) have identical navbar HTML structures.

## Option 1: Continue with Current Approach (Recommended for Now)
The current hardcoded navbar approach works well and is fully functional. Each page has the identical navbar HTML inline.

**To maintain consistency when updating the navbar:**
1. Update the navbar HTML in **one** page
2. Copy that updated navbar and paste it into all other 4 pages
3. Make sure each page has:
   - The `<div class="top-bar">` with contact info
   - The `<nav class="main-nav">` with menu items
   - The `<div class="mobile-menu-overlay">`

## Option 2: Use Dynamic Navbar Loading (For Future Enhancement)
We've created a reusable navbar system for even better maintainability:

### Files Created:
- `_navbar.html` - The single source of truth for navbar HTML
- `navbar-loader.js` - Dynamically loads the navbar on all pages

### To Implement Dynamic Loading:
1. **Add this script tag before the closing `</body>` tag** in each HTML file:
   ```html
   <script src="navbar-loader.js"></script>
   ```
   This should be placed **before** the closing `</body>` tag, after any existing scripts.

2. **Remove the navbar HTML** from each page (the top-bar, main-nav, and mobile-menu-overlay divs)

3. Benefits:
   - Single source of truth (only update `_navbar.html`)
   - No duplication across pages
   - Easier to maintain long-term

## Navbar Structure Reference
The navbar consists of three parts that must always be together:

```html
<!-- 1. Top Bar (Contact Info) -->
<div class="top-bar">...</div>

<!-- 2. Main Navigation -->
<nav class="main-nav">...</nav>

<!-- 3. Mobile Menu Overlay -->
<div class="mobile-menu-overlay"></div>
```

## Navigation Menu Items
The current menu has these items (should not be changed):
- Home → `./index.html`
- About Us → `./aboutus.html`
- Services → `./service.html`
- Find Jobs → `./career.html` (CTA button)
- Get Started → `./contact.html` (CTA button)

## JavaScript Dependencies
The navbar requires:
- `nav.js` - Handles hamburger menu, scroll effects, and active link highlighting
- Font Awesome & Bootstrap Icons - For icons in the navbar
- Bootstrap 5 CSS - For responsive layout

## Troubleshooting
If the navbar appears broken:
1. Verify all pages are loading `nav.js`
2. Check that icon libraries are loaded (Bootstrap Icons, Font Awesome)
3. Ensure CSS files are properly linked (index.css should be on all pages)
4. Clear browser cache and reload
