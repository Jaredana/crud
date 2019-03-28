#!/bin/bash
PID1=`ps -eaf | pgrep -f "ng serve" | grep -v grep`  
if [[ "" != "$PID1" ]] 
then
	echo "$PID1"
	echo "OMAI WA MO SHINDERU"
	pkill "ng serve"
else
	echo "uwu1"
fi


PID3=`ps -ef | grep npm | grep -v grep`  
if [[ "" != "$PID3" ]] 
then
	echo "$PID3"
	echo "THE FITNESS GRAM PACER TEST IS A TEST DESIGNED TO"
	pkill npm
else
	echo "uwu3"
fi

PID2=`ps -eaf | grep node | grep -v grep`  
if [[ "" != "$PID2" ]] 
then
	echo "NOTHING PERSONEL KID"
	pkill node
else
	echo "uwu2"
fi

