import connection from "../db/conn.js";
import { validationResult } from "express-validator";
const addTask = (req, res) => {
  try {
    const { title, details, category } = req.body;
    const result = validationResult(req);
    const { errors } = result;
    if (result.isEmpty()) {
      connection.query(
        `INSERT INTO tasks (title,detail,categoryId,taskDate) VALUES (?,?,?,CURRENT_DATE())`,
        [title, details, category],
        (err, result) => {
          if (result?.affectedRows > 0) {
            return res.status(200).json({ message: "stored" });
          } else {
            return res.status(500).json({ message: "internal sever error" });
          }
        }
      );
    } else {
      return res.status(400).json({ message: errors[0]?.msg });
    }
  } catch (e) {
    return res.status(500).json({ message: "internal sever error" });
  }
};

const veiwAllTask = (req, res) => {
  try {
    connection.query(
      `SELECT title,detail,taskDate,name,isDone  FROM tasks as t INNER JOIN taskcategory as tc ON t.categoryId=tc.categoryId`,

      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "internal sever error" });
        } else if (result?.length > 0) {
          return res.status(200).json(result);
        } else {
          return res.status(200).json([{ message: "task is not available" }]);
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "internal sever error" });
  }
};

const completeTask = (req, res) => {
  try {
    const { taskId } = req.body;
    if (!taskId) {
      return res.status(422).json({ message: "task id is required" });
    } else {
      connection.query(
        "UPDATE tasks SET isDone=1 WHERE taskId=?",
        [taskId],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "internal sever error" });
          } else if (result?.affectedRows > 0) {
            return res.status(200).json({ message: "task completed" });
          } else {
            return res.status(200).json([{ message: "task is not available" }]);
          }
        }
      );
    }
  } catch (error) {
    return res.status(500).json({ message: "internal sever error" });
  }
};
const changeDetails = (req, res) => {
  try {
    const { taskId, detail } = req.body;
    if (!taskId || !detail) {
      return res
        .status(422)
        .json({ message: "task id or details are required" });
    } else {
      connection.query(
        "UPDATE tasks SET detail=? WHERE taskId=?",
        [detail, taskId],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "internal sever error" });
          } else if (result?.affectedRows > 0) {
            return res.status(200).json({ message: "Details changed" });
          } else {
            return res.status(200).json([{ message: "task is not available" }]);
          }
        }
      );
    }
  } catch (error) {
    return res.status(500).json({ message: "internal sever error" });
  }
};

const DeleteTask = (req, res) => {
  try {
    const { taskId } = req.body;
    if (!taskId) {
      return res.status(422).json({ message: "task id is required" });
    } else {
      connection.query(
        "DELETE FROM tasks WHERE taskId=?",
        [taskId],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "internal sever error" });
          } else if (result?.affectedRows > 0) {
            return res.status(200).json({ message: "Task Deleted" });
          } else {
            return res.status(200).json([{ message: "task is not available" }]);
          }
        }
      );
    }
  } catch (error) {
    return res.status(500).json({ message: "internal sever error" });
  }
};
export { addTask, veiwAllTask, completeTask, changeDetails, DeleteTask };
