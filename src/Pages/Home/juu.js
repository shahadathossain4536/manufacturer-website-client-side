// import React, { useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useQuery } from "react-query";
// import { useParams } from "react-router-dom";
// import auth from "../../firebase.init";
// import { useForm } from "react-hook-form";
// import Loading from "../Shared/Loading";
// import { toast } from "react-toastify";

// const BuyParts = () => {
//   const { id } = useParams();
//   const [user, loading, error] = useAuthState(auth);
//   const [rQuantity, setRQuantity] = useState("");
//   console.log(rQuantity);
//   const { data: buyPartsData, isLoading } = useQuery("buyParts", () =>
//     fetch(`https://manufacturer-website-server-side-amb7.onrender.com/parts/${id}`).then((res) => res.json())
//   );

//   const { name, img, description, minOrder, availableQuantity, price } =
//     buyPartsData || {};
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     reset,
//   } = useForm();
//   if (loading || isLoading) {
//     return <Loading></Loading>;
//   }
//   const email = user.email;
//   const onSubmit = async (data) => {
//     console.log(data);
//     const currentQuantity = data.quantity;

//     const minOrder2 = minOrder - 1;
//     if (currentQuantity < minOrder || currentQuantity > availableQuantity) {
//       toast.error("plause submit minimun");
//       return;
//     } else {
//       const paymentAmount = currentQuantity * price;
//       fetch("https://manufacturer-website-server-side-amb7.onrender.com/orders", {
//         method: "POST",
//         body: JSON.stringify({
//           product: name,
//           quantity: currentQuantity,
//           paymentAmount: paymentAmount,
//           email: user.email,
//           billerName: user.displayName,
//           billerPhone: data.phone,
//           billerAdders: data.adders,
//         }),
//         headers: {
//           "Content-type": "application/json; charset=UTF-8",
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//           const updateQuantityC = availableQuantity - currentQuantity;
//           const updateQuantity = Number(updateQuantityC);

//           console.log(updateQuantity, id);
//           // fetch(`https://manufacturer-website-server-side-amb7.onrender.com/order/${id}`);
//           // fetch(`https://manufacturer-website-server-side-amb7.onrender.com/order/${id}`, {
//           //   method: "PUT",
//           //   body: JSON.stringify({
//           //     availableQuantity: updateQuantity,
//           //   }),
//           //   headers: {
//           //     "Content-type": "application/json; charset=UTF-8",
//           //     authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           //   },
//           // })
//           //   .then((rsc) => rsc.json())
//           //   .then((data) => {
//           //     console.log("update quantity", data);
//           //   });
//         });
//     }
//   };
//   return (
//     <div className="bg-slate-100 my-24">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="w-9/12 grid grid-cols-2 border-2 border-black py-28">
//           <div className="flex justify-center items-center">
//             <img src={img} alt="" />
//           </div>
//           <div>
//             <label className="text-2xl" htmlFor="">
//               Description
//             </label>
//             <p>{description}</p>
//           </div>
//         </div>

//         <div className="w-9/12 grid grid-cols-2">
//           {/* BILLING DETAILS START */}
//           <div className=" flex flex-col">
//             <h3 className="text-3xl pt-16">Name:{name}</h3>
//             <h3 className="text-3xl pt-16">Price:{price}</h3>
//             <h3 className="text-3xl pt-16">Minimum Order:{minOrder}</h3>
//             <h3 className="text-3xl pt-16">Stock:{availableQuantity}</h3>
//             {/* ---------------------------------------------- user input order field Start ----------------------------------------------*/}
//             <div class="form-control w-full max-w-xs">
//               <label class="label">
//                 <span class="label-text">Order Quantity</span>
//               </label>
//               <input
//                 type="number"
//                 defaultValue={`${minOrder}`}
//                 class="input input-bordered w-full max-w-xs"
//                 {...register("quantity", {
//                   valueAsNumber: true,
//                 })}
//               />
//               <label class="label">
//                 {errors.quantity?.type === "required" && (
//                   <span class="label-text-alt text-red-600">
//                     {errors?.quantity?.message}
//                   </span>
//                 )}
//               </label>
//             </div>
//             {/* ---------------------------------------------- user input order field end ----------------------------------------------*/}
//           </div>
//           <div className="">
//             <h2 className="text-3xl">BILLING DETAILS</h2>
//             {/* ---------------------------------------------- Name field Start ----------------------------------------------*/}
//             <div class="form-control w-full max-w-xs">
//               <label class="label">
//                 <span class="label-text">Name</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 class="input input-bordered w-full max-w-xs"
//                 value={user?.displayName}
//                 {...register("name", {})}
//               />
//               <label class="label">
//                 {errors.name?.type === "required" && (
//                   <span class="label-text-alt text-red-600">
//                     {errors?.name?.message}
//                   </span>
//                 )}
//               </label>
//             </div>
//             {/* ---------------------------------------------- Name field end --------------------------------------------------*/}
//             {/* ---------------------------------------------- email field  start ----------------------------------------------*/}
//             <div class="form-control w-full max-w-xs">
//               <label class="label">
//                 <span class="label-text">Email</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="Enter Your email"
//                 class="input input-bordered w-full max-w-xs"
//                 value={user?.email}
//                 {...register("email", {})}
//               />
//               <label class="label">
//                 {errors.email?.type === "required" && (
//                   <span class="label-text-alt text-red-600">
//                     {errors?.email?.message}
//                   </span>
//                 )}
//                 {errors.email?.type === "pattern" && (
//                   <span class="label-text-alt text-red-600">
//                     {errors?.email?.message}
//                   </span>
//                 )}
//               </label>
//             </div>
//             {/* ---------------------------------------------- email field  end ----------------------------------------------*/}
//             {/* ---------------------------------------------- Adders field Start ----------------------------------------------*/}
//             <div class="form-control w-full max-w-xs">
//               <label class="label">
//                 <span class="label-text">Adders</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Adders"
//                 class="input input-bordered w-full max-w-xs"
//                 {...register("adders", {
//                   required: {
//                     value: true,
//                     message: "Enter Your Adders",
//                   },
//                 })}
//               />
//               <label class="label">
//                 {errors.adders?.type === "required" && (
//                   <span class="label-text-alt text-red-600">
//                     {errors?.adders?.message}
//                   </span>
//                 )}
//               </label>
//             </div>
//             {/* ---------------------------------------------- Adders field end  ----------------------------------------------*/}
//             {/* ---------------------------------------------- Phone field  start ----------------------------------------------*/}
//             <div class="form-control w-full max-w-xs">
//               <label class="label">
//                 <span class="label-text">Phone</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter Your phone"
//                 class="input input-bordered w-full max-w-xs"
//                 {...register("phone", {
//                   required: {
//                     value: true,
//                     message: "Enter Your phone",
//                   },
//                   pattern: {
//                     value: /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/,
//                     message: "Please use Bangladeshi mobile number",
//                   },
//                 })}
//               />
//               <label class="label">
//                 {errors.phone?.type === "required" && (
//                   <span class="label-text-alt text-red-600">
//                     {errors?.phone?.message}
//                   </span>
//                 )}
//                 {errors.phone?.type === "pattern" && (
//                   <span class="label-text-alt text-red-600">
//                     {errors?.phone?.message}
//                   </span>
//                 )}
//               </label>
//             </div>
//             <input
//               type="submit"
//               value="Place Order"
//               class="btn w-full max-w-xs"
//             />
//             {/* ---------------------------------------------- phone field end ----------------------------------------------*/}
//           </div>

//           {/* BILLING DETAILS END */}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BuyParts;
