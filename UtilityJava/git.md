--> git 허브 주요 명령어들

#git config --global --list
#git config --global user.name ""
#git config --global user.email ""

=> 상태값 확인
#git status 
#git remote -v

=> local -> git commit
#git add .
#git commit -m "ver message"
#git push origin master

=> git -> local 동기화
#git fetch --prune origin 
#git reset --hard origin/master 
#git clean
