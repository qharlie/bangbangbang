#kill node
node=`ps -ef | grep "node" | awk '{print $2}'`
echo $node
kill -9 $node
# remove formhog
rm -rf bangbang
#checkout
git clone git@github.com:qbert65536/bangbang.git
#DB setup
rm -rf bang
mv bangbang/website bang
mv bangbang/install.sh .
cd bangbang && tar czvf latest.tgz script/ && mv latest.tgz ..
#start node and quit
cd - && cd bang && forevert start -o bang.log app.js &
cd - && cd formhog && forever start -o fh.log app.js &
