cd dist
copy index.html 404.html || cp index.html 404.html
git init
git add -A
git commit -m "auto"
git push -u https://github.com/kong0107/doujin.git HEAD:gh-pages --force
cd ..
