# homeServer
homeServer is a command-line webserver just like python -m SimpleHTTPServer 3000
<!--
Receiving Files

cd /tmp
homeserver

cd ~/
echo 'Hello Test World!' > hello-test.txt
curl http://localhost:3000/hello.txt \
  -X POST \
  --data-binary @hello-test.txt


you can see helle-test.txt in your tmp file -->


You Got homeserver!
===

`homeserver` is a command-line webserver just like python -m SimpleHTTPServer 3000

Think `python -m SimpleHTTPServer 3000`,
and accepts file uploads (very safely, see below).

Installation
===

    npm install -g homeserver

Usage
===

    homeserver
Defaults to 3000 and the current directory

example:

    cd ~/Downloads
    homeserver
Now you can watch movies and other files in your web browser by localhost:3000 in your Local Area Network.

Receiving Files
---

Files will be received to the filename they were posted as.

    cd /tmp
    homeserver

    cd ~/
    echo 'Hello Test World!' > hello-test.txt
    curl http://localhost:3000/hello.txt \
      -X POST \
      --data-binary @hello-test.txt

    cat /tmp/hello.txt
    > Hello Test World!
