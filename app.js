var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var expressSanitizer = require('express-sanitizer');
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
mongoose.connect("mongodb://localhost/blog");

var blogSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    discription: String,
    created: {type: Date, default: Date.now}
  }
);

var blog = mongoose.model("blog", blogSchema);

app.get("/", function (req, res) {
  res.redirect("/blogs")
})








app.get("/blogs", function (req, res) {
  blog.find({}, function (err, viewAll) {
    if (err) {
      console.log(err);
    } else {
      res.render("blogs", {everything: viewAll});
    }
  })
})


app.get("/blogs/new", function (req, res) {
  res.render("new");
})


app.post("/blogs", function (req, res) {
  blog.create(req.body.blog, function (err, newBlog) {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});


app.get("/blogs/:id", function (req, res) {
  blog.findById(req.params.id, function (err, info) {
    if (err) {
      res.redirect("blogs")
    } else {
      res.render("show", {view: info});
    }
  })
})


app.get("/blogs/:id/edit", function (req, res) {
  blog.findById(req.params.id, function (err, found) {
    if (err) {
      res.redirect("/blogs")
    } else {
      res.render("edit", {view: found});
    }
  })
});

app.put("/blogs/:id", function (req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body)
  blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
    if (err) {
      res.redirect("/blogs")
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  })
});


app.delete("/blogs/:id", function (req, res) {
  blog.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/blogs")
    } else {
      res.redirect("/blogs")
    }
  })
});

app.listen(8000, function () {
  console.log("Connected! to port 8000");
})
