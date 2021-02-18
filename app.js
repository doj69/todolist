const express = require("express");
const bodyParser = require("body-parser");
const date = require(`${__dirname}/date.js`);

//Constant variable
const port = process.env.PORT || 3000;

//Local variable
const itemObj = {
  work: [],
  shopping: [],
  home: ["Buy Food", "Cook Food", "Eat Food"],
};
let message = "";
const route = ["/Work", "/Shopping", "/"];

//Set the config
const app = express();

app.use(bodyParser.urlencoded({ extended: true }), express.static("public"));

app.set("view engine", "ejs");

//Dynamic Item List Type Route
route.forEach((element) => {
  let items;
  switch (element) {
    case "/Work":
      items = itemObj.work;
      break;
    case "/Shopping":
      items = itemObj.shopping;
      break;
    case "/":
      items = itemObj.home;
      break;
    default:
      break;
  }
  app.get(`${element}`, (req, res) => {
    res.render("list", {
      listTitle:
        element === "/" ? date.getDate() : `${element.replace("/", "")} List`,
      newListItems: items,
      error: message,
      route: `${element}`,
      year: date.getCurrentYear(),
    });
  });

  app.post(`${element}`, (req, res) => {
    let item = req.body.newItem;
    if (item !== "") {
      items.push(item);
    } else {
      message = `item can't empty`;
      setTimeout(() => {
        message = "";
      }, 100);
    }

    res.redirect(`${element}`);
  });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
