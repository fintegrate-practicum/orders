// import { useForm, Controller } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import Joi from "joi";
// import { login } from "./userApi";
// import { userIn } from "./userSlice";
// import Button from "@mui/material/Button"; // Imported Button component from Material-UI
// import React from "react";
// import TextField from "@mui/material/TextField";
// import { Typography, Container } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// // Defined Joi schema for form validation
// const schema = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,15}$")).required(),
// }).required();
// // Login component
// const Login = () => {
//   const dispatch = useDispatch();
//   let navigate = useNavigate();
//   // Destructuring the useForm hook
//   const {
//     register,
//     control,
//     handleSubmit, // Renamed handleSubmit to avoid confusion
//     formState: { errors },
//   } = useForm({
//     resolver: async (data) => {
//       try {
//         const validatedData = await schema.validateAsync(data, { abortEarly: false });
//         return {
//           values: validatedData,
//           errors: {},
//         };
//       } catch (err) {
//         return {
//           values: {},
//           errors: err.details.reduce((acc, curr) => {
//             acc[curr.context.key] = curr.message;
//             return acc;
//           }, {}),
//         };
//       }
//     },
//   });
//   // Function to handle login logic
//   const loginDO = async (data) => {
//     try {
//       let res = await login(data);
//       dispatch(userIn(res.data));
//       navigate("/HomePage")
//     }
//     catch (err) {
//       if (err.response && err.response.status === 401) {
//         alert("You are not registered on the site")
//         navigate("/sighIn")
//       }
//     }
//   };
//   // Function to handle form submission
//   const onSubmit = (data) => {
//     handleSubmit(loginDO)(data); // Call loginDO inside handleSubmit
//   };
//   return (
//     <>
//       <Container maxWidth="md">
//         <Typography variant="h4" style={{ marginTop: 40, marginBottom: 20, fontFamily: "initial" }}>
//           Login
//         </Typography>
//         <Typography variant="h8" style={{ fontFamily: "initial" }}>
//           Returning Customers
//         </Typography>
//         <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
//           {/* Controlled input for name */}
//           <Controller
//             name="name"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="name*"
//                 type="text"
//                 variant="outlined"
//                 margin="normal"
//                 fullWidth
//                 error={!!errors.name}
//                 helperText={errors.name}
//               />
//             )}
//           />
//           {/* Controlled input for password */}
//           <Controller
//             name="password"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="password*"
//                 type="password"
//                 variant="outlined"
//                 margin="normal"
//                 fullWidth
//                 error={!!errors.password}
//                 helperText={errors.password}
//               />
//             )}
//           />
//           {/* Button for form submission */}
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{
//               width: "100%",
//               mt: 2,
//               backgroundColor: "#CB1021",
//               color: "white",
//               transition: "background-color 0.3s, color 0.3s",
//               "&:hover": {
//                 backgroundColor: "white",
//                 color: "#CB1021",
//                 border: "2px solid #CB1021",
//               },
//               height: "50px",
//             }}
//             color="primary"
//           >
//             Login
//           </Button>
//         </form>
//       </Container>
//       hgu
//     </>
//   );
// };
// export default Login;