#kill node
node=`ps -ef | grep "node" | awk '{print $2}'`
echo $node
kill -9 $node
# remove formhog
rm -rf bangbang
#checkout 
git clone git@github.com:qbert65536/bangbang.git
rm -rf bang
mv bangbang/website bang
mv bangbang/install.sh .
cd bangbang && tar czvf latest.tgz script/ && mv latest.tgz ..
#start node and quit
cd - && cd bang && nohup node app.js &

