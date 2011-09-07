
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


# set the temp dir
TMP="${TMPDIR}"
if [ "x$TMP" = "x" ]; then
  TMP="/tmp"
fi
TMP="${TMP}/npm.$$"
rm -rf "$TMP" || true
mkdir "$TMP"
if [ $? -ne 0 ]; then
  echo "failed to mkdir $TMP" >&2
  exit 1
fi

BACK="$PWD"

# sniff for gtar/gegrep/gmake
# use which, but don't trust it very much.

tar="${TAR}"
if [ -z "$tar" ]; then
  tar=tar
fi
