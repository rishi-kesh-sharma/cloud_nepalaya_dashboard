import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getMisc } from "../../apiCalls/misc";
import { useDispatch, useSelector } from "react-redux";
import { SET_MISC, SET_QUOTES } from "../../utils/actions";
import { useEffect } from "react";
import PieChart from "../../components/charts/PieChart";
import { getDocuments } from "../../apiCalls/general";
const Page = () => {
  const dispatch = useDispatch();

  const quotes = useSelector((state) => state?.quote);
  useEffect(() => {
    const getData = async () => {
      const misc = await getMisc();
      const response = await getDocuments("quote");
      dispatch({ type: SET_QUOTES, payload: response?.data?.documents });
      dispatch({ type: SET_MISC, payload: misc });
    };
    getData();
  }, []);
  const misc = useSelector((state) => state.misc);
  return (
    <div className="mt-[1.7rem] ml-[18vw] ">
      <div
        className="cards flex-wrap items xl:ml"
        style={{
          display: "flex",
          alignItems: "start",
          gap: "2rem",
          justifyContent: "start",

          // minHeight: "100vh",
        }}>
        <Card sx={{ minWidth: 275 }} className="bg-gray-200">
          <CardContent className="text-gray-800">
            <Typography
              variant="h5"
              sx={{ textAlign: "center" }}
              component="div">
              Total Blogs
            </Typography>
            <Typography
              sx={{ mb: 1.5, mt: "1rem", textAlign: "center" }}
              className="text-gray-800">
              {misc.totalBlogs}
            </Typography>
          </CardContent>
        </Card>
        {/* <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center" }} component="div">
            Total FAQs
          </Typography>
          <Typography
            sx={{ mb: 1.5, mt: "1rem", textAlign: "center" }}
            color="text.secondary">
            {misc.totalFAQs}
          </Typography>
        </CardContent>
      </Card> */}
        <Card sx={{ minWidth: 275 }} className="bg-gray-200">
          <CardContent className="text-gray-800">
            <Typography
              variant="h5"
              sx={{ textAlign: "center" }}
              component="div">
              Total Quotes
            </Typography>
            <Typography
              sx={{ mb: 1.5, mt: "1rem", textAlign: "center" }}
              className="text-gray-800">
              {misc.totalQuotes}
            </Typography>
          </CardContent>
        </Card>
        {/* <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center" }} component="div">
            Total Services
          </Typography>
          <Typography
            sx={{ mb: 1.5, mt: "1rem", textAlign: "center" }}
            color="text.secondary">
            {misc.totalServices}
          </Typography>
        </CardContent>
      </Card> */}
        {/* <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center" }} component="div">
            Total Testimonials
          </Typography>
          <Typography
            sx={{ mb: 1.5, mt: "1rem", textAlign: "center" }}
            color="text.secondary">
            {misc.totalTestimonials}
          </Typography>
        </CardContent>
      </Card> */}
        <Card sx={{ minWidth: 275 }} className="bg-gray-200">
          <CardContent className="text-gray-800">
            <Typography
              variant="h5"
              sx={{ textAlign: "center" }}
              component="div">
              Total Contacts
            </Typography>
            <Typography
              sx={{ mb: 1.5, mt: "1rem", textAlign: "center" }}
              className="text-gray-800">
              {misc.totalContacts}
            </Typography>
          </CardContent>
        </Card>
        {/* <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center" }} component="div">
            Team Members
          </Typography>
          <Typography
            sx={{ mb: 1.5, mt: "1rem", textAlign: "center" }}
            color="text.secondary">
            {misc.totalUsers}
          </Typography>
        </CardContent>
      </Card> */}
      </div>
      <div className="mt-[2rem]">
        <PieChart items={quotes} />
      </div>
    </div>
  );
};

export default Page;
