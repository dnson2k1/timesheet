import { ChevronUpIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import { useAppSelector } from "~/hooks/hooks";
import { useStyles } from "./targetuserStyles";
import User from "./User";
import UserJoin from "./UserJoin";

const TargetUser = () => {
  const classes = useStyles();

  const { targetUser, targetUserJoin } = useAppSelector(
    (state) => state.projectReducer
  );

  console.log({ targetUser });

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className={classes.thead}>
            <tr style={{ padding: 10 }}>
              <td className="text">
                <p>Tasks</p>
                <p>Billable</p>
              </td>
            </tr>
          </TableHead>
          <TableBody>
            <tr>
              {!!targetUserJoin.length &&
                targetUserJoin.map((item) => (
                  <UserJoin user={item} key={item.id} />
                ))}
            </tr>
          </TableBody>
        </Table>
      </TableContainer>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ChevronUpIcon />}
          aria-controls="panel2a-content"
        >
          <p className={classes.title}>Select team member</p>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {!!targetUser.length &&
            targetUser
              .slice(0, 15)
              .map((user) => <User user={user} key={user.id} />)}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default TargetUser;
