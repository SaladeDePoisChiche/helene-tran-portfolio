npm run build
cp CNAME dist/
git push origin --delete gh-pages
git add dist -f 
git add CNAME
git commit -m "deployment"
git subtree push --prefix dist origin gh-pages
git reset HEAD~ 