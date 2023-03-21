import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({setQuestions, questions}) {

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(resp => resp.json())
    .then(data => setQuestions(data))
  },[])

  const questionList = questions.map((q) => {
    return <QuestionItem key={q.id} question={q} deleteQuestion={deleteQuestion} patchQAnswer={patchQAnswer} />
  })

  function deleteQuestion(id){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: 'DELETE',
    })
    .then(() => setQuestions(() => {
      return questions.filter((q) => q.id !== id)
    }))
  }

  function patchQAnswer(e, id){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: e.target.value,
      }),
    })
    .then((resp) => resp.json())
    .then((updatedQ) => setQuestions((prevQs) => {
      return prevQs.map((q) => (q.id === id ? updatedQ : q))
    }))

    // console.log(id)
    // console.log(e.target.value)
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionList}
      </ul>
    </section>
  );
}

export default QuestionList;
