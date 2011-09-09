
# make sure that node exists
python=`which python`
ret=$?
if [ $ret -ne 0 ] || ! [ -x "$python" ]; then
  echo "\nBANG cannot be used without python." >&2
  echo "Please visit http://www.python.org and install python first." >&2
  echo "You will need it eventually anyway ;)" >&2
  echo "\nNote that running as sudo can change envs." >&2
  echo ""
  echo "PATH=$PATH" >&2
  exit $ret
fi



#Check to see if the have write permissions

if [ ! -w /opt/  ]; then
    echo "You need write permissions for /opt/ and /usr/bin to install BANG, try sudo'ing ?"
    exit 1
fi

if [ ! -w /usr/bin/  ]; then
    echo "You need write permissions for /opt/ and /usr/bin to install BANG, try sudo'ing ?"
    exit 1
fi

# set the temp dir
TMP="${TMPDIR}"
if [ "x$TMP" = "x" ]; then
  TMP="/tmp"
fi
TMP="${TMP}/bang/"
rm -rf "$TMP"
mkdir "$TMP"
if [ $? -ne 0 ]; then
  echo "failed to mkdir $TMP" >&2
  exit 1
fi

BACK="$PWD"

tar="${TAR}"
if [ -z "$tar" ]; then
  tar=tar
fi


#Remove previous versions !charlie ^10
if [ -e /opt/bang/ ]; then
    rm -rf /opt/bang/
fi

if [ -h /usr/bin/bang ]; then
    rm /usr/bin/bang
fi


echo "Downloading the latest bang script into $TMP"
curl -s http://www.thecodebase.com/latest.tgz > $TMP/latest.tgz
echo 'Unzipping the tarball and moving to /opt/'
cd $TMP && $tar xzf latest.tgz && mv script/ /opt/bang/
echo 'Creating a link to /usr/bin/bang'
ln -s /opt/bang/bang.py /usr/bin/bang 
echo ''
echo 'BANG has been installed!  Use bang -h to get started, or try bang -text -lpy /opt/bang/ to see it in action. '
