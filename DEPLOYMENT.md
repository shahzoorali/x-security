# AWS Amplify Deployment Guide

This guide will help you deploy the X-Security app to AWS Amplify.

## Prerequisites

- AWS Account
- GitHub repository connected (already done: https://github.com/shahzoorali/x-security.git)

## Deployment Steps

### Option 1: Deploy via AWS Amplify Console

1. **Sign in to AWS Amplify Console**
   - Go to https://console.aws.amazon.com/amplify/
   - Sign in with your AWS account

2. **Connect Repository**
   - Click "New app" → "Host web app"
   - Select "GitHub" and authorize AWS Amplify to access your GitHub account
   - Select the repository: `shahzoorali/x-security`
   - Select the branch: `main`

3. **Configure Build Settings**
   - AWS Amplify will automatically detect the `amplify.yml` file
   - Verify the build settings:
     - Build command: `npm run build`
     - Output directory: `dist`
   - Click "Save and deploy"

4. **Deployment**
   - AWS Amplify will automatically:
     - Install dependencies (`npm ci`)
     - Build the application (`npm run build`)
     - Deploy to a unique URL
   - Wait for the build to complete (usually 2-5 minutes)

5. **Access Your App**
   - Once deployed, you'll get a URL like: `https://main.xxxxxxxxx.amplifyapp.com`
   - The app will automatically redeploy on every push to the `main` branch

### Option 2: Deploy via AWS CLI

1. **Install AWS CLI and Amplify CLI**
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. **Initialize Amplify**
   ```bash
   amplify init
   ```

3. **Add Hosting**
   ```bash
   amplify add hosting
   ```

4. **Publish**
   ```bash
   amplify publish
   ```

## Configuration Files

### amplify.yml
- Defines the build process for AWS Amplify
- Includes pre-build and build commands
- Configures output directory and caching
- Sets up security headers
- Configures redirects for React Router (SPA routing)

### public/_redirects
- Netlify-style redirect file (backup for SPA routing)
- Ensures all routes serve `index.html` for client-side routing

## Build Settings Reference

- **Node Version**: AWS Amplify automatically uses Node.js 18.x
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Base Directory**: (root)

## Environment Variables (Optional)

If you need to add environment variables:

1. Go to Amplify Console → Your App → Environment variables
2. Add variables like:
   - `NODE_ENV=production`
   - Any API keys or configuration values

## Custom Domain (Optional)

1. Go to Amplify Console → Your App → Domain management
2. Click "Add domain"
3. Enter your domain name
4. Follow the DNS configuration instructions
5. AWS Amplify will provide SSL certificates automatically

## Troubleshooting

### Build Fails
- Check the build logs in AWS Amplify Console
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Routing Issues
- The `amplify.yml` includes redirect rules for React Router
- If routes don't work, verify the `customRedirects` section

### 404 Errors on Refresh
- This is handled by the redirect rules in `amplify.yml`
- All routes should redirect to `index.html` with status 200

## Continuous Deployment

AWS Amplify automatically:
- Deploys on every push to the connected branch
- Runs build commands
- Shows build status in the console
- Provides preview deployments for pull requests (if configured)

## Monitoring

- View build history in Amplify Console
- Check deployment logs for errors
- Monitor app performance and errors (if CloudWatch is enabled)

## Cost

AWS Amplify hosting is free for:
- 5 GB storage
- 15 GB data transfer per month
- 1,000 build minutes per month

Beyond that, pay-as-you-go pricing applies.

