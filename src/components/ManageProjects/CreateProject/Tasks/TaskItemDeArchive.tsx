import { XMarkIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@mui/material";
import { useAppDispatch } from "~/hooks/hooks";
import { ITaskItem } from "~/interfaces/taskTypes";
import {
  addToOtherTasks,
  changeStatusCheck,
} from "~/redux/Project/projectSlice";

import { useStyles } from "./tasksStyles";
type Props = {
  task: ITaskItem;
};

const TaskItemDeArchive = ({ task }: Props) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const handleDeArchiveTask = () => {
    dispatch(addToOtherTasks(task.taskId));
  };

  return (
    <td key={task?.id} className={classes.member}>
      <div className="row">
        <IconButton onClick={handleDeArchiveTask}>
          <XMarkIcon width={25} />
        </IconButton>
        <p className="name">{task?.name}</p>
      </div>
      <input
        type="checkbox"
        className={classes.checkbox}
        onChange={() => dispatch(changeStatusCheck(task.taskId))}
        checked={task.billable}
      />
    </td>
  );
};

export default TaskItemDeArchive;
