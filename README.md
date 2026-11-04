# Engineering College – Brochure Website

Static, responsive, multi-page website for the fictional Engineering College, built with HTML5, CSS3, Bootstrap 5 and vanilla JavaScript (ES6+).

**Live URL:** https://YOUR-USERNAME.github.io/midterm-engineering-college-YOURID/

## Page map
| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, key benefits, call to action |
| Programs | `programs.html` | About the college and filterable program cards |
| Admissions | `admissions.html` | Overview, application steps, tuition table |
| Student Life | `student-life.html` | Filterable news, events and clubs |
| Contact | `contact.html` | Contact details and contact form |
| Register | `register.html` | Advanced registration form |

Use the fixed top navigation bar (collapses into a menu on small screens) to move between pages; the current page is highlighted.

## Features
- Fixed, collapsible navigation with active states and a skip-to-content link
- Consistent colour, type and spacing tokens in `css/style.css`
- Registration form: inline validation, success states, submit blocked until valid, confirmation message
- Contact form: validation, honeypot field plus arithmetic question, success and failure messages
- **Extra interaction 1:** category filters on Programs and Student Life
- **Extra interaction 2:** per-year / per-semester tuition toggle on Admissions
- **Design and motion:** minimal, Apple-inspired look (system font stack, frosted navigation bar, large type, soft rounded surfaces); staged hero entrance, self-drawing line illustration, scroll reveal with spring easing, hero that eases out on scroll, stat count-up, animated filters and form feedback (all disabled for reduced-motion users)
- All content is visible without JavaScript; forms note that JavaScript is needed to send

## Known limitations
- Forms are client-side only; no data is stored or sent
- Anti-spam check is basic and not a substitute for server-side protection
- Pages use no photographs; visuals are CSS and an inline SVG logo
- Bootstrap is loaded from a CDN, so an internet connection is required

## Credits
- Bootstrap 5.3 (MIT licence), via jsDelivr
- Logo, layout, copy and styles: original work for this project
- Institution, people and contact details are fictional
