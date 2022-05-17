# Drum Machine

## Introduction
This project is part of the Front End Development Library Projects, under the FreeCodeCamp (FCC) curriculum.
Users are able to click on the letters, or tap the corresponding key to play an audioclip.

## Features
 * Power switch to turn the app ON/OFF
 * Bank switch to swap bank of audioclips

## Under the hood
* Built with React, SCSS, and HTML5
* Toggle switch are SCSS only using checkbox
* drumpad activation effect using async settimeout

## changelog

### V 0.5: MVP
 - Changed from using buttons to divs for drum-pads due to requirement of `<audio>`
 - Moved `data` state down to `<DrumPads>`
 - Implemented Power Switch, Bank Switch functionality
 - Added Display
 - Added sound clip play onkeydown/onclick
* TODO
 - SCSS
 - (possible) variable SCSS based on bank
 - (possible) variable SCSS based on if drumpad active
 - source proper audio clips

### v 0.6: Feature Update
 - Changed from using buttons to turn on/off & switch audio bank to toggle (checkbox)
 - variable SCSS based on active state of drumpad & different bank
* TODO
 - Source piano note (X3), piano chord (X3), and 3 other clips for audio bank 1
 - Source guitar note (X3), guitar chord (X3), and 3 other clips for audio bank 2
 - Change display text to reflect audio accurately
 - Refactor/bugfix

### v0.7: Resources
  - source audio clips
  - change display text
* TODO
 - refactor
 - accurate url

### v 1.0: Production Build
 - webpage
 - added correct background url/audio url
 - fixed active pad effect (test build does not work in github)

### v1.0.1: bugfix/QoL
 - fixed active pad effect again (due to dupe id?)
 - remove display text on power/bank toggle
 - lifted display state up to App

### v1.0.2: bugfix
 - fixed active pad effect again (probably finally hopefully) (due to react accepting only decimal values for opacity instead of percentages)

### v 1.1: revisit
 - reorganized changelog
 - edited readme
 - added compatibility meta tag
 - edited tab title
 - changed node-sass to sass 
 - clean up file tree
 - split components into separate js files
 
### This app is for demonstration/education purposes only. I, the creator own none of the clips featured.