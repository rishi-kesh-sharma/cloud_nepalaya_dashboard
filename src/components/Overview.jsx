import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getOverview } from "../apiCalls/misc";
import { useDispatch, useSelector } from "react-redux";
import { SET_OVERVIEW } from "../actions/overviewActions";
import { useEffect } from "react";
const Overview = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getOverviews = async () => {
      const overviews = await getOverview();
      dispatch({ type: SET_OVERVIEW, payload: overviews });
    };
    getOverviews();
  }, []);
  const overview = useSelector((state) => state.overviewReducer);
  return (
    <div
      className="cards"
      style={{
        display: "flex",
        alignItems: "start",
        gap: "2rem",
        justifyContent: "center",
        marginTop: "4rem",
        marginLeft: "18vw",
        // minHeight: "100vh",
      }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center" }} component="div">
            Total Blogs
          </Typography>
          <Typography
            sx={{ mb: 1.5, mt: "1rem", textAlign: "center" }}
            color="text.secondary">
            {overview.totalBlogs}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center" }} component="div">
            Total Users
          </Typography>
          <Typography
            sx={{ mb: 1.5, mt: "1rem", textAlign: "center" }}
            color="text.secondary">
            {overview.totalUsers}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
