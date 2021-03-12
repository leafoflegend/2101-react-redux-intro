## Demystifying Redux and React Redux

![stars](https://thumbs.gfycat.com/GreedyHighlevelGalapagostortoise-small.gif)

You'll notice I re-wrote these libraries myself. Its meant to show you that these libraries aren't anything all too black magic. That being said, react-redux's implementation (see src/eliot_connect.js) involves some React stuff you're likely not familiar with (Context and Children).

src/eliotdux.js on the other hand, is a full Redux implementation. Yes, yes, I didn't add middleware or `combineReducers`. I could, but you'd hate me more then you already do 🙃

Feel free to mess around with this! `package.json` includes the build commands. Just open the `dist/index.html` after building in your browser, and refresh on changes to see.
