import * as ProblemApiUtil from "../util/problem_util";

export const RECEIVE_ALL_PROBLEMS = "RECEIVE_ALL_PROBLEMS";
export const RECEIVE_PROBLEM = "RECEIVE_PROBLEM";

const receiveAllProblems = problems => ({
    type: RECEIVE_ALL_PROBLEMS,
    problems
});

const receiveProblem = problem => ({
    type: RECEIVE_PROBLEM,
    problem
});

export const fetchAllProblems = () => dispatch => (
    ProblemApiUtil.fetchAllProblems()
        .then(problems => dispatch(receiveAllProblems(problems)))
);

export const fetchProblem = problemId => dispatch => (
    ProblemApiUtil.fetchProblem(problemId)
        .then(problem => dispatch(receiveProblem(problem)))
);