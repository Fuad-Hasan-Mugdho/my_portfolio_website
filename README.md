# Fuad Hasan Chowdhury - Portfolio

This is a static portfolio website ready for GitHub Pages deployment.

## Quick Deploy (GitHub Pages)

1. Create a GitHub repository (recommended name: `my_portfolio_website`).
2. Push this project to the `main` branch.
3. In GitHub repository settings, go to `Pages`.
4. Under `Build and deployment`, set `Source` to `Deploy from a branch`.
5. Set `Branch` to `main` and folder to `/(root)`.
6. Push any change to `main` and GitHub Pages will redeploy.

This project does not require a GitHub Actions workflow for deployment.

## Live URL

If your repository name is `my_portfolio_website`, your site URL will be:
- `https://fuad-hasan-mugdho.github.io/my_portfolio_website/`

If your repository name is different, update these lines in `index.html`:
- `canonical` URL
- `og:url`

## How to Make URL Shorter

GitHub Pages project sites always include the repository name in URL.
So `https://fuad-hasan-mugdho.github.io/my_portfolio_website/` cannot be shortened further unless you change hosting setup.

You have 3 practical options:

1. **Use a user site repository (shortest free option)**
   - Create repo named exactly: `fuad-hasan-mugdho.github.io`
   - Move this portfolio code there (root)
   - Final URL becomes: `https://fuad-hasan-mugdho.github.io/`

2. **Use a custom domain (best professional option)**
   - Buy/use a domain like `fuadhasan.dev` or `fuadhasan.com`
   - Set it in GitHub Pages `Custom domain`
   - Add DNS records and keep `.nojekyll`
   - URL becomes your domain (for example: `https://fuadhasan.dev`)

3. **Keep current hosting but share root link**
   - Share: `https://fuad-hasan-mugdho.github.io/my_portfolio_website/`
   - Avoid sharing section anchor URLs like `#projects` unless needed

## Before Publishing

1. Add your profile image as `profile.jpg` in project root.
2. Confirm all project descriptions are public-safe.
3. Verify contact links and resume filename.

## Local Preview

Run from project root:

```bash
python3 -m http.server 8080
```

Then open:
- `http://localhost:8080`
