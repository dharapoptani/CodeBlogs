const express = require("express");
const Blog = require("../database/blogSchema");
const router = express.Router();

router.post("/", async (req, res) => {
  let article = new Blog({
    title: req.body.title,
    contributor: req.body.contributor,
    description: req.body.description,
    code: req.body.code,
  });

  try {
    article = await article.save();
    res.redirect("/");
  } catch (err) {
    res.render("articles/newArticle", {
      article: article,
    });
  }
});

router.post("/:id", async (req, res) => {
  let article = {
    title: req.body.title,
    contributor: req.body.contributor,
    description: req.body.description,
    code: req.body.code,
  };
  try {
    article = await Blog.findByIdAndUpdate(req.params.id, article);
    res.redirect("/");
  } catch (err) {
    res.redirect("/articles/edit/" + req.params.id);
  }
});

router.delete("/:id", async (req, res) => {
  let article = await Blog.findById(req.params.id);

  if (!article) res.redirect("/");

  await article.remove();
  res.redirect("/");
});

router.get("/new", (req, res) => {
  res.render("articles/newArticle", {
    article: new Blog({}),
  });
});

router.get("/edit/:id", async (req, res) => {
  let article = await Blog.findById(req.params.id);
  res.render("articles/editArticle", {
    article: article,
  });
});

router.get("/read/:id", async (req, res) => {
  let article = await Blog.findById(req.params.id);

  if (!article) res.redirect("/");

  res.render("articles/readArticle", {
    article: article,
  });
});

module.exports = router;
