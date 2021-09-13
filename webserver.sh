#!/bin/sh

(sleep 3; firefox http://127.0.0.1:8000/index.html) &
(cd www/ && php -S127.0.0.1:8000)
