import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const generateTrackingID = () => {
  const date = new Date();
  const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `PCL-${datePart}-${rand}`;
};

const SendParcel = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const warehouses = useLoaderData(); // Getting all warehouses from loader
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();

  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // Filter warehouses by selected region
  const getWarehousesByRegion = (region) => {
    return warehouses.filter(w => w.region === region);
  };

  // console.log(getWarehousesByRegion('Dhaka'))


  // Handle form submission
  const onSubmit = (data) => {

    const weight = parseFloat(data.weight) || 0;
    const isSameDistrict = data.sender_center === data.receiver_center;

    let baseCost = 0;
    let extraCost = 0;
    let breakdown = "";

    if (data.type === "document") {
      baseCost = isSameDistrict ? 60 : 80;
      breakdown = `Document delivery ${isSameDistrict ? "within" : "outside"} the district.`;
    } else {
      if (weight <= 3) {
        baseCost = isSameDistrict ? 110 : 150;
        breakdown = `Non-document up to 3kg ${isSameDistrict ? "within" : "outside"} the district.`;
      } else {
        const extraKg = weight - 3;
        const perKgCharge = extraKg * 40;
        const districtExtra = isSameDistrict ? 0 : 40;
        baseCost = isSameDistrict ? 110 : 150;
        extraCost = perKgCharge + districtExtra;

        breakdown = `
        Non-document over 3kg ${isSameDistrict ? "within" : "outside"} the district.<br/>
        Extra charge: ৳40 x ${extraKg.toFixed(1)}kg = ৳${perKgCharge}<br/>
        ${districtExtra ? "+ ৳40 extra for outside district delivery" : ""}
      `;
      }
    }

    const totalCost = baseCost + extraCost;

    Swal.fire({
      title: "Delivery Cost Breakdown",
      icon: "info",
      html: `
      <div class="text-left text-base space-y-2">
        <p><strong>Parcel Type:</strong> ${data.type}</p>
        <p><strong>Weight:</strong> ${weight} kg</p>
        <p><strong>Delivery Zone:</strong> ${isSameDistrict ? "Within Same District" : "Outside District"}</p>
        <hr class="my-2"/>
        <p><strong>Base Cost:</strong> ৳${baseCost}</p>
        ${extraCost > 0 ? `<p><strong>Extra Charges:</strong> ৳${extraCost}</p>` : ""}
        <div class="text-gray-500 text-sm">${breakdown}</div>
        <hr class="my-2"/>
        <p class="text-xl font-bold text-green-600">Total Cost: ৳${totalCost}</p>
      </div>
    `,
      showDenyButton: true,
      confirmButtonText: "💳 Proceed to Payment",
      denyButtonText: "✏️ Continue Editing",
      confirmButtonColor: "#16a34a",
      denyButtonColor: "#d3d3d3",
      customClass: {
        popup: "rounded-xl shadow-md px-6 py-6",
      },
    }).then(result => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          cost: totalCost,
          created_by: user.email,
          payment_status: 'unpaid',
          delivery_status: 'not_collected',
          creation_date: new Date().toISOString(),
          tracking_id: generateTrackingID(),
        };
        console.log("Ready for payment:", parcelData);

        axiosSecure.post('/addParcel', parcelData)
          .then(res => {
            console.log(res.data);
            if (res?.data?.result?.insertedId) {
              reset();
              // TODO: redirect to a payment page 
              Swal.fire({
                title: "Redirecting...",
                text: "Proceeding to payment gateway.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
            }
          })

      }
    })






  };

  // Unique region list from warehouse data
  const regions = [...new Set(warehouses.map((w) => w.region))];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Add Parcel</h1>
      <p className="text-md text-slate-500 mb-6">Enter your parcel details</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* --- Parcel Information Section --- */}
        <fieldset className="border-t border-gray-300 pt-4">
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2">
              <input type="radio" value="document" {...register('type', { required: true })} />
              <span className="text-sm font-medium text-gray-700">Document</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" value="non-document" {...register('type', { required: true })} />
              <span className="text-sm font-medium text-gray-700">Not-Document</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="label">Parcel Name</label>
              <input
                type="text"
                {...register('title', { required: true })}
                placeholder="Parcel Name"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">Parcel Weight (KG)</label>
              <input
                type="number"
                {...register('weight')}
                placeholder="Parcel Weight (KG)"
                className="input input-bordered w-full"
                disabled={parcelType === 'document'}
              />
            </div>
          </div>
        </fieldset>

        {/* --- Sender and Receiver Info Section --- */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* --- Sender Info --- */}
          <fieldset>
            <legend className="font-bold text-slate-800 mb-4">Sender Details</legend>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="label">Sender Name</label>
                <input {...register('senderName', { required: true })} placeholder="Sender Name" className="input input-bordered w-full" />
              </div>

              <div>
                <label className="label">Your Region</label>
                <select {...register('senderRegion', { required: true })} className="select w-full">
                  <option value="">Select your region</option>
                  {regions.map((r, idx) => (
                    <option key={idx} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Sender Pickup Warehouse</label>
                <select {...register('senderCenter', { required: true })} className="select w-full">
                  <option value="">Select warehouse</option>
                  {getWarehousesByRegion(senderRegion).map((w, idx) => (
                    <option key={idx} value={w.district}>{w.district}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Pickup Address</label>
                <input {...register('senderAddress', { required: true })} placeholder="Pickup Address" className="input input-bordered w-full" />
              </div>

              <div>
                <label className="label">Sender Contact No</label>
                <input {...register('senderContact', { required: true })} placeholder="Sender Contact No" className="input input-bordered w-full" />
              </div>

              <div>
                <label className="label">Pickup Instruction</label>
                <textarea {...register('pickupInstruction', { required: true })} placeholder="Pickup Instruction" className="textarea textarea-bordered w-full"></textarea>
              </div>
            </div>
          </fieldset>

          {/* --- Receiver Info --- */}
          <fieldset>
            <legend className="font-bold text-slate-800 mb-4">Receiver Details</legend>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="label">Receiver Name</label>
                <input {...register('receiverName', { required: true })} placeholder="Receiver Name" className="input input-bordered w-full" />
              </div>

              <div>
                <label className="label">Receiver Region</label>
                <select {...register('receiverRegion', { required: true })} className="select w-full">
                  <option value="">Select region</option>
                  {regions.map((r, idx) => (
                    <option key={idx} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Receiver Delivery Warehouse</label>
                <select {...register('receiverCenter', { required: true })} className="select w-full">
                  <option value="">Select warehouse</option>
                  {getWarehousesByRegion(receiverRegion).map((w, idx) => (
                    <option key={idx} value={w.district}>{w.district}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Receiver Address</label>
                <input {...register('receiverAddress', { required: true })} placeholder="Receiver Address" className="input input-bordered w-full" />
              </div>

              <div>
                <label className="label">Receiver Contact No</label>
                <input {...register('receiverContact', { required: true })} placeholder="Receiver Contact No" className="input input-bordered w-full" />
              </div>

              <div>
                <label className="label">Delivery Instruction</label>
                <textarea {...register('deliveryInstruction', { required: true })} placeholder="Delivery Instruction" className="textarea textarea-bordered w-full"></textarea>
              </div>
            </div>
          </fieldset>
        </div>

        {/* Pickup Time Note */}
        <p className="text-sm text-slate-500 italic">* Pickup Time: 4pm–7pm Approx.</p>

        {/* Submit Button */}
        <button type="submit" className="btn btn-accent mt-4 w-full md:w-auto">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
