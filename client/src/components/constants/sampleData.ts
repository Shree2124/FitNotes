export const workouts = [
  {
    id: "1",
    name: "Abs",
    image: "",
    workouts: [
      { id: "1", name: "Crunches", image: "" },
      { id: "2", name: "Plank", image: "" },
      { id: "3", name: "Hanging Leg Raises", image: "" },
    ],
  },
  {
    id: "2",
    name: "Back",
    image: "",
    workouts: [
      { id: "1", name: "Deadlift", image: "" },
      { id: "2", name: "Pull-Up", image: "" },
      { id: "3", name: "Bent-Over Row", image: "" },
    ],
  },
  {
    id: "3",
    name: "Biceps",
    image: "",
    workouts: [
      { id: "1", name: "Bicep Curl", image: "" },
      { id: "2", name: "Hammer Curl", image: "" },
      { id: "3", name: "Concentration Curl", image: "" },
    ],
  },
  {
    id: "4",
    name: "Cardio",
    image: "",
    workouts: [
      { id: "1", name: "Running", image: "" },
      { id: "2", name: "Jump Rope", image: "" },
      { id: "3", name: "Cycling", image: "" },
    ],
  },
  {
    id: "5",
    name: "Chest",
    image: "",
    workouts: [
      { id: "1", name: "Bench Press", image: "" },
      { id: "2", name: "Push-Up", image: "" },
      { id: "3", name: "Incline Dumbbell Press", image: "" },
    ],
  },
  {
    id: "6",
    name: "Legs",
    image: "",
    workouts: [
      { id: "1", name: "Squats", image: "" },
      { id: "2", name: "Lunges", image: "" },
      { id: "3", name: "Leg Press", image: "" },
    ],
  },
  {
    id: "7",
    name: "Shoulders",
    image: "",
    workouts: [
      { id: "1", name: "Shoulder Press", image: "" },
      { id: "2", name: "Lateral Raise", image: "" },
      { id: "3", name: "Front Raise", image: "" },
    ],
  },
  {
    id: "8",
    name: "Triceps",
    image: "",
    workouts: [
      { id: "1", name: "Tricep Dips", image: "" },
      { id: "2", name: "Overhead Tricep Extension", image: "" },
      { id: "3", name: "Tricep Pushdown", image: "" },
    ],
  },
];

export const progressData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Calories Burned",
      data: [500, 700, 600, 800],
      backgroundColor: "rgba(75, 192, 192, 0.5)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};


export const sampleActivities = [
  { date: "2024-12-25", activity: "Ran 5km in 25 minutes" },
  { date: "2024-12-26", activity: "Cycled 10km in 30 minutes" },
];
