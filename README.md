# Website Down Checker

A simple, serverless React application to check if a website is UP or DOWN.

## Deployment Instructions

This project is designed to be deployed on **Cloudflare Pages**.

1.  **Push to GitHub**:
    Push this code to your GitHub repository: `https://github.com/codermillat/website-down-checker` (or your preferred repository name).

2.  **Cloudflare Dashboard**:
    *   Log in to Cloudflare.
    *   Go to **Compute (Workers & Pages)** > **Pages**.
    *   Click **Connect to Git**.
    *   Select your repository.

3.  **Build Settings**:
    *   **Framework Preset**: `Vite`
    *   **Build Command**: `npm run build` (You **MUST** set this in the dashboard settings if it's not auto-detected)
    *   **Build Output Directory**: `dist`

4.  **Functions**:
    *   Cloudflare Pages automatically detects the `functions/` directory.
    *   The `functions/check.ts` file will be deployed as a Worker at `/check`.

5.  **Deploy**: Click "Save and Deploy".

Once deployed, access your site. The frontend will automatically call `/check?url=...` which is handled by the Cloudflare Function.
