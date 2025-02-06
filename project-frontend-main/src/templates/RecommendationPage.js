import React, { useEffect, useState } from "react";
import { IP } from "./constants";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import "../templates/css/Recommendation.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import GradeIcon from "@mui/icons-material/Grade";

export default function RecommendationPage() {
  const navigate = useNavigate();
  const [bmiRecommendation, setBmiRecommendation] = useState({});
  const [seebmiRecommendation, setseeBmiRecommendation] = useState({});
  const [goalGenderRecommendation, setGoalGenderRecommendation] = useState({});
  const [seegoalGenderRecommendation, setseeGoalGenderRecommendation] =
    useState({});
  const [productGoalRecommendation, setProductGoalRecommendation] = useState(
    {}
  );
  const [seeproductGoalRecommendation, setseeProductGoalRecommendation] =
    useState({});
  const [prevPurchaseRecommendation, setPrevPurchaseRecommendation] = useState(
    {}
  );
  const [seeprevPurchaseRecommendation, setseePrevPurchaseRecommendation] =
    useState({});
  const [recentlyViewRecommendation, setRecentlyViewRecommendation] = useState(
    {}
  );
  const [seerecentlyViewRecommendation, setseeRecentlyViewRecommendation] =
    useState({});
  const [timelineRecommendation, setTimelineRecommendation] = useState({});
  const [prevSearchRecommendation, setPrevSearchRecommendation] = useState({});
  const [seeprevSearchRecommendation, setseePrevSearchRecommendation] =
    useState({});
  const [exerciseRecommendation, setExerciseRecommendation] = useState({});
  const [adminRecommendation, setAdminRecommendation] = useState({});
  const [seeadminRecommendation, setseeAdminRecommendation] = useState({});
  const [render, setRender] = useState(false);
  const ageHeightWeight = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/recommendation/ageHeightWeight`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setseeBmiRecommendation(data);
      const array = data?.data;
      setBmiRecommendation([...array].reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const goalGender = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/recommendation/goalGender`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setseeGoalGenderRecommendation(data);
      const array = data?.data;
      setGoalGenderRecommendation([...array].reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const productGoal = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/recommendation/goals`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setseeProductGoalRecommendation(data);
      const array = data?.data;
      setProductGoalRecommendation([...array].reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const prevPurchase = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/recommendation/prevPurchase`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setseePrevPurchaseRecommendation(data);
      const array = data?.data;
      setPrevPurchaseRecommendation([...array].reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const prevSearch = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/recommendation/prevSearch`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setseePrevSearchRecommendation(data);
      const array = data?.data;
      setPrevSearchRecommendation([...array].reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const recentlyViewed = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/recommendation/prevView`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setseeRecentlyViewRecommendation(data);
      const array = data?.data;
      setRecentlyViewRecommendation([...array].reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getByTime = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/recommendation/getByTime`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setTimelineRecommendation(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const exercises = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/exercise/recommendation`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setExerciseRecommendation(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const customRecommendation = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/recommendation/getFromAdmin`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setseeAdminRecommendation(data);
      const array = data?.data;
      setAdminRecommendation([...array].reverse());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const openProductInfo = (productId) => {
    if (productId) {
      navigate(`product/${productId}`, { state: productId });
    } else {
      console.error("Product name is empty or invalid.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          getByTime(),
          recentlyViewed(),
          prevSearch(),
          prevPurchase(),
          productGoal(),
          ageHeightWeight(),
          goalGender(),
          customRecommendation(),
          exercises(),
        ]);
        setRender(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleOpenExercise = (exerciseName) => {
    if (exerciseName === "Squat") {
      window.open("https://maroon-hope-55.tiiny.site/Squat.html", "_blank");
    }
    if (exerciseName === "Shoulder Press") {
      window.open(
        "https://maroon-hope-55.tiiny.site/pushup.html",
        "_blank"
      );
    }
    if (exerciseName === "Bicep Curl") {
      window.open(
        "https://maroon-hope-55.tiiny.site/bicep_curl.html",
        "_blank"
      );
    }
    if (exerciseName === "Dead Lift") {
      window.open(
        "https://maroon-hope-55.tiiny.site/Deadlift.html",
        "_blank"
      );
    }
    if (exerciseName === "Pushup") {
      window.open("https://maroon-hope-55.tiiny.site/pushup.html", "_blank");
    }
  };

  if (!render) {
    return (
      <>
        <div style={{ background: "#1C2833", color: "white" }}>
          <h2>Your recommendations are Loading</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <div class="recommend-cont">
        <br></br>
        {seegoalGenderRecommendation?.data && (
          <>
            <h3>Goal Gender</h3>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {goalGenderRecommendation?.map((value, index) => {
                if (!value) return null;
                return (
                  <>
                    <div
                      id="cards"
                      className="card m-3"
                      style={{ width: "18rem", height: "470px" }}
                    >
                      <img
                        className="img-fluid"
                        src={value?.image}
                        alt="Card image cap"
                        style={{
                          objectFit: "cover",
                          width: "300px",
                          height: "200px",
                        }}
                        onClick={() => openProductInfo(value._id)}
                      />
                      <div id="card-b" className="card-body">
                        <h5 className="card-title">{value?.name}</h5>
                        <h6 className="card-title" value={value?.description}>
                          {truncateText(value?.description, 70)}
                        </h6>
                        <p className="card-text">
                          <CurrencyRupeeIcon id="rup" />
                          {value?.price}
                        </p>
                        <p className="card-text">
                          <GradeIcon id="star" /> {value?.avgRating}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
        <br></br>
        {seebmiRecommendation?.data && (
          <>
            <h3>Age Height Weight</h3>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {bmiRecommendation?.map((value, index) => {
                if (!value) return null;
                return (
                  <>
                    <div
                      id="cards"
                      className="card m-3"
                      style={{ width: "18rem", height: "500px" }}
                    >
                      <img
                        className="img-fluid"
                        src={value?.image}
                        alt="Card image cap"
                        style={{
                          objectFit: "cover",
                          width: "300px",
                          height: "200px",
                        }}
                        onClick={() => openProductInfo(value._id)}
                      />
                      <div id="card-b" className="card-body">
                        <h5 className="card-title">{value?.name}</h5>
                        <h6 className="card-title" value={value?.description}>
                          {truncateText(value?.description, 70)}
                        </h6>
                        <p className="card-text">
                          <CurrencyRupeeIcon id="rup" />
                          {value?.price}
                        </p>
                        <p className="card-text">
                          <GradeIcon id="star" /> {value?.avgRating}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
        <br></br>
        {seeproductGoalRecommendation?.data && (
          <>
            <h3>Product goal</h3>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {productGoalRecommendation?.map((value, index) => {
                if (!value) return null;
                return (
                  <>
                    <div
                      id="cards"
                      className="card m-3"
                      style={{ width: "18rem", height: "450px" }}
                    >
                      <img
                        className="img-fluid"
                        src={value?.image}
                        alt="Card image cap"
                        style={{
                          objectFit: "cover",
                          width: "300px",
                          height: "200px",
                        }}
                        onClick={() => openProductInfo(value._id)}
                      />
                      <div id="card-b" className="card-body">
                        <h5 className="card-title">{value?.name}</h5>
                        <h6 className="card-title" value={value?.description}>
                          {truncateText(value?.description, 70)}
                        </h6>
                        <p className="card-text">
                          <CurrencyRupeeIcon id="rup" />
                          {value?.price}
                        </p>
                        <p className="card-text">
                          <GradeIcon id="star" /> {value?.avgRating}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
        <br></br>
        {seeprevPurchaseRecommendation?.data && (
          <>
            <h3>Previous Purchases</h3>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {prevPurchaseRecommendation?.map((value, index) => {
                if (!value) return null;
                return (
                  <>
                    <div
                      id="cards"
                      className="card m-3"
                      style={{ width: "18rem", height: "460px" }}
                    >
                      <img
                        className="img-fluid"
                        src={value?.product?.image}
                        alt="Card image cap"
                        style={{
                          objectFit: "cover",
                          width: "300px",
                          height: "200px",
                        }}
                        onClick={() => openProductInfo(value?.product._id)}
                      />
                      <div id="card-b" className="card-body">
                        <h5 className="card-title">{value?.product?.name}</h5>
                        <h6
                          className="card-title"
                          value={value?.product?.description}
                        >
                          {truncateText(value?.product?.description, 70)}
                        </h6>
                        <p className="card-text">
                          <CurrencyRupeeIcon id="rup" />
                          {value?.product?.price}
                        </p>
                        <p className="card-text">
                          <GradeIcon id="star" /> {value?.product?.avgRating}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
        <br></br>
        {seeprevSearchRecommendation?.data && (
          <>
            <h3>Previous Search</h3>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {prevSearchRecommendation?.map((value, index) => {
                if (!value) return null;
                return (
                  <>
                    <div
                      id="cards"
                      className="card m-3"
                      style={{ width: "18rem", height: "460px" }}
                    >
                      <img
                        className="img-fluid"
                        src={value?.product?.image}
                        alt="Card image cap"
                        style={{
                          objectFit: "cover",
                          width: "300px",
                          height: "200px",
                        }}
                        onClick={() => openProductInfo(value?.product._id)}
                      />
                      <div id="card-b" className="card-body">
                        <h5 className="card-title">{value?.product?.name}</h5>
                        <h6
                          className="card-title"
                          value={value?.product?.description}
                        >
                          {truncateText(value?.product?.description, 70)}
                        </h6>
                        <p className="card-text">
                          <CurrencyRupeeIcon id="rup" />
                          {value?.product?.price}
                        </p>
                        <p className="card-text">
                          <GradeIcon id="star" /> {value?.product?.avgRating}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
        <br></br>
        {seerecentlyViewRecommendation?.data && (
          <>
            <h3>Recently Viewed</h3>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {recentlyViewRecommendation?.map((value, index) => {
                if (!value) return null;
                return (
                  <>
                    <div
                      id="cards"
                      className="card m-3"
                      style={{ width: "18rem", height: "460px" }}
                    >
                      <img
                        className="img-fluid"
                        src={value?.image}
                        alt="Card image cap"
                        style={{
                          objectFit: "cover",
                          width: "300px",
                          height: "200px",
                        }}
                        onClick={() => openProductInfo(value?._id)}
                      />
                      <div id="card-b" className="card-body">
                        <h5 className="card-title">{value?.name}</h5>
                        <h6 className="card-title" value={value?.description}>
                          {truncateText(value?.description, 70)}
                        </h6>
                        <p className="card-text">
                          <CurrencyRupeeIcon id="rup" />
                          {value?.price}
                        </p>
                        <p className="card-text">
                          <GradeIcon id="star" /> {value?.avgRating}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
        <br></br>
        {timelineRecommendation?.data && (
          <>
            <h3>Timeline</h3>
            <h4>Last Month</h4>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {timelineRecommendation?.data?.lastMonth?.map((value, index) => {
                if (!value) return null;
                return (
                  <>
                    <div
                      id="cards"
                      className="card m-3"
                      style={{ width: "18rem", height: "460px" }}
                    >
                      <img
                        className="img-fluid"
                        src={value?.image}
                        alt="Card image cap"
                        style={{
                          objectFit: "cover",
                          width: "300px",
                          height: "200px",
                        }}
                        onClick={() => openProductInfo(value?._id)}
                      />
                      <div id="card-b" className="card-body">
                        <h5 className="card-title">{value?.name}</h5>
                        <h6 className="card-title" value={value.description}>
                          {truncateText(value?.description, 70)}
                        </h6>
                        <p className="card-text">
                          <CurrencyRupeeIcon id="rup" />
                          {value?.price}
                        </p>
                        <p className="card-text">
                          <GradeIcon id="star" /> {value?.avgRating}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <h4>Last 2 Weeks</h4>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {timelineRecommendation?.data?.last2Weeks?.map((value, index) => {
                if (!value) return null;
                return (
                  <>
                    <div
                      id="cards"
                      className="card m-3"
                      style={{ width: "18rem", height: "460px" }}
                    >
                      <img
                        className="img-fluid"
                        src={value?.image}
                        alt="Card image cap"
                        style={{
                          objectFit: "cover",
                          width: "300px",
                          height: "200px",
                        }}
                        onClick={() => openProductInfo(value?._id)}
                      />
                      <div id="card-b" className="card-body">
                        <h5 className="card-title">{value?.name}</h5>
                        <h6 className="card-title" value={value.description}>
                          {truncateText(value?.description, 70)}
                        </h6>
                        <p className="card-text">
                          <CurrencyRupeeIcon id="rup" />
                          {value?.price}
                        </p>
                        <p className="card-text">
                          <GradeIcon id="star" /> {value?.avgRating}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <h4>Last Week</h4>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {timelineRecommendation?.data?.last7Days?.map((value, index) => {
                if (!value) return null;
                return (
                  <>
                    <div
                      id="cards"
                      className="card m-3"
                      style={{ width: "18rem", height: "460px" }}
                    >
                      <img
                        className="img-fluid"
                        src={value?.image}
                        alt="Card image cap"
                        style={{
                          objectFit: "cover",
                          width: "300px",
                          height: "200px",
                        }}
                        onClick={() => openProductInfo(value?._id)}
                      />
                      <div id="card-b" className="card-body">
                        <h5 className="card-title">{value?.name}</h5>
                        <h6 className="card-title" value={value.description}>
                          {truncateText(value?.description, 70)}
                        </h6>
                        <p className="card-text">
                          <CurrencyRupeeIcon id="rup" />
                          {value?.price}
                        </p>
                        <p className="card-text">
                          <GradeIcon id="star" /> {value?.avgRating}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
        <br></br>
        {seeadminRecommendation?.data && (
          <>
            <h3>Recommendations from Us</h3>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {adminRecommendation?.map((value, index) => {
                if (!value) return null;
                return (
                  <>
                    <div
                      id="cards"
                      className="card m-3"
                      style={{ width: "18rem", height: "460px" }}
                    >
                      <img
                        className="img-fluid"
                        src={value?.image}
                        alt="Card image cap"
                        style={{
                          objectFit: "cover",
                          width: "300px",
                          height: "200px",
                        }}
                        onClick={() => openProductInfo(value._id)}
                      />
                      <div id="card-b" className="card-body">
                        <h5 className="card-title">{value?.name}</h5>
                        <h6 className="card-title" value={value?.description}>
                          {truncateText(value?.description, 70)}
                        </h6>
                        <p className="card-text">
                          <CurrencyRupeeIcon id="rup" />
                          {value?.price}
                        </p>
                        <p className="card-text">
                          <GradeIcon id="star" /> {value?.avgRating}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
        <br></br>
        {exerciseRecommendation?.data && (
          <>
            <h3>Exercises for you</h3>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {exerciseRecommendation?.data?.map((value, index) => {
                if (!value) return null;
                return (
                  <>
                    <div
                      id="cards"
                      className="card m-3"
                      style={{ width: "18rem", height: "400px" }}
                    >
                      <img
                        className="img-fluid"
                        src={value?.exerciseGif}
                        alt="Card image cap"
                        style={{
                          objectFit: "cover",
                          width: "300px",
                          height: "300px",
                        }}
                        onClick={() => handleOpenExercise(value?.name)}
                      />
                      <div id="card-b" className="card-body">
                        <h5 className="card-title">{value?.name}</h5>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>
      {/*recomencont ends */}
    </>
  );
}
