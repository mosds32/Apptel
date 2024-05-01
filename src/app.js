import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express()
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECERT
}))

app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN
}));

app.use(express.json({
    limit:"16kb"
}));

app.use(express.urlencoded({
    limit:'16kb',
    extended: true
}));
app.use(express.static('public'));

app.use(cookieParser());

import AuthRouter from './routes/auth.routes.js';
app.use("/api/v1/auth",AuthRouter);

import ScheduleRoute from './routes/schedule.routes.js';
app.use("/api/v1/schedule", ScheduleRoute);

import LikeRoute from './routes/likefood.routes.js';
app.use("/api/v1/like", LikeRoute);

import AlarmRoute from './routes/alarm.routes.js';
app.use("/api/v1/alarm", AlarmRoute);

import BedRoute from './routes/bedtime.routes.js';
app.use("/api/v1/bed", BedRoute);

import MealPlanRoute from './routes/mealplan.routes.js';
app.use("/api/v1/meal", MealPlanRoute);

import WaterRoute from './routes/water.routes.js';
app.use("/api/v1/water", WaterRoute);

import ProfileRoute from './routes/profile.routes.js';
app.use("/api/v1/profile", ProfileRoute);

import ExerciseRoute from './routes/exercise.routes.js';
app.use("/api/v1/exercise",ExerciseRoute);

import CategoryRoute from './routes/category.routes.js';
app.use("/api/v1/category", CategoryRoute);

import Sets from './routes/sets.route.js';
app.use("/api/v1/sets", Sets); 

import ExerciseSetsRoute from './routes/setexercise.routes.js';
app.use("/api/v1/setexercise", ExerciseSetsRoute);



export {app};