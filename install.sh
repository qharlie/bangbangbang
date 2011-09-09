
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

INSTALL_PATH=$HOME/.bang
LINK_PATH=/usr/bin/bang
CPATH=bang
CREATE_LINK=1

if [ ! -w /usr/bin ]; then
    CREATE_LINK=0    
    CPATH="$INSTALL_PATH/bang.py"
    echo "You don't have permissions to make a link to /usr/bin/bang, you can either type the full path to $INSTALL_PATH/bang.py"
    echo "or you can stop and reinstall with sudo.  Should I procede and just skip making the link (y\N) ?"
    read answer

    if [ "$answer" != "y" ]; then
	exit 0
    fi

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

tar="${TAR}"
if [ -z "$tar" ]; then
  tar=tar
fi


#Remove previous versions !charlie ^10
if [ -e $INSTALL_PATH ]; then
    rm -rf $INSTALL_PATH
fi

mkdir $INSTALL_PATH

echo "Downloading the latest bang script into $TMP"
curl -s http://www.thecodebase.com/latest.tgz > $TMP/latest.tgz
echo "Unzipping the tarball and moving to $INSTALL_PATH"
cd $TMP && $tar xzf latest.tgz && mv script/* $INSTALL_PATH
if [ $CREATE_LINK -eq 1  ]; then
    echo "Creating a link to $LINK_PATH"
    if [ -h $LINK_PATH ]; then
	rm $LINK_PATH
    fi
    ln -s $INSTALL_PATH/bang.py $LINK_PATH
fi

#Clean up 
rm -rf "$TMP"
echo "BANG has been installed!  Use '$CPATH -h' to get started, or try '$CPATH $INSTALL_PATH' to see it in action. "
