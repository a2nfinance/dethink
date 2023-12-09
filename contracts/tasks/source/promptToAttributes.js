// const prompt = args[0]
// const url = "https://localhost:3000";
// const req = Functions.makeHttpRequest({
//   url: url,
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   data: JSON.stringify({prompt: prompt})
// });

// const res = await req;
// if (res.error) {
//     console.error(
//         res.response
//           ? `${res.response.status},${res.response.statusText}`
//           : ""
//       );
//       throw Error("Request failed");
// }

// return Functions.encodeString(JSON.stringify(res["data"]));

return Functions.encodeString(JSON.stringify("TEST DATA"));
