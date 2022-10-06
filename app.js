const express = require("express");
const methodOverride = require("method-override");
const articlesRouter = require("./routes/articlesRouter");
const Blog = require("./database/blogSchema");

const app = express();

//middleware  -- request parser
app.use(express.urlencoded({ extended: false }));

//middleware -- static content
app.use(express.static("./static"));

//middleware -- for using delete/put/patch verbs in forms
app.use(methodOverride("_method"));

//  template engine used -- ejs
app.set("view engine", "ejs");

// homepage

app.get("/", async (req, res) => {
  let articles = await Blog.find();

  if (req.query.searchKey !== undefined) {
    const searchKey = req.query.searchKey.toLowerCase();
    articles = articles.filter((article) =>
      article.title.toLowerCase().includes(searchKey)
    );
  }

  res.render("home", {
    articles: articles,
  });
});

app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));

app.use("/articles", articlesRouter);
module.exports = app;
