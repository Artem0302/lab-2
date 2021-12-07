import express from "express";
import fs from "fs";
import cors from "cors";
import xml2js from "xml2js";
const app = express();
import { xsltProcess, xmlParse } from "xslt-processor";
app.use(cors());
const parser = new xml2js.Parser();

let obj = {};
obj.studentDataBase = {};
obj.studentDataBase.student = {};
fs.readFile("../science.xml", (err, data) => {
  if (data) {
    parser.parseString(data, (err, result) => {
      if (result) {
        obj = result;
        console.log(obj.studentDataBase.student[0]);
      } else {
        console.log(err);
      }
    });
  } else {
    console.log(err);
  }
});

const getFile = (filename) => {
  return fs.readFileSync(filename).toString();
};
const displayResult = () => {
  const xml = getFile("../science.xml");
  const xsl = getFile("../students.xsl");
  const data = xsltProcess(xmlParse(xml), xmlParse(xsl));
  fs.open("output-dom.html", "w+", (err) => {
    if (err) throw err;
  });
  fs.writeFile("output-dom.html", data, (err) => {
    if (err) throw err;
  });
};

const filterData = (filter, value = null) => {
  let data = [];
  switch (filter) {
    case "name":
      if (value) {
        let i = [];
        obj.studentDataBase.student.forEach((el, j) => {
          if (el.$.Name === value) {
            i.push(j);
          }
        });
        for (let j = 0; j < i.length; j++) {
          data.push(obj.studentDataBase.student[i[j]].$);
        }
      } else {
        data = obj.studentDataBase.student.map((el, i) => el.$.Name);
      }
      break;
    case "faculty":
      if (value) {
        let i = [];
        obj.studentDataBase.student.forEach((el, j) => {
          if (el.$.Faculty === value) {
            i.push(j);
          }
        });
        for (let j = 0; j < i.length; j++) {
          data.push(obj.studentDataBase.student[i[j]].$);
        }
      } else {
        data = obj.studentDataBase.student.map((el, i) => el.$.Faculty);
      }
      break;
    case "department":
      if (value) {
        let i = [];
        obj.studentDataBase.student.forEach((el, j) => {
          if (el.$.Department === value) {
            i.push(j);
          }
        });
        for (let j = 0; j < i.length; j++) {
          data.push(obj.studentDataBase.student[i[j]].$);
        }
      } else {
        data = obj.studentDataBase.student.map((el, i) => el.$.Department);
      }
      break;
    case "course":
      if (value) {
        let i = [];
        obj.studentDataBase.student.forEach((el, j) => {
          if (el.$.Course === value) {
            i.push(j);
          }
        });
        for (let j = 0; j < i.length; j++) {
          data.push(obj.studentDataBase.student[i[j]].$);
        }
      } else {
        data = obj.studentDataBase.student.map((el, i) => el.$.Course);
      }
      break;
    case "mark":
      if (value) {
        let i = [];
        obj.studentDataBase.student.forEach((el, j) => {
          if (el.$.Mark === value) {
            i.push(j);
          }
        });
        for (let j = 0; j < i.length; j++) {
          data.push(obj.studentDataBase.student[i[j]].$);
        }
      } else {
        data = obj.studentDataBase.student.map((el, i) => el.$.Mark);
      }
      break;
    case "Dom":
      displayResult();
      break;
  }
  return data;
};

app.get("/:filter", (req, res) => {
  const filter = req.params.filter;
  const data = filterData(filter);
  res.json({ type: "text", data });
});

app.get("/name/:name", (req, res) => {
  const name = req.params.name;
  const data = filterData("name", name);
  res.json({ type: "text", data });
});

app.get("/faculty/:faculty", (req, res) => {
  const faculty = req.params.faculty;
  const data = filterData("faculty", faculty);
  res.json({ type: "text", data });
});

app.get("/department/:department", (req, res) => {
  const department = req.params.department;
  const data = filterData("department", department);
  res.json({ type: "text", data });
});

app.get("/course/:course", (req, res) => {
  const course = req.params.course;
  const data = filterData("course", course);
  res.json({ type: "text", data });
});

app.get("/mark/:mark", (req, res) => {
  const mark = req.params.mark;
  const data = filterData("mark", mark);
  res.json({ type: "text", data });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
