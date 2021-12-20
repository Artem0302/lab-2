import "./App.css";
import { useState } from "react";
import axios from "axios";

function answer (response,setText) {
  let text = "<p><br>";
  response.data.data.forEach((el) => {
    text += "{ <br>";
    for (let key in el) {
      text += `${key}:` + el[key] + "<br>";
    }
    text += "} <br>";
  });
  text += "</p>";
  setText(text);
}

function sort(mas, setText) {
  let flag = true;
  for (let i = 0; i < mas.length; i++) {
    if (mas[i] !== "") {
      flag = false;
    }
  }
  if (flag) {
    axios
      .get("/all")
      .then((response) => answer(response,setText))
      .catch(function (error) {
        // обробка помилки
        console.log(error);
      });
  } else {
    axios
      .get(`/${mas[0]==='' ? '№' : mas[0]}/${mas[1]==='' ? '№' : mas[1]}/${mas[2]==='' ? '№' : mas[2]}/${mas[3]==='' ? '№' : mas[3]}/${mas[4]==='' ? '№' : mas[4]}`)
      .then((response) => answer(response,setText))
      .catch(function (error) {
        // обробка помилки
        console.log(error);
      });
  }
}

function Dom() {
  axios
    .get("/Dom")
    .then(function (response) {
      alert("All is done");
    })
    .catch(function (error) {
      // обробка помилки
      console.log(error);
    });
}

function App() {
  const [text, setText] = useState(["<p>Hello</p>"]);
  const [Name, setName] = useState("");
  const [Faculty, setFaculty] = useState("");
  const [Department, setDepartment] = useState("");
  const [laboratory, setLaboratory] = useState("");
  const [project, setProject] = useState("");
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
    style={{padding: "100px", masWidth: "50%"}}
    dangerouslySetInnerHTML={{__html: text}}
    />
      <div style={{ padding: "30px", backgroundColor: "green", width: "50%" }}>
        <div>
          <button
            onClick={() =>
              sort([Name, Faculty, Department, laboratory, project], setText)
            }
            style={{ margin: "20px", width: "120px", height: "50px" }}
          >
            Sort
          </button>
          <button
            onClick={() => Dom()}
            style={{ margin: "20px", width: "120px", height: "50px" }}
          >
            Dom
          </button>
        </div>
        <div>
          <p>Name</p>
          <input
            value={Name}
            onChange={({ target }) => setName(target.value)}
            style={{ margin: "20px" }}
          />
          <p>Faculty</p>
          <input
            value={Faculty}
            onChange={({ target }) => setFaculty(target.value)}
            style={{ margin: "20px" }}
          />
          <p>Department</p>
          <input
            value={Department}
            onChange={({ target }) => setDepartment(target.value)}
            style={{ margin: "20px" }}
          />
          <p>laboratory</p>
          <input
            value={laboratory}
            onChange={({ target }) => setLaboratory(target.value)}
            style={{ margin: "20px" }}
          />
          <p>project</p>
          <input
            value={project}
            onChange={({ target }) => setProject(target.value)}
            style={{ margin: "20px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
