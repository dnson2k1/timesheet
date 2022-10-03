import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import React from "react";
import { useAppDispatch } from "~/hooks/hooks";
import { ITaskItem } from "~/interfaces/taskTypes";
import { addToCommonTasks } from "~/redux/Project/projectSlice";
import { useStyles } from "./tasksStyles";

type Props = {
  task: ITaskItem;
};
const TaskItemArchive = ({ task }: Props) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const handleClickArchiveTask = () => {
    dispatch(addToCommonTasks(task.taskId));
  };

  return (
    <div className={classes.member}>
      <div className="row">
        <Button onClick={handleClickArchiveTask}>
          <PlusCircleIcon width={25} />
        </Button>
        <p className="name">{task?.name}</p>
      </div>
      <p>{task?.billable ? "Other Task" : "Common Task"}</p>
    </div>
  );
};

export default TaskItemArchive;
