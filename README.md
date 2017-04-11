# facebookBotLikes
Small google script code for automatically likes all posts on your new feed.

How to use.

1. Create a project in Google Apps Script
Go to https://script.google.com
Then File -> New -> Project
Untitled project is created with an empty Code.gs file.

2. Copy paste all code from bot.gs file in this repository to Code.gs file in your project

3. Download "ATP Token.exe" from repository to your desktop, logon your facebook account and get Token.
  *We wont archived your password, dont worry!

4. Copy token from step 3, then place it in run_like() function.

`function run_like() {
    var run = casper_like("Enter your token here");
} // set triger per menit`

5. Create a trigger for automatically run every minute
[Imgur](http://i.imgur.com/PbrFUdc.png?1)

