# SeniorConnect by Gru Team
SeniorConnect is a social media mobile app implemented in client-server architecture.

Client side is built with [Ionic][Ionic] + [AngularJS][AngularJS];
Server side is built with [Flask][Flask] and [MySQL][MySQL] DB.

### Functions
SeniorConnect provides a platform to engage the elderly in social life.

The design emphasizes on convenient voice channel, accessible functionalities within 4 steps and security.

```
Chatting           --> Send/ Receive/ Listen to voice message
Call               --> Real time voice call a friend powered by PhoneRTC
Connecting         --> Send/ Receive/ Accept/ Reject friend request Only contacts saved in native mobile phone is allowed.
Sharing            --> Post up to 9 photos at once and Like others' sharing!
Community          --> Join/ Quit interest communities and activities; View customised calendars at any time!
Multilingual       --> Use SeniorConnect in your language
```
For more details, please refer to official [documents][documents].
## Installation

### Server Installation
1. Setup MySQL database and update `config.py`
2. Create virtual environment: `virtualenv flask`
3. Activate virtual environment: `source flask/bin/activate`
4. Install requirements: `pip install -r requirements.txt`
5. Start server: `python run.py`

### Client Installation
1. Install [Node.js][Node.js]
2. Install Cordova and Ionic: `npm install -g cordova ionic`
3. Config server address @ `www/js/services-overall.js`
4. Create phonertcTurnServerConfig variable and save in `www/js/secret.js`
5. Install [Android SDK 22][Android SDK 22]
6. Add Android platform: `ionic platform add android`
7. Connect your mobile phone to computer
8. Build SeniorConnect application: `ionic run android`

Good luck!

[Ionic]: http://ionicframework.com
[AngularJS]: https://angularjs.org
[Flask]: http://flask.pocoo.org
[MySQL]: https://www.mysql.com
[documents]: https://github.com/elevenloveseleven/Gru/tree/master/Doc
[git]: http://git-scm.com/
[Node.js]: https://nodejs.org/en/
[Android SDK 22]: http://developer.android.com/about/versions/lollipop.html