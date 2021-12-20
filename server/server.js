import express from "express";
import fs from "fs";
import cors from "cors";
import xml2js from "xml2js";
const app = express();
import { xsltProcess, xmlParse } from "xslt-processor";
app.use(cors());
const parser = new xml2js.Parser();

let obj = {};
obj.scienceDataBase = {};
obj.scienceDataBase.draft = {};
fs.readFile("../science.xml", (err, data) => {
  if (data) {
    parser.parseString(data, (err, result) => {
      if (result) {
        obj = result;
        console.log(obj.scienceDataBase.draft[0]);
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
  const xsl = getFile("../projects.xsl");
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
        obj.scienceDataBase.draft.forEach((el, j) => {
          if (el.$.Name === value) {
            i.push(j);
          }
        });
        for (let j = 0; j < i.length; j++) {
          data.push(obj.scienceDataBase.draft[i[j]].$);
        }
      } else {
        data = obj.scienceDataBase.draft.map((el, i) => el.$.Name);
      }
      break;
    case "faculty":
      if (value) {
        let i = [];
        obj.scienceDataBase.draft.forEach((el, j) => {
          if (el.$.Faculty === value) {
            i.push(j);
          }
        });
        for (let j = 0; j < i.length; j++) {
          data.push(obj.scienceDataBase.draft[i[j]].$);
        }
      } else {
        data = obj.scienceDataBase.draft.map((el, i) => el.$.Faculty);
      }
      break;
    case "department":
      if (value) {
        let i = [];
        obj.scienceDataBase.draft.forEach((el, j) => {
          if (el.$.Department === value) {
            i.push(j);
          }
        });
        for (let j = 0; j < i.length; j++) {
          data.push(obj.scienceDataBase.draft[i[j]].$);
        }
      } else {
        data = obj.scienceDataBase.draft.map((el, i) => el.$.Department);
      }
      break;
    case "laboratory":
      if (value) {
        let i = [];
        obj.scienceDataBase.draft.forEach((el, j) => {
          if (el.$.laboratory === value) {
            i.push(j);
          }
        });
        for (let j = 0; j < i.length; j++) {
          data.push(obj.scienceDataBase.draft[i[j]].$);
        }
      } else {
        data = obj.scienceDataBase.draft.map((el, i) => el.$.laboratory);
      }
      break;
    case "project":
      if (value) {
        let i = [];
        obj.scienceDataBase.draft.forEach((el, j) => {
          if (el.$.project === value) {
            i.push(j);
          }
        });
        for (let j = 0; j < i.length; j++) {
          data.push(obj.scienceDataBase.draft[i[j]].$);
        }
      } else {
        data = obj.scienceDataBase.draft.map((el, i) => el.$.project);
      }
      break;
    case "Dom":
      displayResult();
      break;
    default:
      data = obj.scienceDataBase.draft.map((el, i) => el.$);
  }
  return data;
};

app.get("/all", (req, res) => {
  const filter = '';
  const data = filterData(filter);
  res.json({ type: "text", data });
});

app.get("/:name/:faculty/:department/:laboratory/:project", (req, res) => {
  const project = req.params.project;
  let data = [];
  for (let key in req.params){
    if (req.params[key] !== '№' && data.length === 0){
      data = filterData(key,req.params[key]);
    }
    if(req.params[key] !== '№' && data.length !== 0){
      let i = [];
      data.forEach((el, j) => {
        if (el[key] === req.params[key]) {
          i.push(j);
        }
      });
      for (let j = 0; j < i.length; j++) {
        i[j] = data[i[j]];
      }
      data = i;
    }
  }

  res.json({ type: "text", data });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
