# Build the project
npm run build

# Create out directory if it doesn't exist
if (-not (Test-Path "out")) {
    New-Item -ItemType Directory -Path "out"
}

# Copy build files to out directory
Copy-Item -Path "out/*" -Destination "out" -Recurse -Force

# Create .nojekyll file
New-Item -ItemType File -Path "out/.nojekyll" -Force

# Initialize git repository if not already initialized
if (-not (Test-Path ".git")) {
    git init
}

# Add all files
git add .

# Commit changes
git commit -m "Deploy to GitHub Pages"

# Add GitHub Pages remote if not already added
$remoteUrl = "https://github.com/KABANSOSA/Marketplace_OLD.git"
if (-not (git remote get-url origin)) {
    git remote add origin $remoteUrl
}

# Push to gh-pages branch
git push origin main:gh-pages --force 