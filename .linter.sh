#!/bin/bash
cd /home/kavia/workspace/code-generation/fairyfinance--magicreports-64494-b5df0927/fairyfinance_magicreports
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

