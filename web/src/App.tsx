import React, { useMemo, useState } from "react";
import "./App.css";

import aerodynamics from "./questions/aerodynamics.json";
import legislation from "./questions/legislation.json";
import materials from "./questions/materials.json";
import meteorology from "./questions/meteorology.json";
import practice from "./questions/practice.json";

import { Question } from "./types";
import { useHotkeys } from "react-hotkeys-hook";

const categories = {
  all: "all",
  aerodynamics: "aerodynamics",
  legislation: "legislation",
  materials: "materials",
  meteorology: "meteorology",
  practice: "practice",
};

const allQuestions = [
  ...aerodynamics.map((q) => ({ ...q, category: categories.aerodynamics })),
  ...legislation.map((q) => ({ ...q, category: categories.legislation })),
  ...materials.map((q) => ({ ...q, category: categories.materials })),
  ...meteorology.map((q) => ({ ...q, category: categories.meteorology })),
  ...practice.map((q) => ({ ...q, category: categories.practice })),
];

function App() {
  const [ordering, setOrdering] = useState<"random" | "sequential">(
    "sequential"
  );
  const [category, setCategory] = useState(categories.all);
  const [selectedQuestion, setSelectedQuestion] = useState<null | Question>(
    allQuestions[0]
  );
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const [alwaysShowAnswer, setAlwaysShowAnswer] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);

  const [notes, setNotes] = useState("");

  const eligibleQuestions = useMemo(() => {
    if (category === categories.all) return allQuestions;
    return allQuestions.filter((q) => q.category === category);
  }, [category]);

  const handleCategoryChangeClick = (category: string) => {
    console.log(category);
    setCategory(category);
    setSelectedQuestionIndex(0);
    setSelectedQuestion(
      category === categories.all
        ? allQuestions[0]
        : allQuestions.filter((q) => q.category === category)[0]
    );
  };

  const handleChangeQuestionClick = (isNext = true) => {
    if (selectedQuestion?.ID) {
      console.log(notes);
      localStorage.setItem(`q-${selectedQuestion?.ID}`, notes);
    }

    let nextQuestionIndex = 0;

    if (ordering === "random") {
      nextQuestionIndex = Math.floor(Math.random() * eligibleQuestions.length);
    } else {
      if (selectedQuestionIndex <= eligibleQuestions.length && isNext) {
        nextQuestionIndex = selectedQuestionIndex + 1;
      } else if (selectedQuestionIndex > 0 && !isNext) {
        nextQuestionIndex = selectedQuestionIndex - 1;
      }
    }

    const nextQuestion = eligibleQuestions[nextQuestionIndex];

    setSelectedQuestionIndex(nextQuestionIndex);
    setSelectedQuestion(nextQuestion);

    // Notes
    const n = localStorage.getItem(`q-${nextQuestion.ID}`);
    if (n) setNotes(n || "");
    else setNotes("");
  };

  useHotkeys("k", () => handleChangeQuestionClick(false));
  useHotkeys("j", () => handleChangeQuestionClick(true));
  useHotkeys("n,f", () => setShowAnswer(!showAnswer));

  const getQuestionStyles = (answer: number) => {
    const isAnswer = `${answer}` === `${selectedQuestion?.Answer}`;
    console.log({ answer, selectedQuestion, isAnswer, showAnswer });

    return {
      opacity: showAnswer ? (isAnswer ? 1 : 0.4) : 1,
      fontWeight: showAnswer ? (isAnswer ? "bold" : "normal") : "normal",
      transition: "0.1s opacity",
    };
  };

  const showHelp = () => {
    return window.alert("j -> next \nk -> prev \nn,f -> show/hide answer");
  };

  return (
    <div className="App text-center flex flex-col p-8 h-screen">
      <ul style={{ listStyle: "none", display: "flex" }}>
        {Object.keys(categories).map((c) => (
          <li
            style={{
              fontWeight: c === category ? "bold" : "normal",
              marginRight: 8,
              cursor: "pointer",
            }}
            onClick={() => handleCategoryChangeClick(c)}
          >
            {c}
          </li>
        ))}
        <li
          style={{
            opacity: 0.6,
            cursor: "pointer",
          }}
          onClick={showHelp}
        >
          help
        </li>
      </ul>

      <div>
        <button
          onClick={() => setOrdering("random")}
          style={{
            fontWeight: ordering === "random" ? "bold" : "normal",
            marginRight: 8,
            cursor: "pointer",
          }}
        >
          random
        </button>
        <button
          onClick={() => setOrdering("sequential")}
          style={{
            fontWeight: ordering === "sequential" ? "bold" : "normal",
            marginRight: 8,
            cursor: "pointer",
          }}
        >
          sequential
        </button>
        <input
          type="checkbox"
          checked={showAnswer}
          onClick={(e) => setShowAnswer((v) => !v)}
        />
      </div>

      <div
        style={{
          marginTop: 16,
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            border: "1px solid gray",
            padding: 8,
            borderRadius: 8,
            width: 800,
          }}
        >
          <p>
            {selectedQuestionIndex + 1} of {eligibleQuestions.length}
          </p>
          <p>{selectedQuestion?.Question}</p>

          <hr />

          {selectedQuestion?.ImageID && (
            <img
              style={{
                maxHeight: 300,
                maxWidth: "100%",
              }}
              alt={selectedQuestion?.Question}
              src={`images/${selectedQuestion.ImageID}.jpg`}
            />
          )}

          <div key={selectedQuestion?.ID} className="py-2">
            <p style={getQuestionStyles(1)}>1. {selectedQuestion?.Answer1}</p>
            <p style={getQuestionStyles(2)}>2. {selectedQuestion?.Answer2}</p>
            <p style={getQuestionStyles(3)}>3. {selectedQuestion?.Answer3}</p>
            <p style={getQuestionStyles(4)}>4. {selectedQuestion?.Answer4}</p>
          </div>

          {/* <button onClick={() => handleChangeQuestionClick(false)}>
            Previous
          </button>
          <button onClick={() => handleChangeQuestionClick(true)}>Next</button> */}
          <hr />
          <textarea
            className="mt-2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>
      <div className="grow" />
      <div className="flex">
        <button
          className="flex-1 bg-gray-300 h-24"
          onClick={() => handleChangeQuestionClick(false)}
        >
          Previous
        </button>
        <button
          className="flex-1 bg-gray-300"
          onClick={() => handleChangeQuestionClick(true)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
